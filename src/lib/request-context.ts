/**
 * Per-request context using AsyncLocalStorage.
 *
 * The middleware sets the token at the start of each request.
 * Library functions (data-loader, api-client) read it without
 * needing explicit parameter threading through .astro pages.
 */
import { AsyncLocalStorage } from 'node:async_hooks';

interface RequestContext {
  token?: string;
}

export const requestContext = new AsyncLocalStorage<RequestContext>();

export function getRequestToken(): string | undefined {
  return requestContext.getStore()?.token;
}
