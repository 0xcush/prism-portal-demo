/**
 * Typed fetch wrapper for the Prism FastAPI backend.
 *
 * Reads API_URL from env and auth token from AsyncLocalStorage context.
 * All responses are transformed from snake_case to camelCase to match
 * the existing TypeScript interfaces.
 */
import { getRequestToken } from './request-context';
import type {
  Prospect,
  Firm,
  Contact,
  ClientAccount,
  AdminGrant,
  BDActivity,
} from '../data/admin';

// ── Config ──────────────────────────────────────────────────────────────

const API_URL = typeof import.meta !== 'undefined'
  ? (import.meta.env?.API_URL || '')
  : (process.env.API_URL || '');

export function isApiEnabled(): boolean {
  return !!API_URL;
}

// ── snake_case → camelCase ──────────────────────────────────────────────

function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function transformKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(transformKeys);
  if (obj !== null && typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      result[toCamelCase(key)] = transformKeys(value);
    }
    return result;
  }
  return obj;
}

// ── Fetch helper ────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, token?: string): Promise<T> {
  const tk = token || getRequestToken();
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (tk) {
    headers['Authorization'] = `Bearer ${tk}`;
  }

  const url = `${API_URL}${path}`;
  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new Error(`API ${res.status}: ${res.statusText} — ${url}`);
  }

  const json = await res.json();
  return transformKeys(json) as T;
}

// ── Paginated response helper ───────────────────────────────────────────

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
}

async function fetchAll<T>(path: string, token?: string): Promise<T[]> {
  try {
    // Try paginated format first
    const res = await apiFetch<PaginatedResponse<T> | T[]>(path, token);
    if (Array.isArray(res)) return res;
    if (res && typeof res === 'object' && 'items' in res) return res.items;
    return [res as T];
  } catch {
    return [];
  }
}

// ── Public API ──────────────────────────────────────────────────────────

export async function fetchProspects(token?: string): Promise<Prospect[]> {
  return fetchAll<Prospect>('/api/v1/prospects?size=500', token);
}

export async function fetchFirms(token?: string): Promise<Firm[]> {
  return fetchAll<Firm>('/api/v1/firms?size=500', token);
}

export async function fetchContacts(token?: string): Promise<Contact[]> {
  return fetchAll<Contact>('/api/v1/contacts?size=500', token);
}

export async function fetchAccounts(token?: string): Promise<ClientAccount[]> {
  return fetchAll<ClientAccount>('/api/v1/accounts?size=500', token);
}

export async function fetchGrants(token?: string): Promise<AdminGrant[]> {
  return fetchAll<AdminGrant>('/api/v1/grants?size=500', token);
}

export async function fetchBDActivities(token?: string): Promise<BDActivity[]> {
  // BD Activities endpoint may not exist yet — return empty
  try {
    return await fetchAll<BDActivity>('/api/v1/bd-activities?size=500', token);
  } catch {
    return [];
  }
}

export async function fetchAllAdminData(token?: string): Promise<{
  prospects: Prospect[];
  firms: Firm[];
  contacts: Contact[];
  clientAccounts: ClientAccount[];
  grants: AdminGrant[];
  bdActivities: BDActivity[];
} | null> {
  try {
    const [prospects, firms, contacts, clientAccounts, grants, bdActivities] = await Promise.all([
      fetchProspects(token),
      fetchFirms(token),
      fetchContacts(token),
      fetchAccounts(token),
      fetchGrants(token),
      fetchBDActivities(token),
    ]);

    return { prospects, firms, contacts, clientAccounts, grants, bdActivities };
  } catch (err) {
    console.error('[api-client] Failed to fetch admin data:', err);
    return null;
  }
}

// ── Admin portal endpoints (try backend, fall back to local API) ───────

import type { Approval } from '../components/admin/ApprovalDetail';

export interface DashboardStats {
  totalProspects: number;
  totalFirms: number;
  totalAccounts: number;
  activeAccounts: number;
  totalGrants: number;
  pendingGrants: number;
  paidGrants: number;
  totalAUM: number;
  totalGrantValue: number;
}

export async function fetchDashboardStats(token?: string): Promise<DashboardStats | null> {
  if (isApiEnabled()) {
    try {
      return await apiFetch<DashboardStats>('/api/v1/stats', token);
    } catch { /* fall through */ }
  }
  try {
    const res = await fetch('/api/admin/stats');
    if (res.ok) return (await res.json()) as DashboardStats;
  } catch { /* ignore */ }
  return null;
}

export async function fetchAdminProspects(token?: string): Promise<Prospect[]> {
  if (isApiEnabled()) {
    try {
      return await fetchAll<Prospect>('/api/v1/prospects?size=500', token);
    } catch { /* fall through */ }
  }
  try {
    const res = await fetch('/api/admin/prospects');
    if (res.ok) {
      const body = await res.json();
      return (body.items || body) as Prospect[];
    }
  } catch { /* ignore */ }
  return [];
}

export async function fetchAdminGrants(token?: string): Promise<AdminGrant[]> {
  if (isApiEnabled()) {
    try {
      return await fetchAll<AdminGrant>('/api/v1/grants?size=500', token);
    } catch { /* fall through */ }
  }
  try {
    const res = await fetch('/api/admin/grants');
    if (res.ok) {
      const body = await res.json();
      return (body.items || body) as AdminGrant[];
    }
  } catch { /* ignore */ }
  return [];
}

export async function fetchApprovals(token?: string): Promise<Approval[]> {
  if (isApiEnabled()) {
    try {
      const res = await apiFetch<{ items: Approval[] } | Approval[]>('/api/v1/approvals?size=500', token);
      return Array.isArray(res) ? res : res.items;
    } catch { /* fall through */ }
  }
  try {
    const res = await fetch('/api/admin/approvals');
    if (res.ok) {
      const body = await res.json();
      return (body.items || body) as Approval[];
    }
  } catch { /* ignore */ }
  return [];
}

export async function submitApprovalAction(
  id: string,
  action: 'approve' | 'reject',
  note?: string,
  token?: string,
): Promise<Approval | null> {
  const payload = { id, action, note };

  if (isApiEnabled()) {
    try {
      const tk = token || getRequestToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };
      if (tk) headers['Authorization'] = `Bearer ${tk}`;

      const res = await fetch(`${API_URL}/api/v1/approvals/${id}/${action}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ note }),
      });
      if (res.ok) return (await res.json()) as Approval;
    } catch { /* fall through */ }
  }

  try {
    const res = await fetch('/api/admin/approvals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) return (await res.json()) as Approval;
  } catch { /* ignore */ }
  return null;
}

// ── Auth helpers ────────────────────────────────────────────────────────

export interface TokenResponse {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export async function verifyMagicLink(magicToken: string): Promise<TokenResponse> {
  return apiFetch<TokenResponse>(
    `/api/v1/auth/magic-link/verify?token=${encodeURIComponent(magicToken)}`,
  );
}

export async function requestMagicLink(email: string, portal: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/v1/auth/magic-link`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, portal }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as any).detail || `Magic link request failed: ${res.status}`);
  }
}

export function getEntraLoginUrl(callbackUrl: string): string {
  return `${API_URL}/api/v1/auth/entra/login?redirect_to=${encodeURIComponent(callbackUrl)}`;
}

export { API_URL };
