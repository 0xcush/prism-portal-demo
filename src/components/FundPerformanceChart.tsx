import { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency } from '../utils/format';

interface FundPerformanceChartProps {
  data: { month: string; fundValue: number; benchmark: number }[];
  fundName: string;
}

const formatYAxis = (value: number) => {
  if (value >= 1000000) return `£${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `£${(value / 1000).toFixed(0)}K`;
  return `£${value}`;
};

type Range = '12M' | '6M' | '3M';

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-3 text-sm">
      <p className="font-medium text-slate-700 mb-1">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.stroke }}
          />
          <span className="text-slate-500">
            {entry.dataKey === 'fundValue' ? 'Fund Value' : 'Benchmark'}:
          </span>
          <span className="font-medium text-slate-800">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function FundPerformanceChart({ data, fundName }: FundPerformanceChartProps) {
  const [range, setRange] = useState<Range>('12M');

  const filteredData = useMemo(() => {
    if (range === '6M') return data.slice(-6);
    if (range === '3M') return data.slice(-3);
    return data;
  }, [data, range]);

  const returnPct = useMemo(() => {
    if (filteredData.length < 2) return 0;
    const first = filteredData[0].fundValue;
    const last = filteredData[filteredData.length - 1].fundValue;
    return ((last - first) / first) * 100;
  }, [filteredData]);

  const peakValue = useMemo(
    () => Math.max(...data.map((d) => d.fundValue)),
    [data],
  );

  const ranges: Range[] = ['12M', '6M', '3M'];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-800">Fund Performance</h2>
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 ${
                  range === r
                    ? 'bg-white text-navy-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fundGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a5f" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#1e3a5f" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value: string) =>
                value === 'fundValue' ? 'Fund Value' : 'Benchmark'
              }
              iconType="circle"
              wrapperStyle={{ fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="fundValue"
              stroke="#1e3a5f"
              strokeWidth={2}
              fill="url(#fundGradient)"
            />
            <Area
              type="monotone"
              dataKey="benchmark"
              stroke="#94a3b8"
              strokeDasharray="5 5"
              strokeWidth={1.5}
              fill="none"
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
              {range} Return
            </p>
            <p className={`text-lg font-semibold ${returnPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {returnPct >= 0 ? '+' : ''}{returnPct.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Peak Value</p>
            <p className="text-lg font-semibold text-slate-800">
              {formatCurrency(peakValue)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
