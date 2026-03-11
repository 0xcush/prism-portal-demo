import SlidePanel from '../SlidePanel';
import StatusBadge from '../StatusBadge';
import { formatDate } from '../../data/admin';
import type { Contact } from '../../data/admin';

interface ContactDetailProps {
  contact: Contact | null;
  open: boolean;
  onClose: () => void;
}

export default function ContactDetail({ contact, open, onClose }: ContactDetailProps) {
  if (!contact) return null;

  return (
    <SlidePanel open={open} onClose={onClose} title={contact.name} subtitle={contact.firmName || undefined}>
      {/* Overview */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Overview</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Category</span>
            <StatusBadge status={contact.category} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Firm</span>
            <span className="text-sm text-slate-700">{contact.firmName || '-'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Source</span>
            <span className="text-sm text-slate-700">{contact.source}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Follow-up Status</span>
            <StatusBadge status={contact.followUpStatus} />
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Email</span>
            <a href={`mailto:${contact.email}`} className="text-sm text-navy-600 hover:text-navy-700 hover:underline">{contact.email}</a>
          </div>
          {contact.phone && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Phone</span>
              <a href={`tel:${contact.phone}`} className="text-sm text-navy-600 hover:text-navy-700 hover:underline">{contact.phone}</a>
            </div>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Timeline</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Last Contact</span>
            <span className="text-sm text-slate-700">{formatDate(contact.lastContactDate)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Next Follow-up</span>
            <span className="text-sm font-medium text-slate-700">{formatDate(contact.nextFollowUp)}</span>
          </div>
        </div>
      </section>

      {/* Notes */}
      {contact.notes && (
        <section>
          <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Notes</h3>
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3">{contact.notes}</p>
        </section>
      )}
    </SlidePanel>
  );
}
