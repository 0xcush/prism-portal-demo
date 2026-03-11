import type { Grant } from '../data/clients';
import { formatCurrency, formatDate } from '../utils/format';

interface GrantDetailProps {
  grant: Grant;
  clientId: string;
  baseUrl: string;
}

const statusStyles: Record<string, string> = {
  Paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  Approved: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  'In Review': 'bg-amber-50 text-amber-700 ring-amber-600/10',
  Requested: 'bg-slate-50 text-slate-600 ring-slate-500/10',
};

const issueAreaColors: Record<string, string> = {
  Healthcare: 'bg-red-50 text-red-700',
  Education: 'bg-indigo-50 text-indigo-700',
  'Arts & Culture': 'bg-purple-50 text-purple-700',
  Environment: 'bg-green-50 text-green-700',
  'Social Welfare': 'bg-orange-50 text-orange-700',
};

const completedStatuses = ['Requested', 'In Review', 'Approved', 'Paid'];

function getStepState(
  stepStatus: string,
  grantStatus: string,
): 'completed' | 'current' | 'future' {
  const stepIdx = completedStatuses.indexOf(stepStatus);
  const grantIdx = completedStatuses.indexOf(grantStatus);
  if (stepIdx < grantIdx) return 'completed';
  if (stepIdx === grantIdx) return 'current';
  return 'future';
}

export default function GrantDetail({ grant, clientId, baseUrl }: GrantDetailProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
        <a
          href={`${baseUrl}dashboard?client=${clientId}`}
          className="text-slate-400 hover:text-navy-600 transition-colors"
        >
          Overview
        </a>
        <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <a
          href={`${baseUrl}grants?client=${clientId}`}
          className="text-slate-400 hover:text-navy-600 transition-colors"
        >
          Grants
        </a>
        <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-700 font-medium">{grant.id}</span>
      </nav>

      {/* Header card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">{grant.charity}</h1>
            <p className="text-sm text-slate-400 mt-0.5">
              No. {grant.charityNumber} &middot; {grant.id}
            </p>
            <span
              className={`mt-2 inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                issueAreaColors[grant.issueArea] || 'bg-slate-50 text-slate-600'
              }`}
            >
              {grant.issueArea}
            </span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-800">{formatCurrency(grant.amount)}</p>
            <span
              className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${
                statusStyles[grant.status]
              }`}
            >
              {grant.status}
            </span>
          </div>
        </div>
      </div>

      {/* AI Verification */}
      {grant.verifiedViaCC && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-emerald-800">
              Verified via Charity Commission API
            </p>
            <p className="text-xs text-emerald-600 mt-0.5">
              Registration number {grant.charityNumber} confirmed active
            </p>
          </div>
        </div>
      )}

      {/* Delay reason */}
      {grant.delayReason && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-800">Review Note</p>
            <p className="text-xs text-amber-600 mt-0.5">{grant.delayReason}</p>
          </div>
        </div>
      )}

      {/* Status Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">Grant Timeline</h2>
        <div className="relative">
          {grant.timeline.map((step, idx) => {
            const state = getStepState(step.status, grant.status);
            const isLast = idx === grant.timeline.length - 1;

            return (
              <div key={idx} className="flex gap-4 pb-6 last:pb-0">
                {/* Indicator column */}
                <div className="flex flex-col items-center">
                  {state === 'completed' && (
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  {state === 'current' && (
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <div className="absolute inset-0 rounded-full bg-navy-600/20 animate-ping" />
                      <div className="relative w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      </div>
                    </div>
                  )}
                  {state === 'future' && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0" />
                  )}
                  {!isLast && (
                    <div
                      className={`w-0.5 flex-1 mt-1 ${
                        state === 'completed'
                          ? 'bg-emerald-300'
                          : state === 'current'
                            ? 'border-l-2 border-dashed border-slate-300'
                            : 'border-l-2 border-dashed border-slate-200'
                      }`}
                      style={{ minHeight: '1.5rem' }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pb-2">
                  <p className="font-medium text-slate-800">{step.status}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{formatDate(step.date)}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{step.actor}</p>
                  {step.note && (
                    <p className="text-sm text-slate-600 mt-1">{step.note}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charity Information */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Charity Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Organization Type</p>
            <p className="text-sm text-slate-700">{grant.charityType}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Registration Number</p>
            <p className="text-sm text-slate-700">{grant.charityNumber}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Address</p>
            <p className="text-sm text-slate-700">{grant.charityAddress}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Website</p>
            <a
              href={`https://${grant.charityWebsite}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-navy-600 hover:text-navy-700 underline"
            >
              {grant.charityWebsite}
            </a>
          </div>
        </div>
      </div>

      {/* Approval Notes */}
      {grant.approvalNotes && (
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Approval Notes</p>
          <p className="text-sm text-slate-700">{grant.approvalNotes}</p>
        </div>
      )}
    </div>
  );
}
