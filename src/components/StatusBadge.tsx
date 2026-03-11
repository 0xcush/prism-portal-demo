const statusColorMap: Record<string, string> = {
  // Pipeline stages
  Lead: 'bg-slate-50 text-slate-600 ring-slate-500/10',
  'Initial Contact': 'bg-blue-50 text-blue-600 ring-blue-500/10',
  'Questions Sent': 'bg-indigo-50 text-indigo-600 ring-indigo-500/10',
  'Fee Proposal': 'bg-violet-50 text-violet-600 ring-violet-500/10',
  Contract: 'bg-purple-50 text-purple-600 ring-purple-500/10',
  Onboarding: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  'Active Client': 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  'Handed to RM': 'bg-teal-50 text-teal-700 ring-teal-600/10',

  // Grant stages
  Requested: 'bg-slate-50 text-slate-600 ring-slate-500/10',
  'First Contact': 'bg-blue-50 text-blue-600 ring-blue-500/10',
  'Awaiting Bank Statement': 'bg-orange-50 text-orange-600 ring-orange-500/10',
  'In Review': 'bg-amber-50 text-amber-700 ring-amber-600/10',
  Approved: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  Paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  Declined: 'bg-red-50 text-red-600 ring-red-500/10',

  // DD statuses
  'Not Started': 'bg-slate-50 text-slate-500 ring-slate-400/10',
  Pending: 'bg-amber-50 text-amber-600 ring-amber-500/10',
  'In Progress': 'bg-blue-50 text-blue-600 ring-blue-500/10',
  Complete: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  Failed: 'bg-red-50 text-red-600 ring-red-500/10',

  // Follow-up statuses
  'On Track': 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  Due: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  Overdue: 'bg-red-50 text-red-600 ring-red-500/10',
  Upcoming: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',

  // Probability
  High: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  Low: 'bg-slate-50 text-slate-500 ring-slate-400/10',

  // Account statuses
  Active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  Closed: 'bg-slate-50 text-slate-500 ring-slate-400/10',
  Suspended: 'bg-red-50 text-red-600 ring-red-500/10',

  // Firm statuses
  Nurturing: 'bg-blue-50 text-blue-600 ring-blue-500/10',
  Inactive: 'bg-slate-50 text-slate-500 ring-slate-400/10',

  // Relationship statuses
  Secured: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  Cold: 'bg-slate-100 text-slate-500 ring-slate-400/10',

  // Activity statuses
  Planned: 'bg-blue-50 text-blue-600 ring-blue-500/10',
  Completed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  Cancelled: 'bg-red-50 text-red-600 ring-red-500/10',

  // Payment statuses
  Scheduled: 'bg-blue-50 text-blue-600 ring-blue-500/10',
  Processing: 'bg-amber-50 text-amber-600 ring-amber-500/10',
  Sent: 'bg-teal-50 text-teal-600 ring-teal-500/10',
  Received: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',

  // Document statuses
  Expired: 'bg-red-50 text-red-600 ring-red-500/10',
  'Not Required': 'bg-slate-50 text-slate-400 ring-slate-300/10',
};

interface StatusBadgeProps {
  status: string;
  pulse?: boolean;
  className?: string;
}

export default function StatusBadge({ status, pulse, className = '' }: StatusBadgeProps) {
  const colors = statusColorMap[status] || 'bg-slate-50 text-slate-600 ring-slate-500/10';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${colors} ${pulse ? 'animate-pulse' : ''} ${className}`}
    >
      {status}
    </span>
  );
}
