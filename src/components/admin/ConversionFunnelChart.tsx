import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import ErrorBoundary from '../ErrorBoundary';

interface QuarterlyKPIs {
  quarter: string;
  meetings: number;
  lunchAndLearns: number;
  events: number;
  conversions: number;
}

interface ConversionFunnelChartProps {
  kpis: QuarterlyKPIs[];
}

const LABEL_MAP: Record<string, string> = {
  meetings: 'Meetings',
  lunchAndLearns: 'Lunch & Learns',
  events: 'Events',
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ dataKey: string; value: number; fill: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s, e) => s + e.value, 0);
  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-3 text-sm">
      <p className="font-medium text-slate-700 mb-1">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.fill }}
          />
          <span className="text-slate-500">{LABEL_MAP[entry.dataKey] || entry.dataKey}:</span>
          <span className="font-medium text-slate-800">{entry.value}</span>
        </div>
      ))}
      <div className="mt-1 pt-1 border-t border-slate-100 text-slate-500">
        Total: <span className="font-medium text-slate-800">{total}</span>
      </div>
    </div>
  );
}

export default function ConversionFunnelChart({ kpis }: ConversionFunnelChartProps) {
  return (
    <ErrorBoundary>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">Activity Breakdown by Quarter</h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={kpis} margin={{ top: 5, right: 16, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="quarter"
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
              <Legend
                formatter={(value: string) => LABEL_MAP[value] || value}
                iconType="circle"
                wrapperStyle={{ fontSize: 12 }}
              />
              <Bar dataKey="meetings" stackId="a" fill="#1e3a5f" radius={[0, 0, 0, 0]} />
              <Bar dataKey="lunchAndLearns" stackId="a" fill="#c5a55a" radius={[0, 0, 0, 0]} />
              <Bar dataKey="events" stackId="a" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ErrorBoundary>
  );
}
