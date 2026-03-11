import SlidePanel from '../SlidePanel';
import StatusBadge from '../StatusBadge';
import { formatCurrencyFull, formatDate } from '../../data/admin';
import type { AdminGrant } from '../../data/admin';

interface AdminGrantDetailProps {
  grant: AdminGrant | null;
  open: boolean;
  onClose: () => void;
}

export default function AdminGrantDetail({ grant, open, onClose }: AdminGrantDetailProps) {
  if (!grant) return null;

  return (
    <SlidePanel open={open} onClose={onClose} title={grant.grantName} subtitle={`${grant.charity} (#${grant.charityNumber})`}>
      {/* Overview */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Overview</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Amount</span>
            <span className="text-sm font-semibold text-slate-800">{formatCurrencyFull(grant.amount)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Stage</span>
            <StatusBadge status={grant.stage} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Priority</span>
            <StatusBadge status={grant.priority} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Issue Area</span>
            <span className="text-sm text-slate-700">{grant.issueArea}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Days in Stage</span>
            <span className="text-sm font-medium text-slate-700">{grant.daysInStage}</span>
          </div>
        </div>
      </section>

      {/* Due Diligence */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Due Diligence</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">DD Status</span>
            <StatusBadge status={grant.ddStatus} />
          </div>
          {/* DD progress bar */}
          <div>
            <div className="flex rounded-full h-2 overflow-hidden bg-slate-100">
              <div
                className={`transition-all ${
                  grant.ddStatus === 'Complete' ? 'bg-emerald-500 w-full' :
                  grant.ddStatus === 'In Progress' ? 'bg-blue-500 w-3/5' :
                  grant.ddStatus === 'Pending' ? 'bg-amber-500 w-1/4' :
                  grant.ddStatus === 'Failed' ? 'bg-red-500 w-full' :
                  'bg-slate-200 w-0'
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Charity Info */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Charity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Charity Name</span>
            <span className="text-sm text-slate-700">{grant.charity}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Charity Number</span>
            <span className="text-sm font-mono text-slate-700">#{grant.charityNumber}</span>
          </div>
        </div>
      </section>

      {/* Request Details */}
      <section>
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Request Details</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Client Account</span>
            <span className="text-sm text-slate-700 text-right max-w-[200px]">{grant.clientAccount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Requested By</span>
            <span className="text-sm text-slate-700">{grant.requestedBy}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Date Requested</span>
            <span className="text-sm text-slate-700">{formatDate(grant.dateRequested)}</span>
          </div>
        </div>
      </section>
    </SlidePanel>
  );
}
