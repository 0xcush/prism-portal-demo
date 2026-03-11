import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { formatCurrency } from '../utils/format';
import ErrorBoundary from './ErrorBoundary';

interface IssueArea {
  area: string;
  percentage: number;
  amount: number;
}

interface IssueAreaBreakdownProps {
  data: IssueArea[];
}

const barColors = ['#1e3a5f', '#3b6da1', '#c5a55a', '#6ba368', '#8b5cf6'];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { area: string; amount: number; percentage: number } }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (active && payload && payload.length) {
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
  return null;
}

export default function IssueAreaBreakdown({ data }: IssueAreaBreakdownProps) {
  const totalAmount = data.reduce((sum, d) => sum + d.amount, 0);

  return (
    <ErrorBoundary>
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Giving by Issue Area</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Total granted: {formatCurrency(totalAmount)}
          </p>
        </div>
      </div>

      <div className="h-56 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            barCategoryGap="20%"
          >
            <XAxis type="number" hide domain={[0, 'dataMax']} />
            <YAxis
              type="category"
              dataKey="area"
              width={110}
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
            <Bar dataKey="percentage" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2 pt-4 border-t border-slate-100">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                style={{ backgroundColor: barColors[index % barColors.length] }}
              />
              <span className="text-slate-600">{item.area}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400">{item.percentage}%</span>
              <span className="font-medium text-slate-700 w-20 text-right">
                {formatCurrency(item.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </ErrorBoundary>
  );
}
