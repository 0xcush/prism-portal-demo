import { useState } from 'react';
import SlidePanel from '../SlidePanel';
import StatusBadge from '../StatusBadge';
import { formatCurrency, formatDate } from '../../data/admin';
import type { Firm } from '../../data/admin';

interface FirmDetailProps {
  firm: Firm | null;
  open: boolean;
  onClose: () => void;
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-1 text-slate-400 hover:text-slate-600 transition-colors"
      title="Copy email"
    >
      {copied ? (
        <span className="text-emerald-500 text-[10px] font-medium">Copied!</span>
      ) : (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
        </svg>
      )}
    </button>
  );
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
            <span className="text-sm text-slate-500">Relationship</span>
            <StatusBadge status={firm.relationshipStatus} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Relationship Start</span>
            <span className="text-sm text-slate-700">{formatDate(firm.relationshipStart)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Key Contact</span>
            <span className="text-sm text-slate-700">
              <span className="font-medium">{firm.keyContactName}</span>
              <span className="text-slate-400"> — </span>
              <span className="text-slate-500">{firm.keyContactTitle}</span>
            </span>
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
        <section className="mb-6">
          <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Personal Notes</h3>
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3">{firm.personalNotes}</p>
        </section>
      )}

      {/* Advisors */}
      {firm.advisors && firm.advisors.length > 0 && (
        <section>
          <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
            Advisors ({firm.advisors.length})
          </h3>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-3 py-2 text-xs font-medium text-slate-500 uppercase">Name</th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-slate-500 uppercase">Title</th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-slate-500 uppercase">Email</th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-slate-500 uppercase">Phone</th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-slate-500 uppercase">Last Contact</th>
                </tr>
              </thead>
              <tbody>
                {firm.advisors.map((advisor, i) => (
                  <tr key={advisor.email} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                    <td className="px-3 py-2 font-medium text-slate-700 whitespace-nowrap">{advisor.name}</td>
                    <td className="px-3 py-2 text-slate-500 whitespace-nowrap">{advisor.title}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className="inline-flex items-center">
                        <a href={`mailto:${advisor.email}`} className="text-navy-600 hover:underline">{advisor.email}</a>
                        <CopyEmailButton email={advisor.email} />
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-500 whitespace-nowrap">{advisor.phone || '—'}</td>
                    <td className="px-3 py-2 text-slate-500 whitespace-nowrap">{advisor.lastContact ? formatDate(advisor.lastContact) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </SlidePanel>
  );
}
