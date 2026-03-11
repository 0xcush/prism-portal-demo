import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import ErrorBoundary from '../ErrorBoundary';

interface AdminGrant {
  issueArea: string;
  amount: number;
}

interface GrantDistributionChartProps {
  grants: AdminGrant[];
}

const COLORS = [
  '#1e3a5f',
  '#c5a55a',
  '#059669',
  '#2563eb',
  '#7c3aed',
  '#d97706',
  '#dc2626',
  '#0d9488',
  '#4f46e5',
  '#64748b',
];

function formatCurrency(amount: number): string {
  if (amount >= 1000000) return `£${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `£${(amount / 1000).toFixed(0)}K`;
  return `£${amount.toLocaleString()}`;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { area: string; amount: number; percentage: number } }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3">
      <p className="text-sm font-medium text-slate-800">{data.area}</p>
      <p className="text-sm text-slate-500">
        {formatCurrency(data.amount)} ({data.percentage}%)
      </p>
    </div>
  );
}

export default function GrantDistributionChart({ grants }: GrantDistributionChartProps) {
  const chartData = useMemo(() => {
    const byArea: Record<string, number> = {};
    for (const g of grants) {
      byArea[g.issueArea] = (byArea[g.issueArea] || 0) + g.amount;
    }
    const total = Object.values(byArea).reduce((s, v) => s + v, 0);
    return Object.entries(byArea)
      .map(([area, amount]) => ({
        area,
        amount,
        percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [grants]);

  const totalAmount = chartData.reduce((s, d) => s + d.amount, 0);

  return (
    <ErrorBoundary>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Grant Distribution</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Total: {formatCurrency(totalAmount)} across {chartData.length} areas
            </p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="amount"
                nameKey="area"
                stroke="none"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value: string) => (
                  <span className="text-xs text-slate-600">{value}</span>
                )}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ErrorBoundary>
  );
}
