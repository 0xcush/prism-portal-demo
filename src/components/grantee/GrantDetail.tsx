import { useState } from 'react';
import SlidePanel from '../SlidePanel';
import StatusBadge from '../StatusBadge';
import { formatCurrency, formatDate } from '../../data/grantees';
import type { GranteeGrant } from '../../data/grantees';

interface Props {
  grant: GranteeGrant | null;
  open: boolean;
  onClose: () => void;
}

export default function GrantDetail({ grant, open, onClose }: Props) {
  if (!grant) return null;

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={grant.grantName}
      subtitle={grant.id}
    >
      <div className="space-y-6">
        {/* Overview */}
        <section>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Overview</h3>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm text-slate-500">Grant Name</dt>
              <dd className="text-sm font-medium text-slate-800">{grant.grantName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-slate-500">Amount</dt>
              <dd className="text-sm font-medium text-slate-800">{formatCurrency(grant.amount)}</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-sm text-slate-500">Stage</dt>
              <dd><StatusBadge status={grant.stage} /></dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-slate-500">Issue Area</dt>
              <dd className="text-sm font-medium text-slate-800">{grant.issueArea}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-slate-500">Donor</dt>
              <dd className="text-sm font-medium text-slate-800">{grant.donorName}</dd>
            </div>
          </dl>
        </section>

        <hr className="border-slate-100" />

        {/* Timeline */}
        <section>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Timeline</h3>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm text-slate-500">Date Requested</dt>
              <dd className="text-sm font-medium text-slate-800">{formatDate(grant.dateRequested)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-slate-500">Date Approved</dt>
              <dd className="text-sm font-medium text-slate-800">{grant.dateApproved ? formatDate(grant.dateApproved) : '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-slate-500">Date Paid</dt>
              <dd className="text-sm font-medium text-slate-800">{grant.datePaid ? formatDate(grant.datePaid) : '—'}</dd>
            </div>
          </dl>
        </section>

        <hr className="border-slate-100" />

        {/* Due Diligence */}
        <section>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Due Diligence</h3>
          <div className="mb-3">
            <StatusBadge status={grant.ddStatus} />
          </div>
          {grant.requiredDocuments.length > 0 && (
            <ul className="space-y-2">
              {grant.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-50">
                  <span className="text-sm text-slate-700">{doc.name}</span>
                  <span className={`text-xs font-medium ${
                    doc.status === 'Verified' || doc.status === 'Submitted'
                      ? 'text-emerald-600'
                      : 'text-amber-600'
                  }`}>
                    {doc.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Notes */}
        {grant.notes && (
          <>
            <hr className="border-slate-100" />
            <section>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Notes</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{grant.notes}</p>
            </section>
          </>
        )}

        {/* Payment */}
        {grant.paymentRef && (
          <>
            <hr className="border-slate-100" />
            <section>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Payment</h3>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Reference</span>
                <span className="text-sm font-mono font-medium text-slate-800">{grant.paymentRef}</span>
              </div>
            </section>
          </>
        )}
      </div>
    </SlidePanel>
  );
}
