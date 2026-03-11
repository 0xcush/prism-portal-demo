/**
 * GET  /api/admin/approvals — list approval queue items.
 * POST /api/admin/approvals — approve or reject an item.
 *
 * Falls back to mock data from data/approvals.ts when the backend
 * is unavailable.
 */
import type { APIRoute } from 'astro';
import { getMockApprovals } from '../../../data/approvals';

// In-memory store for demo mode (persists within a single server process)
let approvals = getMockApprovals();

export const GET: APIRoute = async ({ url }) => {
  try {
    const statusFilter = url.searchParams.get('status');
    const priorityFilter = url.searchParams.get('priority');

    let result = [...approvals];

    if (statusFilter) {
      result = result.filter((a) => a.status === statusFilter);
    }
    if (priorityFilter) {
      result = result.filter((a) => a.priority === priorityFilter);
    }

    return new Response(
      JSON.stringify({ items: result, total: result.length }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (err) {
    console.error('[api/admin/approvals] GET error:', err);
    return new Response(JSON.stringify({ error: 'internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as {
      id: string;
      action: 'approve' | 'reject';
      note?: string;
    };

    if (!body.id || !body.action) {
      return new Response(
        JSON.stringify({ error: 'id and action are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const idx = approvals.findIndex((a) => a.id === body.id);
    if (idx === -1) {
      return new Response(JSON.stringify({ error: 'approval not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newStatus = body.action === 'approve' ? 'approved' : 'rejected';
    approvals[idx] = {
      ...approvals[idx],
      status: newStatus as 'approved' | 'rejected',
      updatedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(approvals[idx]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[api/admin/approvals] POST error:', err);
    return new Response(JSON.stringify({ error: 'internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
