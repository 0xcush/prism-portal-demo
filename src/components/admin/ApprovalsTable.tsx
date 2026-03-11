import { useState, useMemo } from 'react';
import ApprovalDetail from './ApprovalDetail';
import type { Approval } from './ApprovalDetail';

interface Props {
  approvals: Approval[];
  apiUrl?: string;
  token?: string;
}

const priorityBadge: Record<string, string> = {
  urgent: 'bg-red-100 text-red-700',
  high: 'bg-orange-100 text-orange-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-slate-100 text-slate-600',
};

const priorityOrder: Record<string, number> = {
  urgent: 0, high: 1, medium: 2, low: 3,
};

function confidenceBar(c: number): { color: string; width: string; label: string } {
  const pct = Math.round(c * 100);
  let color = 'bg-red-500';
  if (c >= 0.8) color = 'bg-emerald-500';
  else if (c >= 0.5) color = 'bg-amber-500';
  return { color, width: `${pct}%`, label: `${pct}%` };
}

function formatDate(iso: string): string {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    });
  } catch { return iso; }
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
  expired: 'bg-slate-100 text-slate-500',
};

export default function ApprovalsTable({ approvals, apiUrl, token }: Props) {
  const [selected, setSelected] = useState<Approval | null>(null);
  const [filterAgent, setFilterAgent] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [items, setItems] = useState(approvals);

  const agentTypes = useMemo(
    () => [...new Set(approvals.map((a) => a.agentType))].sort(),
    [approvals],
  );

  const filtered = useMemo(() => {
    let result = [...items];
    if (filterAgent) result = result.filter((a) => a.agentType === filterAgent);
    if (filterPriority) result = result.filter((a) => a.priority === filterPriority);
    // Sort: priority (urgent first), then createdAt desc
    result.sort((a, b) => {
      const pd = (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9);
      if (pd !== 0) return pd;
      return b.createdAt.localeCompare(a.createdAt);
    });
    return result;
  }, [items, filterAgent, filterPriority]);

  const handleAction = async (id: string, action: 'approve' | 'reject', note: string) => {
    if (apiUrl && token) {
      try {
        const res = await fetch(`${apiUrl}/api/v1/approvals/${id}/${action}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ review_note: note }),
        });
        if (res.ok) {
          setItems((prev) =>
            prev.map((a) =>
              a.id === id ? { ...a, status: action === 'approve' ? 'approved' : 'rejected' } : a,
            ),
          );
          setSelected(null);
          return;
        }
      } catch (err) {
        console.error('[ApprovalsTable] Action failed:', err);
      }
    }
    // Optimistic update if no backend
    setItems((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: action === 'approve' ? 'approved' : 'rejected' } : a,
      ),
    );
    setSelected(null);
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="px-4 py-3 border-b border-slate-100 flex flex-wrap items-center gap-3">
          <select
            value={filterAgent}
            onChange={(e) => setFilterAgent(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-navy-600"
          >
            <option value="">All Agents</option>
            {agentTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-navy-600"
          >
            <option value="">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <span className="ml-auto text-xs text-slate-400">{filtered.length} items</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Agent</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Confidence</th>
                <th className="px-4 py-3 font-medium">Summary</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((a) => {
                const cb = confidenceBar(a.confidence);
                return (
                  <tr
                    key={a.id}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => setSelected(a)}
                  >
                    <td className="px-4 py-3 text-xs font-mono text-slate-500">{a.id.slice(0, 8)}</td>
                    <td className="px-4 py-3 font-medium text-slate-700">{a.agentType}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${priorityBadge[a.priority]}`}>
                        {a.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <div className="flex-1 bg-slate-100 rounded-full h-2">
                          <div className={`h-2 rounded-full ${cb.color}`} style={{ width: cb.width }} />
                        </div>
                        <span className="text-xs text-slate-500 w-8 text-right">{cb.label}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-[250px] truncate">{a.summary}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{formatDate(a.createdAt)}</td>
                    <td className="px-4 py-3">
                      {a.status === 'pending' && (
                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleAction(a.id, 'approve', '')}
                            className="px-2 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                            title="Approve"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(a.id, 'reject', '')}
                            className="px-2 py-1 rounded text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                            title="Reject"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sm text-slate-400">
                    No approvals match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <ApprovalDetail
          approval={selected}
          onClose={() => setSelected(null)}
          onAction={handleAction}
        />
      )}
    </>
  );
}
