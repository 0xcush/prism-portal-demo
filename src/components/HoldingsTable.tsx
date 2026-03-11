import type { Holding } from '../data/clients';
import { formatCurrency, formatCurrencyPrecise } from '../utils/format';

interface HoldingsTableProps {
  holdings: Holding[];
}

export default function HoldingsTable({ holdings }: HoldingsTableProps) {
  const sorted = [...holdings].sort((a, b) => b.weight - a.weight);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Holdings</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {sorted.length} positions in portfolio
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider sticky left-0 bg-slate-50/50 z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-slate-100">
                Fund Name
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Units
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Weight
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Change
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sorted.map((holding, index) => (
              <tr
                key={index}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-3.5 sticky left-0 bg-white z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-slate-100">
                  <p className="text-sm text-slate-700 font-medium">{holding.name}</p>
                  <p className="text-xs text-slate-400">{holding.ticker}</p>
                </td>
                <td className="px-6 py-3.5 text-sm text-slate-600 text-right whitespace-nowrap font-mono">
                  {holding.units.toLocaleString('en-GB')}
                </td>
                <td className="px-6 py-3.5 text-sm text-slate-600 text-right whitespace-nowrap">
                  {formatCurrencyPrecise(holding.price)}
                </td>
                <td className="px-6 py-3.5 text-sm font-medium text-slate-800 text-right whitespace-nowrap">
                  {formatCurrency(holding.value)}
                </td>
                <td className="px-6 py-3.5 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1e3a5f] rounded-full"
                        style={{ width: `${holding.weight}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-600 w-12 text-right">{holding.weight.toFixed(1)}%</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-sm text-right whitespace-nowrap">
                  <span className={`inline-flex items-center gap-0.5 font-medium ${holding.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {holding.change >= 0 ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      )}
                    </svg>
                    {Math.abs(holding.change).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
