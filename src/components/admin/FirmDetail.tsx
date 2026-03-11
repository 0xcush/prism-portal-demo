import SlidePanel from '../SlidePanel';
import StatusBadge from '../StatusBadge';
import { formatCurrency, formatDate } from '../../data/admin';
import type { Firm } from '../../data/admin';

interface FirmDetailProps {
  firm: Firm | null;
  open: boolean;
  onClose: () => void;
}

export default function FirmDetail({ firm, open, onClose }: FirmDetailProps) {
  if (!firm) return null;

  return (
    <SlidePanel open={open} onClose={onClose} title={firm.name} subtitle={firm.type}>
      {/* Overview */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Overview</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Type</span>
            <StatusBadge status={firm.type} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Status</span>
            <StatusBadge status={firm.status} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Relationship Start</span>
            <span className="text-sm text-slate-700">{formatDate(firm.relationshipStart)}</span>
          </div>
          {firm.totalAUM > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Total AUM</span>
              <span className="text-sm font-semibold text-navy-600">{formatCurrency(firm.totalAUM)}</span>
            </div>
          )}
        </div>
      </section>

      {/* Offices */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Offices</h3>
        <div className="flex flex-wrap gap-2">
          {firm.offices.map((office) => (
            <span key={office} className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-50 text-xs text-slate-600 ring-1 ring-inset ring-slate-200">
              {office}
            </span>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-slate-900">{firm.contactCount}</p>
            <p className="text-xs text-slate-400 uppercase mt-0.5">Contacts</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-slate-900">{firm.referralCount}</p>
            <p className="text-xs text-slate-400 uppercase mt-0.5">Referrals</p>
          </div>
        </div>
      </section>

      {/* Activity */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Last Interaction</h3>
        <p className="text-sm text-slate-700">{formatDate(firm.lastInteraction)}</p>
      </section>

      {/* Notes */}
      {firm.personalNotes && (
        <section>
          <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Personal Notes</h3>
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3">{firm.personalNotes}</p>
        </section>
      )}
    </SlidePanel>
  );
}
