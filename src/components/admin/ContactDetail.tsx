import SlidePanel from '../SlidePanel';
import StatusBadge from '../StatusBadge';
import { formatDate, computeReminderStatus, daysBetween, TAG_COLORS } from '../../data/admin';
import type { Contact } from '../../data/admin';

interface ContactDetailProps {
  contact: Contact | null;
  open: boolean;
  onClose: () => void;
}

const TAG_GROUPS: Record<string, string[]> = {
  Actions: ['Invite to Event', 'Add to Mailing List'],
  Platforms: ['MailChimp', 'Events Gaslight'],
  Status: ['Key Decision Maker', 'VIP', 'New Contact'],
};

export default function ContactDetail({ contact, open, onClose }: ContactDetailProps) {
  if (!contact) return null;

  const today = new Date().toISOString().split('T')[0];
  const daysAgo = daysBetween(contact.lastContactDate, today);
  const reminderStatus = contact.nextReminderDate ? computeReminderStatus(contact.nextReminderDate) : null;

  let daysUntilReminder = 0;
  if (contact.nextReminderDate) {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const reminderDate = new Date(contact.nextReminderDate);
    reminderDate.setHours(0, 0, 0, 0);
    daysUntilReminder = Math.floor((reminderDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  // Progress bar calculation
  let progressPercent = 0;
  let progressColor = 'bg-emerald-500';
  if (contact.contactFrequencyDays) {
    const daysSinceLast = daysBetween(contact.lastContactDate, today);
    progressPercent = Math.min((daysSinceLast / contact.contactFrequencyDays) * 100, 120);
    if (progressPercent > 100) progressColor = 'bg-red-500';
    else if (progressPercent > 70) progressColor = 'bg-amber-500';
  }

  const reminderDateColor = reminderStatus === 'Overdue' ? 'text-red-600' : reminderStatus === 'Due' ? 'text-amber-600' : 'text-slate-700';
  const reminderLabel = daysUntilReminder < 0 ? `${Math.abs(daysUntilReminder)} days overdue` : daysUntilReminder === 0 ? 'today' : `in ${daysUntilReminder} days`;

  // Group contact tags
  const groupedTags: Record<string, string[]> = {};
  if (contact.tags?.length) {
    for (const [group, members] of Object.entries(TAG_GROUPS)) {
      const matched = contact.tags.filter((t) => members.includes(t));
      if (matched.length) groupedTags[group] = matched;
    }
  }

  return (
    <SlidePanel open={open} onClose={onClose} title={contact.name} subtitle={contact.firmName || undefined}>
      {/* Tags */}
      {contact.tags && contact.tags.length > 0 && (
        <section className="mb-6">
          <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Tags</h3>
          {Object.entries(groupedTags).map(([group, tags]) => (
            <div key={group} className="mb-2">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{group}</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {tags.map((tag) => (
                  <span key={tag} className={`px-2 py-0.5 rounded-full text-xs font-medium ${TAG_COLORS[tag] || 'bg-slate-100 text-slate-600'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

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

      {/* Contact Schedule */}
      {contact.contactFrequencyDays && contact.nextReminderDate && (
        <section className="mb-6">
          <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Contact Schedule</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Last contacted</span>
              <span className="text-sm text-slate-700">
                {formatDate(contact.lastContactDate)} <span className="text-slate-400">({daysAgo} days ago)</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Contact frequency</span>
              <span className="text-sm text-slate-700">Every {contact.contactFrequencyDays} days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Next contact due</span>
              <span className={`text-sm font-medium ${reminderDateColor}`}>
                {formatDate(contact.nextReminderDate)} <span className="font-normal">({reminderLabel})</span>
              </span>
            </div>
            {/* Progress bar */}
            <div className="pt-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span>Last contact</span>
                <span>Due</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${progressColor}`}
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

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
