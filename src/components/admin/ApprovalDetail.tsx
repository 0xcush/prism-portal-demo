import { useState } from 'react';

export interface Approval {
  id: string;
  agentType: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  confidence: number;
  summary: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  reasoning: string;
  proposedAction: Record<string, unknown>;
  compensatingAction: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  assignedTo: string | null;
}

interface Props {
  approval: Approval;
  onClose: () => void;
  onAction: (id: string, action: 'approve' | 'reject', note: string) => void;
}

const priorityBadge: Record<string, string> = {
  urgent: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-slate-100 text-slate-600 border-slate-200',
};

function confidenceColor(c: number): string {
  if (c < 0.5) return 'bg-red-500';
  if (c < 0.8) return 'bg-amber-500';
  return 'bg-emerald-500';
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch { return iso; }
}

export default function ApprovalDetail({ approval, onClose, onAction }: Props) {
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAction = (action: 'approve' | 'reject') => {
    setSubmitting(true);
    onAction(approval.id, action, note);
  };

  const isPending = approval.status === 'pending';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-lg bg-white shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Approval Detail</h3>
            <p className="text-xs text-slate-400 mt-0.5">#{approval.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Meta row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Agent Type</p>
              <p className="text-sm font-medium text-slate-800">{approval.agentType}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Priority</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityBadge[approval.priority]}`}>
                {approval.priority}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Status</p>
              <p className="text-sm font-medium text-slate-800 capitalize">{approval.status}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Created</p>
              <p className="text-sm text-slate-600">{formatDate(approval.createdAt)}</p>
            </div>
          </div>

          {/* Confidence */}
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Confidence Score</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-slate-100 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${confidenceColor(approval.confidence)}`}
                  style={{ width: `${Math.round(approval.confidence * 100)}%` }}
                />
              </div>
              <span className="text-sm font-bold text-slate-700 w-12 text-right">
                {Math.round(approval.confidence * 100)}%
              </span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Summary</p>
            <p className="text-sm text-slate-700">{approval.summary}</p>
          </div>

          {/* Reasoning */}
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Agent Reasoning</p>
            <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700 whitespace-pre-wrap">
              {approval.reasoning || 'No reasoning provided.'}
            </div>
          </div>

          {/* Proposed Action */}
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Proposed Action</p>
            <pre className="bg-slate-50 rounded-lg p-4 text-xs text-slate-600 overflow-x-auto">
              {JSON.stringify(approval.proposedAction, null, 2)}
            </pre>
          </div>

          {/* Compensating Action */}
          {approval.compensatingAction && (
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Compensating Action</p>
              <pre className="bg-slate-50 rounded-lg p-4 text-xs text-slate-600 overflow-x-auto">
                {JSON.stringify(approval.compensatingAction, null, 2)}
              </pre>
            </div>
          )}

          {/* Review Note + Actions */}
          {isPending && (
            <div className="border-t border-slate-200 pt-5">
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
                Review Note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Optional note for the audit trail..."
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent resize-none"
                rows={3}
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleAction('approve')}
                  disabled={submitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Approve
                </button>
                <button
                  onClick={() => handleAction('reject')}
                  disabled={submitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
