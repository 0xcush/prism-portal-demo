import { useState } from 'react';
import type { Statement } from '../data/clients';
import { formatDate } from '../utils/format';

interface StatementDownloadProps {
  statements: Statement[];
}

export default function StatementDownload({ statements }: StatementDownloadProps) {
  const [downloading, setDownloading] = useState<Record<number, 'idle' | 'loading' | 'ready'>>({});

  const handleDownload = (index: number) => {
    setDownloading((prev) => ({ ...prev, [index]: 'loading' }));
    setTimeout(() => {
      setDownloading((prev) => ({ ...prev, [index]: 'ready' }));
      setTimeout(() => {
        setDownloading((prev) => ({ ...prev, [index]: 'idle' }));
      }, 1500);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Statements</h2>
          <p className="text-sm text-slate-400 mt-0.5">Download your fund statements</p>
        </div>
      </div>

      <div className="space-y-3">
        {statements.map((statement, index) => {
          const state = downloading[index] || 'idle';
          return (
            <div
              key={index}
              className="flex items-center justify-between p-3.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-500" aria-hidden="true" role="img" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z" />
                    <path d="M8 15h8v1H8zm0-2h8v1H8zm0-2h5v1H8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{statement.period}</p>
                  <p className="text-xs text-slate-400">
                    {statement.type} &middot; {formatDate(statement.date)}
                  </p>
                  {statement.aiGenerated && (
                    <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] font-medium text-gold-600">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      AI-generated
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleDownload(index)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-navy-50 transition-colors opacity-70 group-hover:opacity-100 focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
              >
                {state === 'loading' ? (
                  <span className="inline-flex items-center gap-1.5 text-navy-600">
                    <svg className="w-4 h-4 animate-spin" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Preparing...
                  </span>
                ) : state === 'ready' ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-600">
                    <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Ready
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-navy-600">
                    <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
