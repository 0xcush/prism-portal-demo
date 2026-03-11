import { useState } from 'react';
import DataTable from '../DataTable';
import type { ColumnDef, FilterDef } from '../DataTable';
import StatusBadge from '../StatusBadge';
import ErrorBoundary from '../ErrorBoundary';
import ClientDetail from './ClientDetail';
import { formatCurrencyFull, formatDate } from '../../data/admin';
import type { ClientAccount } from '../../data/admin';

interface ClientsTableProps {
  clientAccounts: ClientAccount[];
}

const columns: ColumnDef<ClientAccount>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (row) => (
      <div>
        <p className="font-medium text-slate-900">{row.name}</p>
        <p className="text-xs text-slate-400 font-mono">{row.accountNumber}</p>
      </div>
    ),
  },
  {
    key: 'entity',
    header: 'Entity',
    align: 'center',
    render: (row) => <span className="text-xs text-slate-600">{row.entity}</span>,
  },
  {
    key: 'accountType',
    header: 'Type',
    align: 'center',
    render: (row) => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${row.accountType === 'DAF' ? 'bg-navy-50 text-navy-700' : 'bg-gold-50 text-gold-700'}`}>
        {row.accountType === 'Collective Fund' ? 'CF' : 'DAF'}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    align: 'center',
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: 'cashBalance',
    header: 'Cash',
    align: 'right',
    render: (row) => <span className="text-xs text-slate-600">{row.cashBalance > 0 ? formatCurrencyFull(row.cashBalance) : '-'}</span>,
  },
  {
    key: 'investmentBalance',
    header: 'Investments',
    align: 'right',
    render: (row) => <span className="text-xs text-slate-600">{row.investmentBalance > 0 ? formatCurrencyFull(row.investmentBalance) : '-'}</span>,
  },
  {
    key: 'totalValue',
    header: 'Total Value',
    align: 'right',
    render: (row) => <span className="font-medium text-slate-900">{row.totalValue > 0 ? formatCurrencyFull(row.totalValue) : '-'}</span>,
    sortValue: (row) => row.totalValue,
  },
  {
    key: 'ytdReturn',
    header: 'YTD Return',
    align: 'center',
    render: (row) => {
      if (row.ytdReturn > 0) return <span className="text-xs font-semibold text-emerald-600">+{row.ytdReturn}%</span>;
      if (row.ytdReturn < 0) return <span className="text-xs font-semibold text-red-600">{row.ytdReturn}%</span>;
      return <span className="text-xs text-slate-400">-</span>;
    },
    sortValue: (row) => row.ytdReturn,
  },
  {
    key: 'relationshipManager',
    header: 'RM',
    render: (row) => <span className="text-xs text-slate-500">{row.relationshipManager.split(' ')[0]}</span>,
  },
  {
    key: 'onboardedDate',
    header: 'Onboarded',
    render: (row) => <span className="text-xs text-slate-500">{formatDate(row.onboardedDate)}</span>,
  },
];

const filters: FilterDef[] = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Pending', label: 'Pending' },
      { value: 'Closed', label: 'Closed' },
    ],
  },
  {
    key: 'accountType',
    label: 'Type',
    options: [
      { value: 'DAF', label: 'DAF' },
      { value: 'Collective Fund', label: 'Collective Fund' },
    ],
  },
  {
    key: 'entity',
    label: 'Entity',
    options: [
      { value: 'PTGF', label: 'PTGF' },
      { value: 'TPCT', label: 'TPCT' },
      { value: 'PAL', label: 'PAL' },
      { value: 'Foundation', label: 'Foundation' },
    ],
  },
];

export default function ClientsTable({ clientAccounts }: ClientsTableProps) {
  const [selected, setSelected] = useState<ClientAccount | null>(null);

  return (
    <ErrorBoundary>
      <DataTable<ClientAccount>
        data={clientAccounts}
        columns={columns}
        searchKeys={['name', 'accountNumber']}
        searchPlaceholder="Search accounts..."
        filters={filters}
        onRowClick={(row) => setSelected(row)}
        emptyTitle="No accounts found"
        emptyDescription="Try adjusting your search or filter criteria."
        exportFilename="clients-export"
      />
      <ClientDetail
        client={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </ErrorBoundary>
  );
}
