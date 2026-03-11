import { useState, useMemo, useRef, useEffect } from 'react';
import StatusBadge from '../StatusBadge';
import ErrorBoundary from '../ErrorBoundary';
import EmptyState from '../EmptyState';
import FirmDetail from './FirmDetail';
import { formatCurrency, formatDate } from '../../data/admin';
import type { Firm } from '../../data/admin';

interface FirmsGridProps {
  firms: Firm[];
}

interface FilterDef {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

const filters: FilterDef[] = [
  {
    key: 'type',
    label: 'Type',
    options: [
      { value: 'Investment Manager', label: 'Investment Manager' },
      { value: 'Wealth Advisor', label: 'Wealth Advisor' },
      { value: 'Accountancy', label: 'Accountancy' },
      { value: 'Law Firm', label: 'Law Firm' },
      { value: 'Family Office', label: 'Family Office' },
      { value: 'Philanthropy Advisor', label: 'Philanthropy Advisor' },
    ],
  },
  {
    key: 'status',
    label: 'Status',
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Nurturing', label: 'Nurturing' },
      { value: 'Inactive', label: 'Inactive' },
    ],
  },
];

export default function FirmsGrid({ firms }: FirmsGridProps) {
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<Firm | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openFilter) return;
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenFilter(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openFilter]);

  const filtered = useMemo(() => {
    let rows = [...firms];

    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter((f) =>
        f.name.toLowerCase().includes(q) || f.personalNotes.toLowerCase().includes(q),
      );
    }

    for (const [key, value] of Object.entries(activeFilters)) {
      if (value && value !== 'all') {
        rows = rows.filter((f) => (f as any)[key] === value);
      }
    }

    return rows;
  }, [firms, search, activeFilters]);

  const activeFilterCount = Object.values(activeFilters).filter((v) => v && v !== 'all').length;

  const clearAll = () => {
    setSearch('');
    setActiveFilters({});
  };

  return (
    <ErrorBoundary>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search firms..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent transition-shadow"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap" ref={filterRef}>
              {filters.map((f) => (
                <div key={f.key} className="relative">
                  <button
                    onClick={() => setOpenFilter(openFilter === f.key ? null : f.key)}
                    className={`inline-flex items-center px-3 py-2 rounded-lg border text-sm transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 ${
                      activeFilters[f.key] && activeFilters[f.key] !== 'all'
                        ? 'border-navy-200 bg-navy-50 text-navy-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    {activeFilters[f.key] && activeFilters[f.key] !== 'all' ? activeFilters[f.key] : f.label}
                    <svg className="w-3.5 h-3.5 ml-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFilter === f.key && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg border border-slate-200 shadow-lg z-20 max-h-60 overflow-y-auto">
                      <button
                        onClick={() => {
                          setActiveFilters((prev) => ({ ...prev, [f.key]: 'all' }));
                          setOpenFilter(null);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors first:rounded-t-lg ${
                          !activeFilters[f.key] || activeFilters[f.key] === 'all'
                            ? 'text-navy-600 font-medium bg-slate-50'
                            : 'text-slate-600'
                        }`}
                      >
                        All
                      </button>
                      {f.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setActiveFilters((prev) => ({ ...prev, [f.key]: opt.value }));
                            setOpenFilter(null);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors last:rounded-b-lg ${
                            activeFilters[f.key] === opt.value
                              ? 'text-navy-600 font-medium bg-slate-50'
                              : 'text-slate-600'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {(search || activeFilterCount > 0) && (
                <button
                  onClick={clearAll}
                  className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div className="mt-2 text-xs text-slate-400">
            {filtered.length === firms.length
              ? `${firms.length} firm${firms.length === 1 ? '' : 's'}`
              : `${filtered.length} of ${firms.length} firms`}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <EmptyState
            title="No firms found"
            description="Try adjusting your search or filter criteria."
            action={
              search || activeFilterCount > 0
                ? { label: 'Clear filters', onClick: clearAll }
                : undefined
            }
          />
        ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelected(f)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelected(f);
                  }
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{f.name}</h3>
                    <StatusBadge status={f.type} className="mt-1" />
                  </div>
                  <StatusBadge status={f.status} />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {f.offices.join(', ')}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Last: {formatDate(f.lastInteraction)}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-900">{f.contactCount}</p>
                      <p className="text-[10px] text-slate-400 uppercase">Contacts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-900">{f.referralCount}</p>
                      <p className="text-[10px] text-slate-400 uppercase">Referrals</p>
                    </div>
                  </div>
                  {f.totalAUM > 0 && (
                    <div className="text-right">
                      <p className="text-sm font-bold text-navy-600">{formatCurrency(f.totalAUM)}</p>
                      <p className="text-[10px] text-slate-400 uppercase">AUM</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FirmDetail
        firm={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </ErrorBoundary>
  );
}
