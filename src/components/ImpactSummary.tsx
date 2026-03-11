import { formatCurrency } from '../utils/format';

interface ImpactSummaryProps {
  grants: { amount: number; status: string; datePaid: string | null }[];
}

export default function ImpactSummary({ grants }: ImpactSummaryProps) {
  const paidGrants = grants.filter((g) => g.status === 'Paid');
  const totalGranted = paidGrants.reduce((sum, g) => sum + g.amount, 0);
  const charitiesSupported = paidGrants.length;
  const avgGrantSize = charitiesSupported > 0 ? totalGranted / charitiesSupported : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-red-400" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <h2 className="text-lg font-semibold text-slate-800">Impact Summary</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Granted</p>
            <p className="text-2xl font-bold text-slate-800">{formatCurrency(totalGranted)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Charities Supported</p>
            <p className="text-xl font-bold text-slate-800">{charitiesSupported}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Avg Grant Size</p>
            <p className="text-xl font-bold text-slate-800">{formatCurrency(avgGrantSize)}</p>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-4 pt-4 border-t border-slate-100">
          Based on completed grants
        </p>
      </div>
    </div>
  );
}
