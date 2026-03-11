/**
 * Unified data loader — tries Notion at build time, falls back to mock data.
 *
 * Usage in .astro frontmatter:
 *   const { prospects, firms, grants } = await loadAdminData();
 *   const { prospects } = await loadFilteredAdminData({ prospects: [filter] });
 */

import {
  fetchAllFromNotion,
  isNotionEnabled,
  queryDatabase,
  mapNotionPages,
  DB,
  type NotionData,
  type NotionFilter,
  type NotionSort,
} from './notion';
import {
  getProspects,
  getFirms,
  getContacts,
  getClientAccounts,
  getAdminGrants,
  getBDActivities,
} from '../data/admin';
import {
  getGrantees,
  getGrantsForCharity,
  getDocumentsForCharity,
  getPaymentsForCharity,
  type Grantee,
  type GranteeGrant,
  type DDDocument,
  type GrantPayment,
} from '../data/grantees';

// ── Client-side filter applier ──────────────────────────────────────────

/**
 * Apply Notion-style filters to an in-memory array (for mock data fallback).
 * Mirrors Notion filter semantics so behavior is consistent between live and mock.
 */
export function applyFiltersToMockData<T>(data: T[], filters: NotionFilter[]): T[] {
  if (!filters || filters.length === 0) return data;

  return data.filter((item) => {
    return filters.every((f) => {
      const val = (item as any)[f.property];
      switch (f.condition) {
        case 'equals':
          return val === f.value;
        case 'does_not_equal':
          return val !== f.value;
        case 'contains':
          return String(val ?? '').toLowerCase().includes(String(f.value).toLowerCase());
        case 'does_not_contain':
          return !String(val ?? '').toLowerCase().includes(String(f.value).toLowerCase());
        case 'starts_with':
          return String(val ?? '').toLowerCase().startsWith(String(f.value).toLowerCase());
        case 'ends_with':
          return String(val ?? '').toLowerCase().endsWith(String(f.value).toLowerCase());
        case 'greater_than':
          return Number(val) > Number(f.value);
        case 'greater_than_or_equal_to':
          return Number(val) >= Number(f.value);
        case 'less_than':
          return Number(val) < Number(f.value);
        case 'less_than_or_equal_to':
          return Number(val) <= Number(f.value);
        case 'before':
          return val != null && String(val) < String(f.value);
        case 'after':
          return val != null && String(val) > String(f.value);
        case 'on_or_before':
          return val != null && String(val) <= String(f.value);
        case 'on_or_after':
          return val != null && String(val) >= String(f.value);
        case 'is_not_empty':
          return val != null && val !== '';
        case 'is_empty':
          return val == null || val === '';
        case 'is_checked':
          return val === true;
        case 'is_not_checked':
          return val !== true;
        default:
          return true;
      }
    });
  });
}

/**
 * Apply sorts to in-memory data, mirroring Notion sort semantics.
 */
export function applySortsToMockData<T>(data: T[], sorts: NotionSort[]): T[] {
  if (!sorts || sorts.length === 0) return data;

  return [...data].sort((a, b) => {
    for (const sort of sorts) {
      const va = (a as any)[sort.property];
      const vb = (b as any)[sort.property];
      let cmp = 0;
      if (typeof va === 'number' && typeof vb === 'number') {
        cmp = va - vb;
      } else {
        cmp = String(va ?? '').localeCompare(String(vb ?? ''));
      }
      if (cmp !== 0) {
        return sort.direction === 'ascending' ? cmp : -cmp;
      }
    }
    return 0;
  });
}

// ── Admin data filters type ─────────────────────────────────────────────

export interface AdminDataFilters {
  prospects?: NotionFilter[];
  firms?: NotionFilter[];
  contacts?: NotionFilter[];
  clientAccounts?: NotionFilter[];
  grants?: NotionFilter[];
  bdActivities?: NotionFilter[];
}

export interface AdminDataSorts {
  prospects?: NotionSort[];
  firms?: NotionSort[];
  contacts?: NotionSort[];
  clientAccounts?: NotionSort[];
  grants?: NotionSort[];
  bdActivities?: NotionSort[];
}

// ── Grantee data types ──────────────────────────────────────────────────

export interface GranteeData {
  grantees: Grantee[];
  grants: GranteeGrant[];
  documents: DDDocument[];
  payments: GrantPayment[];
}

// ── Cached unfiltered loader (unchanged API) ────────────────────────────

let _cache: NotionData | null | undefined;

export async function loadAdminData(): Promise<NotionData> {
  // Return cached if already fetched this build
  if (_cache !== undefined) {
    return _cache ?? mockData();
  }

  if (isNotionEnabled()) {
    console.log('[data-loader] NOTION_API_KEY set — fetching live data');
    _cache = await fetchAllFromNotion();
    if (_cache) {
      console.log(`[data-loader] Loaded: ${_cache.prospects.length} prospects, ${_cache.firms.length} firms, ${_cache.grants.length} grants, ${_cache.clientAccounts.length} accounts, ${_cache.contacts.length} contacts`);
      return _cache;
    }
    console.warn('[data-loader] Notion fetch failed — falling back to mock data');
  }

  _cache = null;
  return mockData();
}

