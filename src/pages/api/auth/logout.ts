import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('prism_token', { path: '/' });
  cookies.delete('prism_refresh', { path: '/' });
  return redirect('/login');
};
