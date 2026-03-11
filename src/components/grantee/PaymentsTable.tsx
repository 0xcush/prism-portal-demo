import DataTable from '../DataTable';
import type { ColumnDef, FilterDef } from '../DataTable';
import StatusBadge from '../StatusBadge';
import { formatCurrency, formatDate } from '../../data/grantees';
import type { GrantPayment } from '../../data/grantees';

interface Props {
  payments: GrantPayment[];
}

const columns: ColumnDef<GrantPayment>[] = [
  {
    key: 'reference',
    header: 'Reference',
    render: (row) => (
      <span className="font-mono text-xs font-medium text-slate-800">
        {row.reference}
      </span>
    ),
  },
  {
    key: 'grantId',
    header: 'Grant ID',
    render: (row) => (
      <span className="text-slate-600">{row.grantId}</span>
    ),
  },
  {
    key: 'amount',
    header: 'Amount',
    align: 'right',
    render: (row) => (
      <span className="font-medium text-slate-800">
        {formatCurrency(row.amount)}
      </span>
    ),
    sortValue: (row) => row.amount,
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: 'scheduledDate',
    header: 'Scheduled Date',
    render: (row) => (
      <span className="text-slate-600">{formatDate(row.scheduledDate)}</span>
    ),
    sortValue: (row) => row.scheduledDate,
  },
  {
    key: 'sentDate',
    header: 'Sent Date',
    render: (row) => (
      <span className="text-slate-600">{formatDate(row.sentDate)}</span>
    ),
  },
  {
    key: 'bankRef',
    header: 'Bank Ref',
    render: (row) => (
      <span className="font-mono text-xs text-slate-500">
        {row.bankRef || '\u2014'}
      </span>
    ),
  },
];

const filters: FilterDef[] = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { value: 'Scheduled', label: 'Scheduled' },
      { value: 'Processing', label: 'Processing' },
      { value: 'Sent', label: 'Sent' },
      { value: 'Received', label: 'Received' },
      { value: 'Failed', label: 'Failed' },
    ],
  },
];

export default function PaymentsTable({ payments }: Props) {
  return (
    <DataTable<GrantPayment>
      data={payments}
      columns={columns}
      searchKeys={['reference', 'bankRef']}
      searchPlaceholder="Search by reference or bank ref..."
      filters={filters}
      emptyTitle="No payments found"
      emptyDescription="No payments match your search or filters."
      exportFilename="prism-payments"
    />
  );
}
