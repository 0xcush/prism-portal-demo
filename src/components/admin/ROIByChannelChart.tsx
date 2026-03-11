import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import ErrorBoundary from '../ErrorBoundary';

interface BDActivity {
  type: string;
  status: string;
  cost: number;
  prospectsGenerated: number;
}

interface ROIByChannelChartProps {
  activities: BDActivity[];
}

const CHANNEL_COLORS: Record<string, string> = {
  'Lunch & Learn': '#7c3aed',
  'Office Visit': '#2563eb',
  'Conference': '#1e3a5f',
  'Webinar': '#059669',
  'Email Campaign': '#d97706',
  'Networking Event': '#c5a55a',
};

const DEFAULT_COLOR = '#64748b';

function formatCurrencyFull(amount: number): string {
  return `£${amount.toLocaleString('en-GB')}`;
}

interface ChartItem {
  type: string;
  totalCost: number;
  totalProspects: number;
  costPerProspect: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ payload: ChartItem }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3">
      <p className="text-sm font-medium text-slate-800">{data.type}</p>
      <div className="mt-1 space-y-0.5 text-sm text-slate-500">
        <p>Total spend: {formatCurrencyFull(data.totalCost)}</p>
        <p>Prospects: {data.totalProspects}</p>
        <p>Cost/prospect: {formatCurrencyFull(data.costPerProspect)}</p>
      </div>
    </div>
  );
}

export default function ROIByChannelChart({ activities }: ROIByChannelChartProps) {
  const chartData = useMemo(() => {
    const byType: Record<string, { cost: number; prospects: number }> = {};
    for (const a of activities) {
      if (a.status !== 'Completed') continue;
      if (!byType[a.type]) byType[a.type] = { cost: 0, prospects: 0 };
      byType[a.type].cost += a.cost;
      byType[a.type].prospects += a.prospectsGenerated;
    }
    return Object.entries(byType)
      .filter(([_, v]) => v.prospects > 0)
      .map(([type, v]) => ({
        type,
        totalCost: v.cost,
        totalProspects: v.prospects,
        costPerProspect: Math.round(v.cost / v.prospects),
      }))
      .sort((a, b) => a.costPerProspect - b.costPerProspect);
  }, [activities]);

  return (
    <ErrorBoundary>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">ROI by Channel</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Cost per prospect by activity type (lower is better)
            </p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `£${v}`}
              />
              <YAxis
                type="category"
                dataKey="type"
                width={120}
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
              <Bar dataKey="costPerProspect" radius={[0, 4, 4, 0]} barSize={22}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHANNEL_COLORS[entry.type] || DEFAULT_COLOR} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ErrorBoundary>
  );
}
