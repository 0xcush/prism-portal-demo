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

interface StageBarChartProps {
  data: { stage: string; count: number; value: number }[];
  title?: string;
}

const STAGE_COLORS: Record<string, string> = {
  'Lead': '#64748b',
  'Initial Contact': '#2563eb',
  'Questions Sent': '#4f46e5',
  'Fee Proposal': '#7c3aed',
  'Contract': '#d97706',
  'Onboarding': '#ea580c',
  'Active Client': '#059669',
  'Handed to RM': '#16a34a',
  'Requested': '#64748b',
  'First Contact': '#2563eb',
  'Awaiting Bank Statement': '#d97706',
  'In Review': '#4f46e5',
  'Approved': '#2563eb',
  'Paid': '#059669',
  'Declined': '#dc2626',
};

const DEFAULT_COLOR = '#64748b';

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

export default function StageBarChart({ data, title = 'Pipeline by Stage' }: StageBarChartProps) {
  return (
    <ErrorBoundary>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">{title}</h2>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="stage"
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={32}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STAGE_COLORS[entry.stage] || DEFAULT_COLOR} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ErrorBoundary>
  );
}
