import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '../utils/format';
import ErrorBoundary from './ErrorBoundary';

interface AssetAllocation {
  name: string;
  value: number;
  color: string;
}

interface AssetChartProps {
  data: AssetAllocation[];
  totalInvested: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3">
        <p className="text-sm font-medium text-slate-800">{data.name}</p>
        <p className="text-sm text-slate-500">{data.value}% of portfolio</p>
      </div>
    );
  }
  return null;
}

export default function AssetChart({ data, totalInvested }: AssetChartProps) {
  return (
    <ErrorBoundary>
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Asset Allocation</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Portfolio value: {formatCurrency(totalInvested)}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3 w-full">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-600">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-slate-800">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </ErrorBoundary>
  );
}
