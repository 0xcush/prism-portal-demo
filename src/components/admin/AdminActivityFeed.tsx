interface AdminActivity {
  type: 'grant' | 'compliance' | 'prospect' | 'client' | 'meeting';
  title: string;
  description: string;
  timestamp: string;
  aiGenerated: boolean;
}

const CURRENT_DATE = new Date('2026-03-11');

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

const ADMIN_ACTIVITIES: AdminActivity[] = [
  { type: 'grant', title: 'Grant GR-2026-0458 approved', description: 'Emergency Relief Fund — £100,000 to British Red Cross', timestamp: '2026-03-10T14:30:00', aiGenerated: true },
  { type: 'compliance', title: 'DD check completed', description: 'NSPCC — all documents verified, charity registration confirmed', timestamp: '2026-03-10T11:15:00', aiGenerated: true },
  { type: 'prospect', title: 'New prospect entered pipeline', description: 'Beatrice Dunmore — £500K DAF via website enquiry', timestamp: '2026-03-10T09:45:00', aiGenerated: false },
  { type: 'client', title: 'Onboarding milestone', description: 'Sir Geoffrey Hartwell — KYC documentation received', timestamp: '2026-03-09T16:00:00', aiGenerated: false },
  { type: 'grant', title: 'Grant payment sent', description: '£250,000 to NSPCC — Annual Support Grant (PRISM-2025-0722-NSPCC-1)', timestamp: '2026-03-09T10:30:00', aiGenerated: false },
  { type: 'meeting', title: 'L&L completed', description: 'Philanthropy Tax Planning — Evelyn Partners, 14 attendees, 3 prospects', timestamp: '2026-03-08T17:00:00', aiGenerated: false },
  { type: 'compliance', title: 'Document expiry alert', description: 'BHF Contact ID Verification expired — renewal requested', timestamp: '2026-03-08T09:00:00', aiGenerated: true },
  { type: 'prospect', title: 'Stage progression', description: 'Robert Windham KC moved to Fee Proposal — verbal acceptance', timestamp: '2026-03-07T15:30:00', aiGenerated: false },
];

const iconConfig: Record<AdminActivity['type'], { bg: string; text: string; icon: JSX.Element }> = {
  grant: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    icon: (
      <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
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
  prospect: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    icon: (
      <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  client: {
    bg: 'bg-navy-50',
    text: 'text-navy-600',
    icon: (
      <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  meeting: {
    bg: 'bg-gold-50',
    text: 'text-gold-600',
    icon: (
      <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
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

export default function AdminActivityFeed() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">Recent Activity</h2>
      </div>

      <div className="divide-y divide-slate-50">
        {ADMIN_ACTIVITIES.map((activity, idx) => {
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
    </div>
  );
}
