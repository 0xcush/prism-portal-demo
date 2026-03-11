import SlidePanel from '../SlidePanel';
import StatusBadge from '../StatusBadge';
import { formatCurrencyFull, formatDate } from '../../data/admin';
import type { Prospect } from '../../data/admin';

interface ProspectDetailProps {
  prospect: Prospect | null;
  open: boolean;
  onClose: () => void;
}

export default function ProspectDetail({ prospect, open, onClose }: ProspectDetailProps) {
  if (!prospect) return null;

  return (
    <SlidePanel open={open} onClose={onClose} title={prospect.name} subtitle={prospect.referringFirm ? `via ${prospect.referringFirm}` : undefined}>
      {/* Overview */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Overview</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Stage</span>
            <StatusBadge status={prospect.stage} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Gift Size</span>
            <span className="text-sm font-semibold text-slate-800">{formatCurrencyFull(prospect.giftSize)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Fund Type</span>
            <span className="text-sm text-slate-700">{prospect.fundType === 'DAF' ? 'Donor Advised Fund' : 'Collective Fund'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">UK/US</span>
            <span className="text-sm text-slate-700">{prospect.ukUs}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Probability</span>
            <StatusBadge status={prospect.conversionProbability} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Follow-up Status</span>
            <StatusBadge status={prospect.followUpStatus} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Source Activity</span>
            <span className="text-sm text-slate-700 text-right max-w-[200px]">{prospect.sourceActivity}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Referred By</span>
            <span className="text-sm text-slate-700">{prospect.referredBy}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Relationship Manager</span>
            <span className="text-sm text-slate-700">{prospect.relationshipManager}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Days in Pipeline</span>
            <span className="text-sm font-medium text-slate-700">{prospect.daysInPipeline}</span>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Timeline</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Date Entered Pipeline</span>
            <span className="text-sm text-slate-700">{formatDate(prospect.dateEnteredPipeline)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Last Contact</span>
            <span className="text-sm text-slate-700">{formatDate(prospect.lastContact)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Next Follow-up</span>
            <span className="text-sm font-medium text-slate-700">{formatDate(prospect.nextFollowUp)}</span>
          </div>
        </div>
      </section>

      {/* Notes */}
      {prospect.notes && (
        <section>
          <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Notes</h3>
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3">{prospect.notes}</p>
        </section>
      )}
    </SlidePanel>
  );
}
