/**
 * Prism Portal — Notion Backend
 *
 * Typed client for fetching live data from Notion databases at build time.
 * Falls back to mock data when NOTION_API_KEY is not set.
 *
 * Notion databases (under Prism The Gift Fund — Dashboard):
 *   Prospects, Client Accounts, Grant Pipeline, Firms, Contacts, BD Activities
 */

import { Client } from '@notionhq/client';
import type {
  Prospect,
  Firm,
  Contact,
  ClientAccount,
  AdminGrant,
  BDActivity,
} from '../data/admin';

// ── Data Source IDs (v5 API uses dataSources.query, not databases.query) ─

export const DB = {
  prospects: '374e034e-bc5b-484b-ae67-c3182600e113',
  clientAccounts: '81478883-898a-427b-8e95-c5c149fde537',
  grantPipeline: '714d6f2c-02bb-4a16-be16-184e5d3fe415',
  firms: '4873a6b3-0e5a-4af5-9d1f-18d9a6b32364',
  contacts: 'd928efcd-bf76-431d-921a-ac7f513fe99b',
  bdActivities: 'a3771764-6bed-4407-bb11-bebf36b5499a',
} as const;

// ── Client ──────────────────────────────────────────────────────────────

let _client: Client | null = null;

export function getNotionClient(): Client | null {
  if (_client) return _client;
  const key = import.meta.env.NOTION_API_KEY;
  if (!key) return null;
  _client = new Client({ auth: key });
  return _client;
}

export function isNotionEnabled(): boolean {
  return !!import.meta.env.NOTION_API_KEY;
}

// ── Property Extractors ─────────────────────────────────────────────────

type Props = Record<string, any>;

function title(props: Props, key: string): string {
  const p = props[key];
  if (!p?.title) return '';
  return p.title.map((t: any) => t.plain_text).join('') || '';
}

function text(props: Props, key: string): string {
  const p = props[key];
  if (!p?.rich_text) return '';
  return p.rich_text.map((t: any) => t.plain_text).join('') || '';
}

function num(props: Props, key: string, fallback = 0): number {
  return props[key]?.number ?? fallback;
}

function select(props: Props, key: string): string {
  return props[key]?.select?.name ?? '';
}

function multiSelect(props: Props, key: string): string[] {
  return (props[key]?.multi_select ?? []).map((s: any) => s.name);
}

function date(props: Props, key: string): string {
  return props[key]?.date?.start ?? '';
}

function email(props: Props, key: string): string {
  return props[key]?.email ?? '';
}

function phone(props: Props, key: string): string {
  return props[key]?.phone_number ?? '';
}

function formula(props: Props, key: string): number {
  const f = props[key]?.formula;
  if (!f) return 0;
  if (f.type === 'number') return f.number ?? 0;
  if (f.type === 'string') return parseFloat(f.string) || 0;
  return 0;
}

function rollup(props: Props, key: string): number {
  const r = props[key]?.rollup;
  if (!r) return 0;
  if (r.type === 'number') return r.number ?? 0;
  return 0;
}

function relationIds(props: Props, key: string): string[] {
  return (props[key]?.relation ?? []).map((r: any) => r.id);
}

// ── Filter & Sort Types ─────────────────────────────────────────────────

export type NotionPropertyType =
  | 'title'
  | 'rich_text'
  | 'number'
  | 'select'
  | 'multi_select'
  | 'date'
  | 'checkbox'
  | 'status'
  | 'people';

export interface NotionFilter {
  property: string;
  type: NotionPropertyType;
  condition: string;
  value: string | number | boolean;
}

export interface NotionSort {
  property: string;
  direction: 'ascending' | 'descending';
}

export interface NotionCompoundFilter {
  and?: NotionFilter[];
  or?: NotionFilter[];
}

// ── Filter Builder ──────────────────────────────────────────────────────

function buildFilterObject(filter: NotionFilter): Record<string, any> {
  const { property, type, condition, value } = filter;

  const inner: Record<string, any> = {};

  switch (type) {
    case 'title':
    case 'rich_text':
      inner[type] = { [condition]: value };
      break;
    case 'number':
      inner.number = { [condition]: Number(value) };
      break;
    case 'select':
      inner.select = { [condition]: value };
      break;
    case 'multi_select':
      inner.multi_select = { [condition]: value };
      break;
    case 'date':
      inner.date = { [condition]: typeof value === 'string' ? value : String(value) };
      break;
    case 'checkbox':
      inner.checkbox = { [condition]: Boolean(value) };
      break;
    case 'status':
      inner.status = { [condition]: value };
      break;
    case 'people':
      inner.people = { [condition]: value };
      break;
  }

  return { property, ...inner };
}

