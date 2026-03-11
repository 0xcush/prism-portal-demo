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
