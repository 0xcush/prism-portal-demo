import SlidePanel from '../SlidePanel';
import StatusBadge from '../StatusBadge';
import { formatCurrencyFull, formatDate } from '../../data/admin';
import type { ClientAccount } from '../../data/admin';

interface ClientDetailProps {
  client: ClientAccount | null;
  open: boolean;
  onClose: () => void;
}

export default function ClientDetail({ client, open, onClose }: ClientDetailProps) {
  if (!client) return null;

  const totalNonZero = client.totalValue > 0;
  const cashPct = totalNonZero ? (client.cashBalance / client.totalValue) * 100 : 0;
  const investPct = totalNonZero ? (client.investmentBalance / client.totalValue) * 100 : 0;
  const offshorePct = totalNonZero ? (client.offshoreBalance / client.totalValue) * 100 : 0;

  return (
    <SlidePanel open={open} onClose={onClose} title={client.name} subtitle={client.accountNumber}>
      {/* Account Info */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Account Details</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Account Number</span>
            <span className="text-sm font-mono text-slate-700">{client.accountNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Entity</span>
            <span className="text-sm text-slate-700">{client.entity}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Type</span>
            <span className="text-sm text-slate-700">{client.accountType}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Status</span>
            <StatusBadge status={client.status} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Relationship Manager</span>
            <span className="text-sm text-slate-700">{client.relationshipManager}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Onboarded</span>
            <span className="text-sm text-slate-700">{formatDate(client.onboardedDate)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
                Impact Category
              </span>
            </span>
            <span className="text-sm text-slate-700">{client.impactCategory || 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Location
              </span>
            </span>
            <span className="text-sm text-slate-700">{client.location || 'N/A'}</span>
          </div>
        </div>
      </section>

      {/* Activity & Account Details */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Activity & Account Details</h3>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <span className="text-xs text-slate-500">UK Gifts</span>
              </div>
              <span className="text-sm font-medium text-slate-900">{client.ukGifts ?? 'N/A'}</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <span className="text-xs text-slate-500">Overseas Gifts</span>
              </div>
              <span className="text-sm font-medium text-slate-900">{client.overseasGifts ?? 'N/A'}</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
                <span className="text-xs text-slate-500">Asset Types</span>
              </div>
              <span className="text-sm font-medium text-slate-900">{client.assetTypes?.join(', ') || 'N/A'}</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                <span className="text-xs text-slate-500">Investment Account</span>
              </div>
              <span className="text-sm font-medium text-slate-900">{client.hasInvestmentAccount ? 'Yes' : 'No'}</span>
            </div>
            {client.hasInvestmentAccount && (
              <>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>
                    <span className="text-xs text-slate-500">Provider</span>
                  </div>
                  <span className="text-sm font-medium text-slate-900">{client.investmentProvider || 'N/A'}</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span className="text-xs text-slate-500">Account Manager</span>
                  </div>
                  <span className="text-sm font-medium text-slate-900">{client.accountManager || 'N/A'}</span>
                </div>
              </>
            )}
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-slate-500">Gift Eligible</span>
              </div>
              <span className="text-sm font-medium text-slate-900">{client.giftEligible != null ? (client.giftEligible ? 'Yes' : 'No') : 'N/A'}</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <span className="text-xs text-slate-500">Donor Count</span>
              </div>
              <span className="text-sm font-medium text-slate-900">{client.donorCount ?? 'N/A'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Balance Breakdown */}
      <section className="mb-6">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Balance Breakdown</h3>
        {totalNonZero ? (
          <>
            {/* Visual bar */}
            <div className="flex rounded-full h-3 overflow-hidden mb-4">
              {cashPct > 0 && (
                <div className="bg-blue-400" style={{ width: `${cashPct}%` }} title={`Cash: ${cashPct.toFixed(1)}%`} />
              )}
              {investPct > 0 && (
                <div className="bg-navy-500" style={{ width: `${investPct}%` }} title={`Investments: ${investPct.toFixed(1)}%`} />
              )}
              {offshorePct > 0 && (
                <div className="bg-gold-500" style={{ width: `${offshorePct}%` }} title={`Offshore: ${offshorePct.toFixed(1)}%`} />
              )}
            </div>
            {/* Legend */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-400" />
                  <span className="text-sm text-slate-500">Cash</span>
                </div>
                <span className="text-sm font-medium text-slate-700">{formatCurrencyFull(client.cashBalance)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-navy-500" />
                  <span className="text-sm text-slate-500">Investments</span>
                </div>
                <span className="text-sm font-medium text-slate-700">{formatCurrencyFull(client.investmentBalance)}</span>
              </div>
              {client.offshoreBalance > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gold-500" />
                    <span className="text-sm text-slate-500">Offshore</span>
                  </div>
                  <span className="text-sm font-medium text-slate-700">{formatCurrencyFull(client.offshoreBalance)}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-sm font-medium text-slate-700">Total Value</span>
                <span className="text-sm font-bold text-slate-900">{formatCurrencyFull(client.totalValue)}</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-slate-400">No balances yet</p>
        )}
      </section>

      {/* Performance */}
      <section>
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Performance</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">YTD Return</span>
          {client.ytdReturn > 0 ? (
            <span className="text-sm font-semibold text-emerald-600">+{client.ytdReturn}%</span>
          ) : client.ytdReturn < 0 ? (
            <span className="text-sm font-semibold text-red-600">{client.ytdReturn}%</span>
          ) : (
            <span className="text-sm text-slate-400">-</span>
          )}
        </div>
      </section>
    </SlidePanel>
  );
}
