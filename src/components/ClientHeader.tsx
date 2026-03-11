interface ClientHeaderProps {
  name: string;
  accountNumber: string;
  relationshipManager: string;
  accountType: 'DAF' | 'Collective Fund';
  status: string;
  onboardedDate: string;
}

export default function ClientHeader({
  name,
  accountNumber,
  relationshipManager,
  accountType,
  status,
  onboardedDate,
}: ClientHeaderProps) {
  const formattedDate = new Date(onboardedDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-slate-800">{name}</h1>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                accountType === 'DAF'
                  ? 'bg-navy-50 text-navy-600'
                  : 'bg-gold-50 text-gold-700'
              }`}
            >
              {accountType === 'DAF' ? 'Donor Advised Fund' : 'Collective Fund'}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
              {status}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-slate-500">
            <span className="font-mono text-xs text-slate-400">{accountNumber}</span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-slate-400"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {relationshipManager}
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-slate-400"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Since {formattedDate}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 relative">
          <a
            href={`mailto:${relationshipManager.toLowerCase().replace(/\s+/g, '.')}@prismthegiftfund.co.uk`}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-navy-600 text-white text-sm font-medium hover:bg-navy-700 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
          >
            <svg className="w-4 h-4 mr-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact RM
          </a>
        </div>
      </div>
    </div>
  );
}
