import { useState, useRef, useEffect } from 'react';
import type { NotionFilter, NotionPropertyType } from '../lib/notion';

// ── Filter config types ─────────────────────────────────────────────────

export interface SelectFilterConfig {
  kind: 'select';
  property: string;
  label: string;
  type: NotionPropertyType;
  options: { value: string; label: string }[];
}

export interface TextFilterConfig {
  kind: 'text';
  property: string;
  label: string;
  type: NotionPropertyType;
  placeholder?: string;
}

export interface NumberRangeFilterConfig {
  kind: 'number_range';
  property: string;
  label: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
}

export interface DateRangeFilterConfig {
  kind: 'date_range';
  property: string;
  label: string;
}

export type FilterConfig =
  | SelectFilterConfig
  | TextFilterConfig
  | NumberRangeFilterConfig
  | DateRangeFilterConfig;

// ── Component props ─────────────────────────────────────────────────────

export interface NotionFilterBarProps {
  filters: FilterConfig[];
  onFilterChange: (activeFilters: NotionFilter[]) => void;
}

// ── Internal state per filter ───────────────────────────────────────────

interface FilterState {
  select: Record<string, string>;        // property -> selected value
  text: Record<string, string>;           // property -> search text
  numberMin: Record<string, string>;      // property -> min value
  numberMax: Record<string, string>;      // property -> max value
  dateAfter: Record<string, string>;      // property -> after date
  dateBefore: Record<string, string>;     // property -> before date
}

const emptyState: FilterState = {
  select: {},
  text: {},
  numberMin: {},
  numberMax: {},
  dateAfter: {},
  dateBefore: {},
};

// ── Component ───────────────────────────────────────────────────────────

