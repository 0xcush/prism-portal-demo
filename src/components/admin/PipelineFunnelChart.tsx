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

interface Prospect {
  stage: string;
  dafSize: number;
}

interface PipelineFunnelChartProps {
  prospects: Prospect[];
}

const STAGE_ORDER = [
  'Lead',
  'Initial Contact',
  'Questions Sent',
  'Fee Proposal',
  'Contract',
  'Onboarding',
  'Active Client',
  'Handed to RM',
];

const STAGE_COLORS: Record<string, string> = {
  'Lead': '#64748b',
  'Initial Contact': '#2563eb',
  'Questions Sent': '#4f46e5',
  'Fee Proposal': '#7c3aed',
  'Contract': '#d97706',
  'Onboarding': '#ea580c',
  'Active Client': '#059669',
  'Handed to RM': '#16a34a',
};

function formatCurrency(amount: number): string {
  if (amount >= 1000000) return `£${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `£${(amount / 1000).toFixed(0)}K`;
  return `£${amount.toLocaleString()}`;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { stage: string; count: number; value: number } }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3">
      <p className="text-sm font-medium text-slate-800">{data.stage}</p>
      <p className="text-sm text-slate-500">
        {data.count} prospect{data.count !== 1 ? 's' : ''} &middot; {formatCurrency(data.value)}
      </p>
    </div>
  );
}

export default function PipelineFunnelChart({ prospects }: PipelineFunnelChartProps) {
  const { chartData, totalValue } = useMemo(() => {
    const byStage: Record<string, { count: number; value: number }> = {};
    for (const p of prospects) {
      if (!byStage[p.stage]) byStage[p.stage] = { count: 0, value: 0 };
      byStage[p.stage].count += 1;
      byStage[p.stage].value += p.dafSize;
    }
    const data = STAGE_ORDER.map(stage => ({
      stage,
      count: byStage[stage]?.count || 0,
      value: byStage[stage]?.value || 0,
    }));
    const total = prospects.reduce((sum, p) => sum + p.dafSize, 0);
    return { chartData: data, totalValue: total };
  }, [prospects]);

  return (
    <ErrorBoundary>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Pipeline Funnel</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Total pipeline: {formatCurrency(totalValue)}
            </p>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
              barCategoryGap="16%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="stage"
                width={110}
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={22}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STAGE_COLORS[entry.stage] || '#64748b'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ErrorBoundary>
  );
}
