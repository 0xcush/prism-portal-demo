interface DashboardTimeFilterProps {
  selected: string;
  onSelect: (period: string) => void;
}

const PERIODS = ['Q1', 'Q2', 'Q3', 'Q4', 'Annual'];

export default function DashboardTimeFilter({ selected, onSelect }: DashboardTimeFilterProps) {
  return (
    <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
      {PERIODS.map((period) => (
        <button
          key={period}
          onClick={() => onSelect(period)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            selected === period
              ? 'bg-white shadow-sm text-navy-700'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );
}