export default function NotionFilterBar({ filters, onFilterChange }: NotionFilterBarProps) {
  const [state, setState] = useState<FilterState>(emptyState);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    if (!openFilter) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenFilter(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openFilter]);

  // Build NotionFilter[] from state and emit
  function emitFilters(next: FilterState) {
    const result: NotionFilter[] = [];

    for (const f of filters) {
      switch (f.kind) {
        case 'select': {
          const val = next.select[f.property];
          if (val && val !== 'all') {
            result.push({ property: f.property, type: f.type, condition: 'equals', value: val });
          }
          break;
        }
        case 'text': {
          const val = next.text[f.property];
          if (val && val.trim()) {
            result.push({ property: f.property, type: f.type, condition: 'contains', value: val.trim() });
          }
          break;
        }
        case 'number_range': {
          const min = next.numberMin[f.property];
          const max = next.numberMax[f.property];
          if (min && !isNaN(Number(min))) {
            result.push({ property: f.property, type: 'number', condition: 'greater_than_or_equal_to', value: Number(min) });
          }
          if (max && !isNaN(Number(max))) {
            result.push({ property: f.property, type: 'number', condition: 'less_than_or_equal_to', value: Number(max) });
          }
          break;
        }
        case 'date_range': {
          const after = next.dateAfter[f.property];
          const before = next.dateBefore[f.property];
          if (after) {
            result.push({ property: f.property, type: 'date', condition: 'on_or_after', value: after });
          }
          if (before) {
            result.push({ property: f.property, type: 'date', condition: 'on_or_before', value: before });
          }
          break;
        }
      }
    }

    onFilterChange(result);
  }

  function update(next: FilterState) {
    setState(next);
    emitFilters(next);
  }

  function clearAll() {
    update(emptyState);
    setOpenFilter(null);
  }

  // Count active filters
  const activeCount = filters.reduce((count, f) => {
    switch (f.kind) {
      case 'select':
        return count + (state.select[f.property] && state.select[f.property] !== 'all' ? 1 : 0);
      case 'text':
        return count + (state.text[f.property]?.trim() ? 1 : 0);
      case 'number_range':
        return count + (state.numberMin[f.property] ? 1 : 0) + (state.numberMax[f.property] ? 1 : 0);
      case 'date_range':
        return count + (state.dateAfter[f.property] ? 1 : 0) + (state.dateBefore[f.property] ? 1 : 0);
      default:
        return count;
    }
  }, 0);

  function getLabel(f: FilterConfig): string {
    switch (f.kind) {
      case 'select': {
        const val = state.select[f.property];
        if (val && val !== 'all') return val;
        return f.label;
      }
      case 'text': {
        const val = state.text[f.property];
        if (val?.trim()) return `${f.label}: ${val}`;
        return f.label;
      }
      case 'number_range': {
        const min = state.numberMin[f.property];
        const max = state.numberMax[f.property];
        if (min || max) return `${f.label}: ${min || '*'}–${max || '*'}`;
        return f.label;
      }
      case 'date_range': {
        const after = state.dateAfter[f.property];
        const before = state.dateBefore[f.property];
        if (after || before) return `${f.label}: ${after || '*'} – ${before || '*'}`;
        return f.label;
      }
      default:
        return f.label;
    }
  }

  function isActive(f: FilterConfig): boolean {
    switch (f.kind) {
      case 'select': return !!(state.select[f.property] && state.select[f.property] !== 'all');
      case 'text': return !!state.text[f.property]?.trim();
      case 'number_range': return !!(state.numberMin[f.property] || state.numberMax[f.property]);
      case 'date_range': return !!(state.dateAfter[f.property] || state.dateBefore[f.property]);
      default: return false;
    }
  }

  return (
    <div className="flex items-center gap-2 flex-wrap" ref={containerRef}>
      {filters.map((f) => (
        <div key={f.property} className="relative">
          <button
            onClick={() => setOpenFilter(openFilter === f.property ? null : f.property)}
            className={`inline-flex items-center px-3 py-2 rounded-lg border text-sm transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 ${
              isActive(f)
                ? 'border-navy-200 bg-navy-50 text-navy-700'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <svg className="w-3.5 h-3.5 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {getLabel(f)}
            <svg className="w-3.5 h-3.5 ml-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openFilter === f.property && (
            <div className="absolute left-0 mt-1 bg-white rounded-lg border border-slate-200 shadow-lg z-20 min-w-[200px]">
              {f.kind === 'select' && (
                <div className="max-h-60 overflow-y-auto">
                  <button
                    onClick={() => {
                      update({ ...state, select: { ...state.select, [f.property]: 'all' } });
                      setOpenFilter(null);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors first:rounded-t-lg ${
                      !state.select[f.property] || state.select[f.property] === 'all'
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
                        update({ ...state, select: { ...state.select, [f.property]: opt.value } });
                        setOpenFilter(null);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors last:rounded-b-lg ${
                        state.select[f.property] === opt.value
                          ? 'text-navy-600 font-medium bg-slate-50'
                          : 'text-slate-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {f.kind === 'text' && (
                <div className="p-3">
                  <input
                    type="text"
                    value={state.text[f.property] || ''}
                    onChange={(e) => update({ ...state, text: { ...state.text, [f.property]: e.target.value } })}
                    placeholder={f.placeholder || `Filter by ${f.label.toLowerCase()}...`}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent"
                    autoFocus
                  />
                </div>
              )}

              {f.kind === 'number_range' && (
                <div className="p-3 space-y-2">
                  <input
                    type="number"
                    value={state.numberMin[f.property] || ''}
                    onChange={(e) => update({ ...state, numberMin: { ...state.numberMin, [f.property]: e.target.value } })}
                    placeholder={f.minPlaceholder || 'Min'}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent"
                  />
                  <input
                    type="number"
                    value={state.numberMax[f.property] || ''}
                    onChange={(e) => update({ ...state, numberMax: { ...state.numberMax, [f.property]: e.target.value } })}
                    placeholder={f.maxPlaceholder || 'Max'}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent"
                  />
                </div>
              )}

              {f.kind === 'date_range' && (
                <div className="p-3 space-y-2">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">From</label>
                    <input
                      type="date"
                      value={state.dateAfter[f.property] || ''}
                      onChange={(e) => update({ ...state, dateAfter: { ...state.dateAfter, [f.property]: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">To</label>
                    <input
                      type="date"
                      value={state.dateBefore[f.property] || ''}
                      onChange={(e) => update({ ...state, dateBefore: { ...state.dateBefore, [f.property]: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 transition-colors"
        >
          Clear all ({activeCount})
        </button>
      )}
    </div>
  );
}
