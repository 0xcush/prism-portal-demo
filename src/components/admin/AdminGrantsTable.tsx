import { useState } from 'react';
import DataTable from '../DataTable';
import type { ColumnDef, FilterDef } from '../DataTable';
import StatusBadge from '../StatusBadge';
import ErrorBoundary from '../ErrorBoundary';
import AdminGrantDetail from './AdminGrantDetail';
import { formatCurrencyFull, formatDate } from '../../data/admin';
import type { AdminGrant } from '../../data/admin';

interface AdminGrantsTableProps {
  adminGrants: AdminGrant[];
}

const columns: ColumnDef<AdminGrant>[] = [
  {
    key: 'grantName',
    header: 'Grant Name',
    render: (row) => (
      <div>
        <p className="font-medium text-slate-900">{row.grantName}</p>
        <p className="text-xs text-slate-400">{row.charity} <span className="text-slate-300">#{row.charityNumber}</span></p>
      </div>
    ),
  },
  {
    key: 'stage',
    header: 'Stage',
    render: (row) => <StatusBadge status={row.stage} />,
  },
  {
    key: 'amount',
    header: 'Amount',
    align: 'right',
    render: (row) => <span className="font-medium text-slate-700">{formatCurrencyFull(row.amount)}</span>,
    sortValue: (row) => row.amount,
  },
  {
    key: 'priority',
    header: 'Priority',
    align: 'center',
    render: (row) => <StatusBadge status={row.priority} />,
  },
  {
    key: 'ddStatus',
    header: 'DD Status',
    align: 'center',
    render: (row) => <StatusBadge status={row.ddStatus} />,
  },
  {
    key: 'clientAccount',
    header: 'Client Account',
    render: (row) => <span className="text-xs text-slate-500 max-w-[140px] truncate block">{row.clientAccount}</span>,
  },
  {
    key: 'requestedBy',
    header: 'Requested By',
    render: (row) => <span className="text-xs text-slate-600">{row.requestedBy}</span>,
  },
  {
    key: 'dateRequested',
    header: 'Date Requested',
    render: (row) => <span className="text-xs text-slate-500">{formatDate(row.dateRequested)}</span>,
  },
  {
    key: 'daysInStage',
    header: 'Days in Stage',
    align: 'center',
    render: (row) => <span className="text-xs text-slate-500">{row.daysInStage}</span>,
    sortValue: (row) => row.daysInStage,
  },
];

const filters: FilterDef[] = [
  {
    key: 'stage',
    label: 'Stage',
    options: [
      { value: 'Requested', label: 'Requested' },
      { value: 'First Contact', label: 'First Contact' },
      { value: 'Awaiting Bank Statement', label: 'Awaiting Bank Statement' },
      { value: 'In Review', label: 'In Review' },
      { value: 'Approved', label: 'Approved' },
      { value: 'Paid', label: 'Paid' },
      { value: 'Declined', label: 'Declined' },
    ],
  },
  {
    key: 'ddStatus',
    label: 'DD Status',
    options: [
      { value: 'Not Started', label: 'Not Started' },
      { value: 'Pending', label: 'Pending' },
      { value: 'In Progress', label: 'In Progress' },
      { value: 'Complete', label: 'Complete' },
      { value: 'Failed', label: 'Failed' },
    ],
  },
  {
    key: 'priority',
    label: 'Priority',
    options: [
      { value: 'High', label: 'High' },
      { value: 'Medium', label: 'Medium' },
      { value: 'Low', label: 'Low' },
    ],
  },
];

export default function AdminGrantsTable({ adminGrants }: AdminGrantsTableProps) {
  const [selected, setSelected] = useState<AdminGrant | null>(null);

  return (
    <ErrorBoundary>
      <DataTable<AdminGrant>
        data={adminGrants}
        columns={columns}
        searchKeys={['grantName', 'charity', 'clientAccount']}
        searchPlaceholder="Search grants..."
        filters={filters}
        onRowClick={(row) => setSelected(row)}
        emptyTitle="No grants found"
        emptyDescription="Try adjusting your search or filter criteria."
        exportFilename="grants-export"
      />
      <AdminGrantDetail
        grant={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </ErrorBoundary>
  );
}
