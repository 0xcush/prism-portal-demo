import type { Grant } from '../data/clients';
import { formatCurrency, formatDate } from '../utils/format';

interface PendingGrantsProps {
  grants: Grant[];
}

const statusConfig: Record<string, { color: string; bgColor: string; step: number }> = {
  Requested: { color: 'text-slate-600', bgColor: 'bg-slate-100', step: 1 },
  'In Review': { color: 'text-amber-600', bgColor: 'bg-amber-100', step: 2 },
  Approved: { color: 'text-blue-600', bgColor: 'bg-blue-100', step: 3 },
};

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-1 mt-3">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex-1 flex items-center">
          <div
            className={`h-1.5 w-full rounded-full transition-all duration-300 ${
              s <= step ? 'bg-navy-600' : 'bg-slate-100'
            }`}
          />
        </div>
      ))}
    </div>
  );
}

export default function PendingGrants({ grants }: PendingGrantsProps) {
  if (grants.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Pending Grants</h2>
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-slate-200 mx-auto mb-3" aria-hidden="true" role="img" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-slate-400">No pending grants</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Pending Grants</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {grants.length} grant{grants.length !== 1 ? 's' : ''} in progress
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {grants.map((grant) => {
          const config = statusConfig[grant.status] || statusConfig['Requested'];
          return (
            <div
              key={grant.id}
              className="rounded-lg border border-slate-100 p-4 hover:border-slate-200 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-medium text-slate-800">{grant.charity}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Requested {formatDate(grant.dateRequested)}
                  </p>
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {formatCurrency(grant.amount)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}
                >
                  {grant.status}
                </span>
                <span className="text-xs text-slate-400 font-mono">{grant.id}</span>
              </div>

              <ProgressBar step={config.step} />

              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-slate-300 uppercase tracking-wide">Requested</span>
                <span className="text-[10px] text-slate-300 uppercase tracking-wide">Review</span>
                <span className="text-[10px] text-slate-300 uppercase tracking-wide">Approved</span>
                <span className="text-[10px] text-slate-300 uppercase tracking-wide">Paid</span>
              </div>

              {grant.delayReason && (
                <div className="mt-3 flex items-start gap-2 px-3 py-2 rounded-md bg-amber-50 border border-amber-100">
                  <svg
                    className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <p className="text-xs text-amber-700">{grant.delayReason}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
