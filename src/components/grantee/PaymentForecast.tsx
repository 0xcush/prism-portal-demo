import { useMemo } from 'react';
import StatusBadge from '../StatusBadge';
import EmptyState from '../EmptyState';
import { formatCurrency, formatDate } from '../../data/grantees';
import type { GrantPayment } from '../../data/grantees';

interface Props {
  payments: GrantPayment[];
}

export default function PaymentForecast({ payments }: Props) {
  const upcoming = useMemo(() => {
    return payments
      .filter((p) => p.status === 'Scheduled' || p.status === 'Processing')
      .sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));
  }, [payments]);

  if (upcoming.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <EmptyState
          title="No upcoming payments"
          description="All scheduled payments have been processed."
          icon={
            <svg
              className="w-12 h-12 text-slate-200 mx-auto mb-3"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          }
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-base font-semibold text-slate-900 mb-6">
        Payment Forecast
      </h3>

      <div className="relative">
        {/* Vertical connecting line */}
        <div className="absolute left-[7.5rem] top-2 bottom-2 w-px bg-slate-200 hidden sm:block" />

        <div className="space-y-6">
          {upcoming.map((payment, idx) => (
            <div key={payment.id} className="flex items-start gap-4 sm:gap-6">
              {/* Date (left side) */}
              <div className="w-[6.5rem] flex-shrink-0 text-right pt-0.5">
                <p className="text-sm font-medium text-slate-700">
                  {formatDate(payment.scheduledDate)}
                </p>
              </div>

              {/* Timeline dot */}
              <div className="relative flex-shrink-0 hidden sm:flex items-center justify-center">
                <div
                  className={`w-3 h-3 rounded-full ring-4 ring-white z-10 ${
                    payment.status === 'Processing'
                      ? 'bg-amber-400'
                      : 'bg-blue-400'
                  }`}
                />
              </div>

              {/* Content (right side) */}
              <div className="flex-1 min-w-0 pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    {formatCurrency(payment.amount)}
                  </span>
                  <StatusBadge status={payment.status} />
                </div>
                <p className="text-xs text-slate-500 mt-1 font-mono truncate">
                  {payment.reference}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
