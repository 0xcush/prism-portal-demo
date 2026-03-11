import {
  LineChart,
  Line,
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
  newProspects: number;
  conversions: number;
}

interface KPITrendChartProps {
  kpis: QuarterlyKPIs[];
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ dataKey: string; value: number; stroke: string }>;
  label?: string;
}

const LABEL_MAP: Record<string, string> = {
  meetings: 'Meetings',
  newProspects: 'New Prospects',
  conversions: 'Conversions',
};

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-3 text-sm">
      <p className="font-medium text-slate-700 mb-1">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.stroke }}
          />
          <span className="text-slate-500">{LABEL_MAP[entry.dataKey] || entry.dataKey}:</span>
          <span className="font-medium text-slate-800">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function KPITrendChart({ kpis }: KPITrendChartProps) {
  return (
    <ErrorBoundary>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">KPI Trends</h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={kpis} margin={{ top: 5, right: 16, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
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
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value: string) => LABEL_MAP[value] || value}
                iconType="circle"
                wrapperStyle={{ fontSize: 12 }}
              />
              <Line
                type="monotone"
                dataKey="meetings"
                stroke="#1e3a5f"
                strokeWidth={2}
                dot={{ r: 4, fill: '#1e3a5f' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="newProspects"
                stroke="#c5a55a"
                strokeWidth={2}
                dot={{ r: 4, fill: '#c5a55a' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="conversions"
                stroke="#059669"
                strokeWidth={2}
                dot={{ r: 4, fill: '#059669' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ErrorBoundary>
  );
}
