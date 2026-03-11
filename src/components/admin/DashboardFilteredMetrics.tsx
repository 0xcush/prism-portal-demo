import { useState, useMemo } from 'react';
import DashboardTimeFilter from './DashboardTimeFilter';
import { getQuarter } from '../../data/admin';
import type { Prospect, ClientAccount, AdminGrant, Firm } from '../../data/admin';

interface DashboardFilteredMetricsProps {
  prospects: Prospect[];
  clientAccounts: ClientAccount[];
  grants: AdminGrant[];
  firms: Firm[];
}

function formatCurrency(amount: number): string {
  if (amount >= 1000000) return `£${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `£${(amount / 1000).toFixed(0)}K`;
  return `£${amount.toLocaleString()}`;
}

export default function DashboardFilteredMetrics({
  prospects,
  clientAccounts,
  grants,
  firms,
}: DashboardFilteredMetricsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('Q1');

  const stats = useMemo(() => {
    const filterByQuarter = (dateStr: string) => {
      if (selectedPeriod === 'Annual') return true;
      const q = getQuarter(dateStr);
      if (q !== selectedPeriod) return false;
      const year = new Date(dateStr).getFullYear();
      // For Q1, use 2026; for Q2-Q4, use 2025
      if (selectedPeriod === 'Q1') return year === 2026;
      return year === 2025;
    };

    const filteredProspects = prospects.filter((p) => filterByQuarter(p.dateEnteredPipeline));
    const filteredAccounts =
      selectedPeriod === 'Annual'
        ? clientAccounts
        : clientAccounts.filter((a) => filterByQuarter(a.onboardedDate));
    const activeAccounts = filteredAccounts.filter((a) => a.status === 'Active');
    const filteredGrants =
      selectedPeriod === 'Annual'
        ? grants
        : grants.filter((g) => filterByQuarter(g.dateRequested));
    const grantsInProgress = filteredGrants.filter(
      (g) => !['Paid', 'Declined'].includes(g.stage)
    );

    return {
      totalPipelineValue: filteredProspects.reduce((sum, p) => sum + p.dafSize, 0),
      prospectCount: filteredProspects.length,
      activeAccounts: activeAccounts.length,
      dafCount: activeAccounts.filter((a) => a.accountType === 'DAF').length,
      cfCount: activeAccounts.filter((a) => a.accountType === 'Collective Fund').length,
      grantsPipeline: grantsInProgress.reduce((sum, g) => sum + g.amount, 0),
      grantsCount: grantsInProgress.length,
      firmCount: selectedPeriod === 'Annual' ? firms.length : firms.filter((f) => f.status === 'Active').length,
      activeFirms: firms.filter((f) => f.status === 'Active').length,
      nurturingFirms: firms.filter((f) => f.status === 'Nurturing').length,
    };
  }, [selectedPeriod, prospects, clientAccounts, grants, firms]);

  const periodLabel = selectedPeriod === 'Annual' ? 'All Time' : `${selectedPeriod} ${selectedPeriod === 'Q1' ? '2026' : '2025'}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-500">Showing: {periodLabel}</span>
        <DashboardTimeFilter selected={selectedPeriod} onSelect={setSelectedPeriod} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pipeline Value */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pipeline Value</span>
            <div className="w-8 h-8 rounded-lg bg-navy-50 flex items-center justify-center">
              <svg className="w-4 h-4 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalPipelineValue)}</p>
          <p className="text-xs text-slate-500 mt-1">{stats.prospectCount} prospects</p>
        </div>

        {/* Active Accounts */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Accounts</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.activeAccounts}</p>
          <p className="text-xs text-slate-500 mt-1">{stats.dafCount} DAF &middot; {stats.cfCount} CF</p>
        </div>

        {/* Grants Pipeline */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Grants Pipeline</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(stats.grantsPipeline)}</p>
          <p className="text-xs text-slate-500 mt-1">{stats.grantsCount} grants in progress</p>
        </div>

        {/* Intermediary Network */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Intermediary Network</span>
            <div className="w-8 h-8 rounded-lg bg-gold-50 flex items-center justify-center">
              <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{stats.firmCount}</p>
          <p className="text-xs text-slate-500 mt-1">{stats.activeFirms} active &middot; {stats.nurturingFirms} nurturing</p>
        </div>
      </div>
    </div>
  );
}
