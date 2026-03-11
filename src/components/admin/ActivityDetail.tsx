import SlidePanel from '../SlidePanel';
import StatusBadge from '../StatusBadge';
import { formatCurrencyFull, formatDate } from '../../data/admin';
import type { BDActivity } from '../../data/admin';

interface ActivityDetailProps {
  activity: BDActivity | null;
  open: boolean;
  onClose: () => void;
}

const CURRENT_DATE = new Date('2026-03-11');

function getFollowUpDateColor(dateStr: string): string {
  const date = new Date(dateStr);
  const diffDays = (date.getTime() - CURRENT_DATE.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays < 0) return 'text-red-600';
  if (diffDays <= 7) return 'text-amber-600';
  return 'text-emerald-600';
}

export default function ActivityDetail({ activity, open, onClose }: ActivityDetailProps) {
  if (!activity) return null;

  const costPerProspect = activity.prospectsGenerated > 0
    ? Math.round(activity.cost / activity.prospectsGenerated)
    : null;

  return (
    <SlidePanel open={open} onClose={onClose} title={activity.activity} subtitle={activity.firmName || undefined}>
      {/* Overview */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Overview</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Type</span>
            <StatusBadge status={activity.type} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Status</span>
            <StatusBadge status={activity.status} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Date</span>
            <span className="text-sm text-slate-700">{formatDate(activity.date)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Location</span>
            <span className="text-sm text-slate-700 text-right max-w-[200px]">{activity.location}</span>
          </div>
          {activity.firmName && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Firm</span>
              <span className="text-sm text-slate-700">{activity.firmName}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Cost</span>
            <span className="text-sm font-semibold text-slate-800">{formatCurrencyFull(activity.cost)}</span>
          </div>
        </div>
      </section>

      {/* Results (only for Completed) */}
      {activity.status === 'Completed' && (
        <section className="mb-6">
          <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Results</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Attendees</span>
              <span className="text-sm font-medium text-slate-700">{activity.attendeeCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Prospects Generated</span>
              <span className={`text-sm font-semibold ${activity.prospectsGenerated > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                {activity.prospectsGenerated}
              </span>
            </div>
            {costPerProspect !== null && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Cost per Prospect</span>
                <span className="text-sm font-medium text-slate-700">{formatCurrencyFull(costPerProspect)}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Follow-Up */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Follow-Up</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Assigned To</span>
            <span className="text-sm font-medium text-slate-700">{activity.assignedTo}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Follow-Up Date</span>
            <span className={`text-sm font-medium ${getFollowUpDateColor(activity.followUpDate)}`}>
              {formatDate(activity.followUpDate)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Follow-Up Status</span>
            <StatusBadge status={activity.followUpStatus} />
          </div>
          {activity.followUpNotes && (
            <div className="mt-2">
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3">{activity.followUpNotes}</p>
            </div>
          )}
        </div>
      </section>
    </SlidePanel>
  );
}
