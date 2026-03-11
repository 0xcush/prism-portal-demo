/**
 * GET /api/admin/prospects — list prospects with optional stage filter.
 *
 * Query params: ?stage=Lead&limit=100
 */
import type { APIRoute } from 'astro';
import { loadAdminData } from '../../../lib/data-loader';

export const GET: APIRoute = async ({ url }) => {
  try {
    const data = await loadAdminData();
    if (!data) {
      return new Response(JSON.stringify({ error: 'data unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let { prospects } = data;

    const stage = url.searchParams.get('stage');
    if (stage) {
      prospects = prospects.filter((p) => p.stage === stage);
    }

    const limit = parseInt(url.searchParams.get('limit') || '500', 10);
    prospects = prospects.slice(0, limit);

    return new Response(
      JSON.stringify({ items: prospects, total: prospects.length }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (err) {
    console.error('[api/admin/prospects] Error:', err);
    return new Response(JSON.stringify({ error: 'internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