function buildCompoundFilter(
  filters?: NotionFilter[],
  compound?: NotionCompoundFilter,
): Record<string, any> | undefined {
  if (compound) {
    if (compound.and && compound.and.length > 0) {
      return { and: compound.and.map(buildFilterObject) };
    }
    if (compound.or && compound.or.length > 0) {
      return { or: compound.or.map(buildFilterObject) };
    }
  }

  if (filters && filters.length > 0) {
    if (filters.length === 1) return buildFilterObject(filters[0]);
    return { and: filters.map(buildFilterObject) };
  }

  return undefined;
}

function buildSorts(sorts?: NotionSort[]): { property: string; direction: string }[] | undefined {
  if (!sorts || sorts.length === 0) return undefined;
  return sorts.map((s) => ({ property: s.property, direction: s.direction }));
}

// ── Paginated Query ─────────────────────────────────────────────────────

async function queryAll(client: Client, databaseId: string): Promise<any[]> {
  const pages: any[] = [];
  let cursor: string | undefined;

  do {
    const response: any = await client.dataSources.query({
      data_source_id: databaseId,
      start_cursor: cursor,
      page_size: 100,
    });
    pages.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  return pages;
}

/**
 * Query a Notion database with optional filters and sorts.
 * Handles pagination automatically (Notion max 100 per page).
 */
export async function queryDatabase(
  databaseId: string,
  filters?: NotionFilter[],
  sorts?: NotionSort[],
  compound?: NotionCompoundFilter,
): Promise<any[] | null> {
  const client = getNotionClient();
  if (!client) return null;

  try {
    const pages: any[] = [];
    let cursor: string | undefined;
    const filterObj = buildCompoundFilter(filters, compound);
    const sortsArr = buildSorts(sorts);

    do {
      const queryParams: Record<string, any> = {
        data_source_id: databaseId,
        start_cursor: cursor,
        page_size: 100,
      };
      if (filterObj) queryParams.filter = filterObj;
      if (sortsArr) queryParams.sorts = sortsArr;

      const response: any = await client.dataSources.query(queryParams);
      pages.push(...response.results);
      cursor = response.has_more ? response.next_cursor : undefined;
    } while (cursor);

    return pages;
  } catch (err) {
    console.error('[notion] queryDatabase failed:', err);
    return null;
  }
}

// ── Mappers ─────────────────────────────────────────────────────────────

function mapProspect(
  page: any,
  firmLookup: Map<string, string>,
  contactLookup: Map<string, string>,
): Prospect {
  const p = page.properties;
  const referredByIds = relationIds(p, 'Referred By');
  const referringFirmIds = relationIds(p, 'Referring Firm');

  return {
    id: page.id,
    name: title(p, 'Prospect Name'),
    stage: select(p, 'Stage') as Prospect['stage'],
    giftSize: num(p, 'Gift Size (Est.)'),
    fundType: select(p, 'Fund Type') as Prospect['fundType'],
    ukUs: select(p, 'UK/US') as Prospect['ukUs'],
    conversionProbability: select(p, 'Conversion Probability') as Prospect['conversionProbability'],
    sourceActivity: select(p, 'Source Activity'),
    followUpStatus: select(p, 'Follow-Up Status') as Prospect['followUpStatus'],
    referredBy: referredByIds.map(id => contactLookup.get(id) ?? '').filter(Boolean).join(', ') || '',
    referringFirm: referringFirmIds.map(id => firmLookup.get(id) ?? '').filter(Boolean).join(', ') || '',
    relationshipManager: text(p, 'Relationship Manager'),
    dateEnteredPipeline: date(p, 'Date Entered Pipeline'),
    lastContact: date(p, 'Last Contact'),
    nextFollowUp: date(p, 'Next Follow-Up'),
    notes: text(p, 'Notes'),
    daysInPipeline: formula(p, 'Days in Pipeline'),
  };
}

function mapFirm(page: any): Firm {
  const p = page.properties;
  return {
    id: page.id,
    name: title(p, 'Firm Name'),
    type: select(p, 'Type') as Firm['type'],
    status: select(p, 'Status') as Firm['status'],
    offices: multiSelect(p, 'Offices / Locations'),
    lastInteraction: date(p, 'Last Interaction'),
    relationshipStart: date(p, 'Relationship Start'),
    contactCount: rollup(p, 'Contact Count'),
    referralCount: rollup(p, 'Referral Count'),
    personalNotes: text(p, 'Personal Notes'),
    totalAUM: 0, // Not in Notion schema — computed from client accounts
  };
}

function mapContact(page: any, firmLookup: Map<string, string>): Contact {
  const p = page.properties;
  const firmIds = relationIds(p, 'Firm');
  return {
    id: page.id,
    name: title(p, 'Name'),
    category: select(p, 'Category') as Contact['category'],
    email: email(p, 'Email'),
    phone: phone(p, 'Phone'),
    firmName: firmIds.map(id => firmLookup.get(id) ?? '').filter(Boolean).join(', ') || '',
    source: select(p, 'Source'),
    followUpStatus: select(p, 'Follow-Up Status') as Contact['followUpStatus'],
    lastContactDate: date(p, 'Last Contact Date'),
    nextFollowUp: date(p, 'Next Follow-Up'),
    notes: text(p, 'Notes'),
  };
}

function mapClientAccount(page: any): ClientAccount {
  const p = page.properties;
  const cash = num(p, 'Cash Balance');
  const investment = num(p, 'Investment Balance');
  const offshore = num(p, 'Offshore Balance');
  return {
    id: page.id,
    name: title(p, 'Client Name'),
    accountNumber: text(p, 'Account Number'),
    accountType: select(p, 'Account Type') as ClientAccount['accountType'],
    entity: select(p, 'Entity') as ClientAccount['entity'],
    status: select(p, 'Status') as ClientAccount['status'],
    cashBalance: cash,
    investmentBalance: investment,
    offshoreBalance: offshore,
    totalValue: cash + investment + offshore,
    ytdReturn: num(p, 'YTD Return'),
    relationshipManager: text(p, 'Relationship Manager'),
    onboardedDate: date(p, 'Onboarded Date'),
  };
}

function mapGrant(page: any, accountLookup: Map<string, string>): AdminGrant {
  const p = page.properties;
  const accountIds = relationIds(p, 'Client Account');
  return {
    id: page.id,
    grantName: title(p, 'Grant Name'),
    charity: text(p, 'Charity'),
    charityNumber: text(p, 'Charity Number'),
    amount: num(p, 'Amount'),
    stage: select(p, 'Stage') as AdminGrant['stage'],
    issueArea: select(p, 'Issue Area'),
    priority: select(p, 'Priority') as AdminGrant['priority'],
    ddStatus: select(p, 'DD Status') as AdminGrant['ddStatus'],
    clientAccount: accountIds.map(id => accountLookup.get(id) ?? '').filter(Boolean).join(', ') || '',
    requestedBy: text(p, 'Requested By'),
    dateRequested: date(p, 'Date Requested'),
    daysInStage: formula(p, 'Days in Stage'),
  };
}

function mapBDActivity(page: any): BDActivity {
  const p = page.properties;
  return {
    id: page.id,
    activity: title(p, 'Activity Name') || title(p, 'Activity'),
    type: select(p, 'Type') as BDActivity['type'],
    date: date(p, 'Date'),
    status: select(p, 'Status') as BDActivity['status'],
    firmName: text(p, 'Firm') || select(p, 'Firm'),
    cost: num(p, 'Cost'),
    location: text(p, 'Location'),
    prospectsGenerated: num(p, 'Prospects Generated'),
    attendeeCount: num(p, 'Attendee Count') || num(p, 'Attendees'),
  };
}

// ── Main Fetch ──────────────────────────────────────────────────────────

export interface NotionData {
  prospects: Prospect[];
  firms: Firm[];
  contacts: Contact[];
  clientAccounts: ClientAccount[];
  grants: AdminGrant[];
  bdActivities: BDActivity[];
}

/**
 * Map raw Notion page arrays to typed objects.
 * Used by both fetchAllFromNotion and loadFilteredAdminData.
 */
export function mapNotionPages(
  prospectPages: any[],
  firmPages: any[],
  contactPages: any[],
  accountPages: any[],
  grantPages: any[],
  activityPages: any[],
): NotionData {
  // Build lookup maps for relation resolution
  const firmLookup = new Map<string, string>();
  for (const page of firmPages) {
    firmLookup.set(page.id, title(page.properties, 'Firm Name'));
  }

  const contactLookup = new Map<string, string>();
  for (const page of contactPages) {
    contactLookup.set(page.id, title(page.properties, 'Name'));
  }

  const accountLookup = new Map<string, string>();
  for (const page of accountPages) {
    accountLookup.set(page.id, title(page.properties, 'Client Name'));
  }

  return {
    prospects: prospectPages.map(p => mapProspect(p, firmLookup, contactLookup)),
    firms: firmPages.map(p => mapFirm(p)),
    contacts: contactPages.map(p => mapContact(p, firmLookup)),
    clientAccounts: accountPages.map(p => mapClientAccount(p)),
    grants: grantPages.map(p => mapGrant(p, accountLookup)),
    bdActivities: activityPages.map(p => mapBDActivity(p)),
  };
}

export async function fetchAllFromNotion(): Promise<NotionData | null> {
  const client = getNotionClient();
  if (!client) return null;

  try {
    // Fetch all databases in parallel
    const [
      prospectPages,
      firmPages,
      contactPages,
      accountPages,
      grantPages,
      activityPages,
    ] = await Promise.all([
      queryAll(client, DB.prospects),
      queryAll(client, DB.firms),
      queryAll(client, DB.contacts),
      queryAll(client, DB.clientAccounts),
      queryAll(client, DB.grantPipeline),
      queryAll(client, DB.bdActivities),
    ]);

    return mapNotionPages(prospectPages, firmPages, contactPages, accountPages, grantPages, activityPages);
  } catch (err) {
    console.error('[notion] Failed to fetch from Notion:', err);
    return null;
  }
}
