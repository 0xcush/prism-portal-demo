import { useState, useMemo } from 'react';
import type { QuarterlyKPIs } from '../../data/admin';
import ErrorBoundary from '../ErrorBoundary';

interface ConversionRateSectionProps {
  kpis: QuarterlyKPIs[];
}

function DeltaArrow({ current, previous }: { current: number; previous: number }) {
  const delta = current - previous;
  if (Math.abs(delta) < 0.1) return <span className="text-xs text-slate-400">-</span>;
  const isUp = delta > 0;
  return (
    <span className={`inline-flex items-center text-xs font-medium ${isUp ? 'text-emerald-600' : 'text-red-600'}`}>
      <svg className={`w-3 h-3 mr-0.5 ${isUp ? '' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
      </svg>
      {Math.abs(delta).toFixed(1)}pp
    </span>
  );
}

function FunnelBar({ label, value, percentage, maxWidth, color }: {
  label: string; value: number; percentage: number; maxWidth: number; color: string;
}) {
  const width = maxWidth > 0 ? Math.max((value / maxWidth) * 100, 8) : 8;
  return (
    <div className="flex items-center gap-4">
      <div className="w-32 text-sm text-slate-600 text-right shrink-0">{label}</div>
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 bg-slate-100 rounded-full h-8 relative overflow-hidden">
          <div
            className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
            style={{ width: `${width}%`, backgroundColor: color }}
          >
            <span className="text-xs font-bold text-white drop-shadow-sm">{value}</span>
          </div>
        </div>
        <span className="text-sm font-semibold text-slate-700 w-14 text-right">{percentage.toFixed(1)}%</span>
      </div>
    </div>
  );
}

export default function ConversionRateSection({ kpis }: ConversionRateSectionProps) {
  const [selectedQuarter, setSelectedQuarter] = useState(kpis.length - 1);

  const currentKPI = kpis[selectedQuarter];
  const rates = currentKPI?.conversionRates;
  const paths = rates?.conversionPaths ?? [];

  const qoqData = useMemo(() => {
    const metrics = [
      { label: 'Meetings → L&Ls', key: 'meetingsToLunchAndLearns' as const },
      { label: 'Meetings → Referrals', key: 'meetingsToReferrals' as const },
      { label: 'L&Ls → Clients', key: 'lunchAndLearnsToClients' as const },
      { label: 'Overall → Clients', key: 'overallMeetingsToClients' as const },
    ];

    return metrics.map((m) => ({
      label: m.label,
      values: kpis.map((k, i) => ({
        quarter: k.quarter,
        value: k.conversionRates?.[m.key] ?? 0,
        prev: i > 0 ? (kpis[i - 1].conversionRates?.[m.key] ?? 0) : 0,
      })),
    }));
  }, [kpis]);

  if (!rates) return null;

  return (
    <ErrorBoundary>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-slate-900">Conversion Rates</h3>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            {kpis.map((k, i) => (
              <button
                key={k.quarter}
                onClick={() => setSelectedQuarter(i)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedQuarter === i
                    ? 'bg-white shadow-sm text-navy-700'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {k.quarter}
              </button>
            ))}
          </div>
        </div>

        {/* Multi-path funnel */}
        <div className="space-y-3 mb-8">
          <FunnelBar
            label="Meetings"
            value={currentKPI.meetings}
            percentage={100}
            maxWidth={currentKPI.meetings}
            color="#1e3a5f"
          />
          <FunnelBar
            label="Lunch & Learns"
            value={currentKPI.lunchAndLearns}
            percentage={rates.meetingsToLunchAndLearns}
            maxWidth={currentKPI.meetings}
            color="#2d5a8e"
          />
          <FunnelBar
            label="Referrals"
            value={Math.round(currentKPI.meetings * rates.meetingsToReferrals / 100)}
            percentage={rates.meetingsToReferrals}
            maxWidth={currentKPI.meetings}
            color="#c5a55a"
          />
          <FunnelBar
            label="Clients"
            value={currentKPI.conversions}
            percentage={rates.overallMeetingsToClients}
            maxWidth={currentKPI.meetings}
            color="#059669"
          />
        </div>

        {/* Notable Conversion Paths */}
        {paths.length > 0 && (
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Notable Conversion Paths</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider">
                    <th className="pb-2 pr-4 font-medium">Firm</th>
                    <th className="pb-2 pr-4 font-medium">Path</th>
                    <th className="pb-2 font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paths.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2.5 pr-4 font-medium text-slate-900">{p.firm}</td>
                      <td className="py-2.5 pr-4">
                        <div className="flex items-center gap-1 flex-wrap">
                          {p.path.map((step, j) => (
                            <span key={j} className="flex items-center gap-1">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                step === 'Client'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : step === 'Meeting'
                                    ? 'bg-navy-50 text-navy-700'
                                    : step === 'Referral'
                                      ? 'bg-gold-50 text-gold-700'
                                      : 'bg-blue-50 text-blue-700'
                              }`}>
                                {step}
                              </span>
                              {j < p.path.length - 1 && (
                                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                              )}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-2.5 text-slate-600">{p.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quarter-over-Quarter comparison */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Quarter-over-Quarter</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase tracking-wider">
                  <th className="pb-2 pr-4 font-medium">Metric</th>
                  {kpis.map((k) => (
                    <th key={k.quarter} className="pb-2 pr-4 text-center font-medium">{k.quarter}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {qoqData.map((row) => (
                  <tr key={row.label} className="hover:bg-slate-50">
                    <td className="py-2.5 pr-4 text-slate-700 whitespace-nowrap">{row.label}</td>
                    {row.values.map((v) => (
                      <td key={v.quarter} className="py-2.5 pr-4 text-center">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-medium text-slate-900">{v.value.toFixed(1)}%</span>
                          {v.prev > 0 && <DeltaArrow current={v.value} previous={v.prev} />}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
