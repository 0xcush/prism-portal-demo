import { useState, useEffect, useRef } from 'react';
import type { Grant } from '../data/clients';
import { formatCurrency, formatDate } from '../utils/format';
import ErrorBoundary from './ErrorBoundary';

interface GrantHistoryProps {
  grants: Grant[];
  baseUrl?: string;
}

const statusStyles: Record<string, string> = {
  Paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  Approved: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  'In Review': 'bg-amber-50 text-amber-700 ring-amber-600/10',
  Requested: 'bg-slate-50 text-slate-600 ring-slate-500/10',
};

const statusOptions = ['all', 'Paid', 'Approved', 'In Review', 'Requested'] as const;

export default function GrantHistory({ grants, baseUrl }: GrantHistoryProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showFilterDropdown) return;
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowFilterDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilterDropdown]);

  const filteredGrants = statusFilter === 'all'
    ? grants
    : grants.filter((g) => g.status === statusFilter);

  const totalGranted = grants
    .filter((g) => g.status === 'Paid')
    .reduce((sum, g) => sum + g.amount, 0);
  const grantCount = grants.filter((g) => g.status === 'Paid').length;

  const handleExport = () => {
    const headers = ['Date', 'Reference', 'Charity', 'Charity Number', 'Issue Area', 'Contact', 'Amount', 'Status'];
    const rows = filteredGrants.map(g => [
      g.dateRequested, g.id, g.charity, g.charityNumber, g.issueArea, g.charityContact || '', g.amount.toString(), g.status
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grant-history.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ErrorBoundary>
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Grant History</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              {grantCount} grants paid totalling {formatCurrency(totalGranted)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                aria-label="Filter grants by status"
                className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
              >
                <svg className="w-4 h-4 mr-1.5 text-slate-400" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {statusFilter === 'all' ? 'Filter' : statusFilter}
              </button>
              {showFilterDropdown && (
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg border border-slate-200 shadow-lg z-10">
                  {statusOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setStatusFilter(option);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        statusFilter === option ? 'text-navy-600 font-medium bg-slate-50' : 'text-slate-600'
                      }`}
                    >
                      {option === 'all' ? 'All' : option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleExport}
              aria-label="Export grants as CSV"
              className="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
            >
              <svg className="w-4 h-4 mr-1.5 text-slate-400" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>

      {filteredGrants.length === 0 ? (
        <div className="py-12 text-center">
          <svg className="w-12 h-12 text-slate-200 mx-auto mb-3" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-sm text-slate-400">No grants match this filter</p>
          <button
            onClick={() => setStatusFilter('all')}
            className="mt-2 text-sm text-navy-600 hover:text-navy-700 font-medium"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider sticky left-0 bg-slate-50/50 z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-slate-100">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Ref
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Charity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Issue Area
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGrants.map((grant) => {
                return (
                <tr
                  key={grant.id}
                  className={`hover:bg-slate-50/50 transition-colors ${baseUrl ? 'cursor-pointer' : ''}`}
                  onClick={baseUrl ? () => { window.location.href = `${baseUrl}grants/${grant.id}`; } : undefined}
                  onKeyDown={baseUrl ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.location.href = `${baseUrl}grants/${grant.id}`; } } : undefined}
                  tabIndex={baseUrl ? 0 : undefined}
                  role={baseUrl ? 'link' : undefined}
                >
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap sticky left-0 bg-white z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-slate-100">
                    {formatDate(grant.dateRequested)}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400 font-mono whitespace-nowrap">
                    {grant.id}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{grant.charity}</p>
                      <p className="text-xs text-slate-400">
                        No. {grant.charityNumber}
                        {grant.verifiedViaCC && (
                          <span className="inline-flex items-center gap-1 ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-600">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            CC Verified
                          </span>
                        )}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                    {grant.issueArea}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                    {grant.charityContact || '—'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800 text-right whitespace-nowrap">
                    {formatCurrency(grant.amount)}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${
                        statusStyles[grant.status]
                      } ${grant.status === 'In Review' ? 'animate-pulse' : ''}`}
                    >
                      {grant.status}
                    </span>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </ErrorBoundary>
  );
}