// ── Filtered admin loader ───────────────────────────────────────────────

/**
 * Load admin data with optional Notion-level filters.
 * When Notion is connected, filters are passed to the API.
 * When using mock data, filters are applied client-side.
 */
export async function loadFilteredAdminData(
  filters?: AdminDataFilters,
  sorts?: AdminDataSorts,
): Promise<NotionData> {
  const hasFilters = filters && Object.values(filters).some((f) => f && f.length > 0);
  const hasSorts = sorts && Object.values(sorts).some((s) => s && s.length > 0);

  // If no filters/sorts, use the cached path
  if (!hasFilters && !hasSorts) {
    return loadAdminData();
  }

  if (isNotionEnabled()) {
    try {
      // Query each database individually with its filters
      const [prospects, firms, contacts, clientAccounts, grants, bdActivities] = await Promise.all([
        filters?.prospects || sorts?.prospects
          ? queryDatabase(DB.prospects, filters?.prospects, sorts?.prospects)
          : queryDatabase(DB.prospects),
        filters?.firms || sorts?.firms
          ? queryDatabase(DB.firms, filters?.firms, sorts?.firms)
          : queryDatabase(DB.firms),
        filters?.contacts || sorts?.contacts
          ? queryDatabase(DB.contacts, filters?.contacts, sorts?.contacts)
          : queryDatabase(DB.contacts),
        filters?.clientAccounts || sorts?.clientAccounts
          ? queryDatabase(DB.clientAccounts, filters?.clientAccounts, sorts?.clientAccounts)
          : queryDatabase(DB.clientAccounts),
        filters?.grants || sorts?.grants
          ? queryDatabase(DB.grantPipeline, filters?.grants, sorts?.grants)
          : queryDatabase(DB.grantPipeline),
        filters?.bdActivities || sorts?.bdActivities
          ? queryDatabase(DB.bdActivities, filters?.bdActivities, sorts?.bdActivities)
          : queryDatabase(DB.bdActivities),
      ]);

      // If all queries succeeded, map raw pages to typed objects
      if (prospects && firms && contacts && clientAccounts && grants && bdActivities) {
        return mapNotionPages(prospects, firms, contacts, clientAccounts, grants, bdActivities);
      }
    } catch (err) {
      console.warn('[data-loader] Filtered Notion fetch failed, falling back to mock', err);
    }
  }

  // Mock data path: load all, then apply filters client-side
  const base = await loadAdminData();
  let result = { ...base };

  if (filters?.prospects) result.prospects = applyFiltersToMockData(base.prospects, filters.prospects);
  if (filters?.firms) result.firms = applyFiltersToMockData(base.firms, filters.firms);
  if (filters?.contacts) result.contacts = applyFiltersToMockData(base.contacts, filters.contacts);
  if (filters?.clientAccounts) result.clientAccounts = applyFiltersToMockData(base.clientAccounts, filters.clientAccounts);
  if (filters?.grants) result.grants = applyFiltersToMockData(base.grants, filters.grants);
  if (filters?.bdActivities) result.bdActivities = applyFiltersToMockData(base.bdActivities, filters.bdActivities);

  if (sorts?.prospects) result.prospects = applySortsToMockData(result.prospects, sorts.prospects);
  if (sorts?.firms) result.firms = applySortsToMockData(result.firms, sorts.firms);
  if (sorts?.contacts) result.contacts = applySortsToMockData(result.contacts, sorts.contacts);
  if (sorts?.clientAccounts) result.clientAccounts = applySortsToMockData(result.clientAccounts, sorts.clientAccounts);
  if (sorts?.grants) result.grants = applySortsToMockData(result.grants, sorts.grants);
  if (sorts?.bdActivities) result.bdActivities = applySortsToMockData(result.bdActivities, sorts.bdActivities);

  return result;
}

// ── Filtered grantee loader ─────────────────────────────────────────────

/**
 * Load grantee data for a specific charity, with optional filters.
 * Filters apply client-side to mock data (grantee Notion integration TBD).
 */
export async function loadFilteredGranteeData(
  charityId: string,
  filters?: {
    grants?: NotionFilter[];
    documents?: NotionFilter[];
    payments?: NotionFilter[];
  },
): Promise<GranteeData> {
  const allGrantees = getGrantees();
  const grantee = allGrantees.find((g) => g.id === charityId);

  let grants = getGrantsForCharity(charityId);
  let documents = getDocumentsForCharity(charityId);
  let payments = getPaymentsForCharity(charityId);

  if (filters?.grants) grants = applyFiltersToMockData(grants, filters.grants);
  if (filters?.documents) documents = applyFiltersToMockData(documents, filters.documents);
  if (filters?.payments) payments = applyFiltersToMockData(payments, filters.payments);

  return {
    grantees: grantee ? [grantee] : [],
    grants,
    documents,
    payments,
  };
}

// ── Private helpers ─────────────────────────────────────────────────────

function mockData(): NotionData {
  return {
    prospects: getProspects(),
    firms: getFirms(),
    contacts: getContacts(),
    clientAccounts: getClientAccounts(),
    grants: getAdminGrants(),
    bdActivities: getBDActivities(),
  };
}
