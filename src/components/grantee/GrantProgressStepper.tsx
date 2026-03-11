import { useState } from 'react';
import { formatCurrency, formatDate } from '../../data/grantees';
import type { GranteeGrant, GrantStage } from '../../data/grantees';
import GrantDetail from './GrantDetail';

interface Props {
  grants: GranteeGrant[];
}

const STAGES: GrantStage[] = ['Requested', 'In Review', 'Approved', 'Paid'];

function stageIndex(stage: GrantStage): number {
  if (stage === 'Declined') return -1;
  return STAGES.indexOf(stage);
}

function dateForStage(grant: GranteeGrant, stage: GrantStage): string | null {
  switch (stage) {
    case 'Requested':
      return grant.dateRequested;
    case 'Approved':
      return grant.dateApproved;
    case 'Paid':
      return grant.datePaid;
    default:
      return null;
  }
}

export default function GrantProgressStepper({ grants }: Props) {
  const [selectedGrant, setSelectedGrant] = useState<GranteeGrant | null>(null);

  if (grants.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-slate-500">No grants to display.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {grants.map((grant) => {
        const current = stageIndex(grant.stage);
        const isDeclined = grant.stage === 'Declined';

        return (
          <div
            key={grant.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 cursor-pointer hover:border-navy-300 hover:shadow-md transition-all"
            onClick={() => setSelectedGrant(grant)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  {grant.grantName}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {formatCurrency(grant.amount)} &middot; {grant.donorName}
                </p>
              </div>
              {isDeclined && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 ring-1 ring-inset ring-red-500/10">
                  Declined
                </span>
              )}
            </div>

            {/* Stepper */}
            <div className="flex items-start">
              {STAGES.map((stage, idx) => {
                const isComplete = !isDeclined && idx < current;
                const isCurrent = !isDeclined && idx === current;
                const isUpcoming = !isDeclined && idx > current;
                const isDeclinedStep = isDeclined && idx === 0;
                const date = dateForStage(grant, stage);

                return (
                  <div key={stage} className="flex-1 flex flex-col items-center relative">
                    {/* Connector line */}
                    {idx > 0 && (
                      <div
                        className={`absolute top-3.5 right-1/2 w-full h-0.5 -z-0 ${
                          isComplete || isCurrent
                            ? 'bg-emerald-400'
                            : 'bg-slate-200'
                        }`}
                      />
                    )}

                    {/* Step circle */}
                    <div className="relative z-10">
                      {isDeclined && isDeclinedStep ? (
                        <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      ) : isComplete ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </div>
                      ) : isCurrent ? (
                        <div className="w-7 h-7 rounded-full bg-navy-600 flex items-center justify-center ring-4 ring-navy-100">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-slate-400" />
                        </div>
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={`text-xs mt-2 text-center leading-tight ${
                        isCurrent
                          ? 'font-semibold text-navy-700'
                          : isComplete
                            ? 'font-medium text-emerald-700'
                            : isDeclined && !isDeclinedStep
                              ? 'text-slate-300'
                              : 'text-slate-400'
                      }`}
                    >
                      {stage}
                    </span>

                    {/* Date */}
                    {(isComplete || isCurrent) && date && (
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        {formatDate(date)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <GrantDetail grant={selectedGrant} open={!!selectedGrant} onClose={() => setSelectedGrant(null)} />
    </div>
  );
}
