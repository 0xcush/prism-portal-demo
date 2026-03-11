import { g as getRequestToken } from './request-context_DOPo75of.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const API_URL = typeof import.meta !== "undefined" ? Object.assign(__vite_import_meta_env__, { _: process.env._ })?.API_URL || "" : process.env.API_URL || "";
function isApiEnabled() {
  return !!API_URL;
}
function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}
function transformKeys(obj) {
  if (Array.isArray(obj)) return obj.map(transformKeys);
  if (obj !== null && typeof obj === "object") {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[toCamelCase(key)] = transformKeys(value);
    }
    return result;
  }
  return obj;
}
async function apiFetch(path, token) {
  const tk = token || getRequestToken();
  const headers = {
    "Accept": "application/json"
  };
  if (tk) {
    headers["Authorization"] = `Bearer ${tk}`;
  }
  const url = `${API_URL}${path}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${res.statusText} — ${url}`);
  }
  const json = await res.json();
  return transformKeys(json);
}
async function fetchAll(path, token) {
  try {
    const res = await apiFetch(path, token);
    if (Array.isArray(res)) return res;
    if (res && typeof res === "object" && "items" in res) return res.items;
    return [res];
  } catch {
    return [];
  }
}
async function fetchProspects(token) {
  return fetchAll("/api/v1/prospects?size=500", token);
}
async function fetchFirms(token) {
  return fetchAll("/api/v1/firms?size=500", token);
}
async function fetchContacts(token) {
  return fetchAll("/api/v1/contacts?size=500", token);
}
async function fetchAccounts(token) {
  return fetchAll("/api/v1/accounts?size=500", token);
}
async function fetchGrants(token) {
  return fetchAll("/api/v1/grants?size=500", token);
}
async function fetchBDActivities(token) {
  try {
    return await fetchAll("/api/v1/bd-activities?size=500", token);
  } catch {
    return [];
  }
}
async function fetchAllAdminData(token) {
  try {
    const [prospects, firms, contacts, clientAccounts, grants, bdActivities] = await Promise.all([
      fetchProspects(token),
      fetchFirms(token),
      fetchContacts(token),
      fetchAccounts(token),
      fetchGrants(token),
      fetchBDActivities(token)
    ]);
    return { prospects, firms, contacts, clientAccounts, grants, bdActivities };
  } catch (err) {
    console.error("[api-client] Failed to fetch admin data:", err);
    return null;
  }
}
async function verifyMagicLink(magicToken) {
  return apiFetch(
    `/api/v1/auth/magic-link/verify?token=${encodeURIComponent(magicToken)}`
  );
}

export { fetchAllAdminData as f, isApiEnabled as i, verifyMagicLink as v };
