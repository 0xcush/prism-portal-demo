import type { Transaction } from '../data/clients';
import { formatCurrencyPrecise as formatCurrency, formatDate } from '../utils/format';
import ErrorBoundary from './ErrorBoundary';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const handleExport = () => {
    const headers = ['Date', 'Description', 'Reference', 'Debit', 'Credit', 'Balance', 'Category'];
    const rows = transactions.map(t => [
      t.date, t.description, t.reference,
      t.debit?.toString() ?? '', t.credit?.toString() ?? '',
      t.balance.toString(), t.category ?? ''
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ErrorBoundary>
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Recent Transactions</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Fund activity statement
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select aria-label="Filter by date range" className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Year to date</option>
              <option>All time</option>
            </select>
            <button
              onClick={handleExport}
              aria-label="Export transactions as CSV"
              className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
            >
              <svg className="w-4 h-4 mr-1.5 text-slate-400" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="py-12 text-center">
          <svg className="w-12 h-12 text-slate-200 mx-auto mb-3" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-sm text-slate-400">No transactions to display</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider sticky left-0 bg-slate-50/50 z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-slate-100">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Reference
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Debit
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Credit
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((txn, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-3.5 text-sm text-slate-500 whitespace-nowrap font-mono text-xs sticky left-0 bg-white z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-slate-100">
                      {formatDate(txn.date)}
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="text-sm text-slate-700">{txn.description}</p>
                      {txn.category && (
                        <p className="text-xs text-slate-400">{txn.category}</p>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-xs text-slate-400 font-mono whitespace-nowrap">
                      {txn.reference}
                      {txn.reference.startsWith('GR-') && (
                        <span className="inline-flex items-center gap-1 ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-600" title="Auto-matched to grant record">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          Auto-matched
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-right whitespace-nowrap">
                      {txn.debit ? (
                        <span className="text-red-600 font-medium">
                          ({formatCurrency(txn.debit)})
                        </span>
                      ) : (
                        <span className="text-slate-300">&mdash;</span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-right whitespace-nowrap">
                      {txn.credit ? (
                        <span className="text-emerald-600 font-medium">
                          {formatCurrency(txn.credit)}
                        </span>
                      ) : (
                        <span className="text-slate-300">&mdash;</span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-sm font-medium text-slate-800 text-right whitespace-nowrap">
                      {formatCurrency(txn.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100">
            <p className="text-xs text-slate-400">
              Showing {transactions.length} most recent transactions. Contact your Relationship Manager for full account history.
            </p>
          </div>
        </>
      )}
    </div>
    </ErrorBoundary>
  );
}
