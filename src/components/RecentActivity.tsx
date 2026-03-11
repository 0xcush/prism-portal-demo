import type { ActivityEntry } from '../data/clients';

interface RecentActivityProps {
  activities: ActivityEntry[];
  maxItems?: number;
}

const CURRENT_DATE = new Date('2026-03-10');

function relativeTime(timestamp: string): string {
  const diff = CURRENT_DATE.getTime() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

const iconConfig: Record<ActivityEntry['type'], { bg: string; text: string; icon: JSX.Element }> = {
  income: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    icon: (
      <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
  },
  disbursement: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    icon: (
      <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
  },
  compliance: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    icon: (
      <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  statement: {
    bg: 'bg-gold-50',
    text: 'text-gold-600',
    icon: (
      <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  rebalance: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    icon: (
      <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
};

const SparkleIcon = () => (
  <svg className="w-3.5 h-3.5 text-gold-500 inline-block ml-1" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
    />
  </svg>
);

export default function RecentActivity({ activities, maxItems = 6 }: RecentActivityProps) {
  const visibleItems = activities.slice(0, maxItems);
  const hasMore = activities.length > maxItems;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">Recent Activity</h2>
      </div>

      <div className="divide-y divide-slate-50">
        {visibleItems.map((activity, idx) => {
          const config = iconConfig[activity.type];
          return (
            <div key={idx} className="flex items-start gap-3 px-6 py-4">
              <div
                className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full ${config.bg} ${config.text}`}
              >
                {config.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800">
                  {activity.title}
                  {activity.aiGenerated && <SparkleIcon />}
                </p>
                <p className="text-xs text-slate-500 line-clamp-1">{activity.description}</p>
              </div>
              <span className="flex-shrink-0 text-xs text-slate-400 whitespace-nowrap">
                {relativeTime(activity.timestamp)}
              </span>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="px-6 py-3 border-t border-slate-100">
          <button className="text-sm text-navy-600 hover:text-navy-700 font-medium">
            View all activity
          </button>
        </div>
      )}
    </div>
  );
}
