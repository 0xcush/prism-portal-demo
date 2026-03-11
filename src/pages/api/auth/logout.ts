/**
 * Logout — clears session cookie and redirects to Azure AD logout (if configured)
 * then back to the login page.
 */
import type { APIRoute } from 'astro';

const SESSION_COOKIE = 'prism_session';

export const GET: APIRoute = async ({ cookies, redirect, url }) => {
  // Clear session cookies (both new and legacy)
  cookies.delete(SESSION_COOKIE, { path: '/' });
  cookies.delete('prism_token', { path: '/' });
  cookies.delete('prism_refresh', { path: '/' });

  const tenantId = import.meta.env.AZURE_TENANT_ID;

  // If Azure is configured, redirect through Azure AD logout endpoint
  if (tenantId && import.meta.env.AZURE_CLIENT_ID) {
    const baseUrl = (import.meta.env.PUBLIC_BASE_URL || url.origin).replace(/\/$/, '');
    const postLogoutRedirect = `${baseUrl}/login`;
    const azureLogoutUrl =
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/logout?` +
      new URLSearchParams({
        post_logout_redirect_uri: postLogoutRedirect,
      }).toString();
    return redirect(azureLogoutUrl);
  }

  // No Azure config — just redirect to login
  return redirect('/login');
};
