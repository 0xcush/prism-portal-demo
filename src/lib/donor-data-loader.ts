/**
 * Donor Portal Data Loader
 *
 * Loads donor portal data from Notion (via the admin data loader) and maps
 * it to the ClientData type used by donor-facing pages. Falls back to mock
 * data when Notion is unavailable.
 */

import { loadAdminData } from './data-loader';
import type { ClientData, Grant, TimelineStep } from '../data/clients';
import type { AdminGrant, ClientAccount } from '../data/admin';
import { getClient, getAllClients } from '../data/clients';
import {
  synthesizeAssetDistribution,
  synthesizeHoldings,
  synthesizeMonthlyPerformance,
  synthesizeStatements,
  synthesizeTransactions,
  synthesizeRecentActivity,
  computeIssueAreaBreakdown,
} from './synthesize-donor-data';

// ── Helpers ───────────────────────────────────────────────────────────

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Extract the client hint from a grant name like "Charity — Client Name"
 */
function extractClientHint(grantName: string): string {
  const parts = grantName.split(/\s*[—–\-]\s*/);
  return (parts.length > 1 ? parts[parts.length - 1] : '').toLowerCase().trim();
}

/**
 * Check if a grant belongs to an account by matching the client hint
 * in the grant name against the account name.
 */
function grantMatchesAccount(grant: AdminGrant, account: ClientAccount): boolean {
  if (grant.clientAccount) return grant.clientAccount === account.name;
  const hint = extractClientHint(grant.grantName);
  if (!hint) return false;
  const acctLower = account.name.toLowerCase();
  return acctLower.includes(hint) || hint.includes(acctLower.replace(/^the\s+/, ''));
}

// ── Stage → Status mapping ────────────────────────────────────────────

const STAGE_TO_STATUS: Record<string, Grant['status']> = {
  Paid: 'Paid',
  Approved: 'Approved',
  'In Review': 'In Review',
  Requested: 'Requested',
};

function mapStageToStatus(stage: string): Grant['status'] {
  return STAGE_TO_STATUS[stage] ?? 'In Review';
}

// ── Timeline synthesis ────────────────────────────────────────────────

const STAGE_ORDER = ['Requested', 'In Review', 'Approved', 'Paid'];

function synthesizeTimeline(stage: string, dateRequested: string): TimelineStep[] {
  const status = mapStageToStatus(stage);
  const idx = STAGE_ORDER.indexOf(status);
  const stepCount = idx >= 0 ? idx + 1 : 1;

  const steps: TimelineStep[] = [];

  if (stepCount >= 1) {
    steps.push({
      status: 'Requested',
      date: dateRequested,
      actor: 'Client Portal',
      note: 'Grant recommendation submitted via portal',
    });
  }
  if (stepCount >= 2) {
    steps.push({
      status: 'In Review',
      date: dateRequested,
      actor: 'Compliance Team',
      note: 'Due diligence and Charity Commission verification initiated',
    });
  }
  if (stepCount >= 3) {
    steps.push({
      status: 'Approved',
      date: dateRequested,
      actor: 'Relationship Manager',
      note: 'Grant approved following compliance review',
    });
  }
  if (stepCount >= 4) {
    steps.push({
      status: 'Paid',
      date: dateRequested,
      actor: 'Treasury',
      note: 'Payment processed via BACS to charity bank account',
    });
  }

  return steps;
}

// ── Grant Mapper ──────────────────────────────────────────────────────

export function mapAdminGrantToDonorGrant(grant: AdminGrant): Grant {
  const status = mapStageToStatus(grant.stage);
  const statusIdx = STAGE_ORDER.indexOf(status);

  return {
    id: grant.id,
    charity: grant.charity,
    charityNumber: grant.charityNumber,
    amount: grant.amount,
    dateRequested: grant.dateRequested,
    dateApproved: statusIdx >= 2 ? grant.dateRequested : null,
    datePaid: status === 'Paid' ? grant.dateRequested : null,
    status,
    issueArea: grant.issueArea,
    timeline: synthesizeTimeline(grant.stage, grant.dateRequested),
    verifiedViaCC: true,
    charityAddress: '',
    charityWebsite: '',
    charityType: '',
    approvalNotes: '',
  };
}

// ── ClientAccount → ClientData builder ────────────────────────────────

function buildClientData(account: ClientAccount, grants: Grant[]): ClientData {
  const balances = {
    cash: account.cashBalance,
    investments: account.investmentBalance,
    offshore: account.offshoreBalance || undefined,
    total: account.totalValue,
  };

  return {
    id: slugify(account.name),
    name: account.name,
    accountNumber: account.accountNumber,
    relationshipManager: account.relationshipManager,
    accountType: account.accountType,
    status: account.status === 'Closed' ? 'Suspended' : account.status,
    onboardedDate: account.onboardedDate,
    balances,
    ytdReturn: account.ytdReturn,
    assetDistribution: synthesizeAssetDistribution(account.investmentBalance),
    grants,
    issueAreaBreakdown: computeIssueAreaBreakdown(grants),
    statements: synthesizeStatements(account.onboardedDate),
    transactions: synthesizeTransactions(grants, balances),
    holdings: synthesizeHoldings(account.investmentBalance, account.name),
    monthlyPerformance: synthesizeMonthlyPerformance(account.totalValue, account.ytdReturn),
    recentActivity: synthesizeRecentActivity(grants),
  };
}

// ── Public API ────────────────────────────────────────────────────────

export async function loadDonorClient(clientSlug: string): Promise<ClientData | null> {
  try {
    const data = await loadAdminData();
    const account = data.clientAccounts.find(
      (a) => slugify(a.name) === clientSlug,
    );

    if (account) {
      const accountGrants = data.grants
        .filter((g) => grantMatchesAccount(g, account))
        .map(mapAdminGrantToDonorGrant);
      return buildClientData(account, accountGrants);
    }
  } catch (err) {
    console.warn('[donor-data-loader] Notion lookup failed, trying mock data', err);
  }

  // Fallback to mock data
  return getClient(clientSlug) ?? null;
}

export async function loadAllDonorClients(): Promise<ClientData[]> {
  try {
    const data = await loadAdminData();

    if (data.clientAccounts.length > 0) {
      const clients: ClientData[] = [];
      for (const account of data.clientAccounts) {
        try {
          const nameLower = account.name.toLowerCase();
          const accountGrants = data.grants
            .filter((g) => {
              // Match by relation if populated, otherwise by grant name containing client name
              if (g.clientAccount) return g.clientAccount === account.name;
              return g.grantName.toLowerCase().includes(nameLower) ||
                     g.grantName.toLowerCase().includes(nameLower.replace(/\s+(fund|trust|foundation)$/i, ''));
            })
            .map(mapAdminGrantToDonorGrant);
          clients.push(buildClientData(account, accountGrants));
        } catch (err) {
          console.warn(`[donor-data-loader] Failed to build client ${account.name}:`, err);
        }
      }
      console.log(`[donor-data-loader] Built ${clients.length} donor clients, total grants: ${clients.reduce((s, c) => s + c.grants.length, 0)}`);
      return clients;
    }
  } catch (err) {
    console.warn('[donor-data-loader] Notion lookup failed, using mock data', err);
  }

  return getAllClients();
}
