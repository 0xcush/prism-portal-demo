import { useState, useMemo } from 'react';
import type { QuarterlyKPIs } from '../../data/admin';
import ErrorBoundary from '../ErrorBoundary';

interface LocationKPISectionProps {
  kpis: QuarterlyKPIs[];
}

const LOCATIONS = ['All Locations', 'London', 'Edinburgh', 'Birmingham', 'Manchester', 'Leeds', 'Glasgow'];

export default function LocationKPISection({ kpis }: LocationKPISectionProps) {
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const tableData = useMemo(() => {
    return kpis.map((k) => {
      if (selectedLocation === 'All Locations' || !k.locationBreakdown) {
        return {
          quarter: k.quarter,
          meetings: k.meetings,
          lunchAndLearns: k.lunchAndLearns,
          events: k.events,
          referrals: k.locationBreakdown
            ? k.locationBreakdown.reduce((s, l) => s + l.referrals, 0)
            : 0,
        };
      }
      const loc = k.locationBreakdown.find((l) => l.location === selectedLocation);
      return {
        quarter: k.quarter,
        meetings: loc?.meetings ?? 0,
        lunchAndLearns: loc?.lunchAndLearns ?? 0,
        events: loc?.events ?? 0,
        referrals: loc?.referrals ?? 0,
      };
    });
  }, [kpis, selectedLocation]);

  const totals = useMemo(() => ({
    meetings: tableData.reduce((s, r) => s + r.meetings, 0),
    lunchAndLearns: tableData.reduce((s, r) => s + r.lunchAndLearns, 0),
    events: tableData.reduce((s, r) => s + r.events, 0),
    referrals: tableData.reduce((s, r) => s + r.referrals, 0),
  }), [tableData]);

  return (
    <ErrorBoundary>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-slate-900">Activity by Location</h3>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                  selectedLocation === loc
                    ? 'bg-white shadow-sm text-navy-700'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 uppercase tracking-wider">
                <th className="pb-3 pr-4 font-medium">Quarter</th>
                <th className="pb-3 pr-4 text-center font-medium">Meetings</th>
                <th className="pb-3 pr-4 text-center font-medium">L&Ls</th>
                <th className="pb-3 pr-4 text-center font-medium">Events</th>
                <th className="pb-3 text-center font-medium">Referrals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableData.map((row) => (
                <tr key={row.quarter} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-medium text-slate-900">{row.quarter}</td>
                  <td className="py-3 pr-4 text-center text-slate-700">{row.meetings}</td>
                  <td className="py-3 pr-4 text-center text-slate-700">{row.lunchAndLearns}</td>
                  <td className="py-3 pr-4 text-center text-slate-700">{row.events}</td>
                  <td className="py-3 text-center text-slate-700">{row.referrals}</td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-semibold">
                <td className="py-3 pr-4 text-slate-900">Total</td>
                <td className="py-3 pr-4 text-center text-slate-900">{totals.meetings}</td>
                <td className="py-3 pr-4 text-center text-slate-900">{totals.lunchAndLearns}</td>
                <td className="py-3 pr-4 text-center text-slate-900">{totals.events}</td>
                <td className="py-3 text-center text-slate-900">{totals.referrals}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ErrorBoundary>
  );
}
