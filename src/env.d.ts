/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Azure AD / Entra ID application (client) ID */
  readonly AZURE_CLIENT_ID: string;
  /** Azure AD / Entra ID client secret */
  readonly AZURE_CLIENT_SECRET: string;
  /** Azure AD tenant ID (or "common" for multi-tenant) */
  readonly AZURE_TENANT_ID: string;
  /** Secret used to sign/verify session cookies (>=32 chars) */
  readonly SESSION_SECRET: string;
  /** Public base URL of the portal, e.g. https://prism-the-gift-fund.vercel.app */
  readonly PUBLIC_BASE_URL: string;
  /** Backend API URL (optional — enables live data) */
  readonly API_URL: string;
  /** Alias for API_URL */
  readonly BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    user?: {
      id: string;
      email: string;
      name: string;
      role: string;
      portal: string;
      entities: string[];
    };
    token?: string;
  }
}
