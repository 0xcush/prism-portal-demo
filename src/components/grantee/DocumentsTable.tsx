import DataTable from '../DataTable';
import type { ColumnDef, FilterDef } from '../DataTable';
import StatusBadge from '../StatusBadge';
import { formatDate } from '../../data/grantees';
import type { DDDocument } from '../../data/grantees';

interface Props {
  documents: DDDocument[];
}

const columns: ColumnDef<DDDocument>[] = [
  {
    key: 'documentName',
    header: 'Document Name',
    render: (row) => (
      <span className="font-medium text-slate-800">{row.documentName}</span>
    ),
  },
  {
    key: 'type',
    header: 'Type',
    render: (row) => <StatusBadge status={row.type} />,
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: 'dateUploaded',
    header: 'Date Uploaded',
    render: (row) => (
      <span className="text-slate-600">{formatDate(row.dateUploaded)}</span>
    ),
    sortValue: (row) => row.dateUploaded || '',
  },
  {
    key: 'expiryDate',
    header: 'Expiry Date',
    render: (row) => {
      if (!row.expiryDate) return <span className="text-slate-400">&mdash;</span>;
      const isExpired = new Date(row.expiryDate) < new Date();
      return (
        <span className={isExpired ? 'text-red-600 font-medium' : 'text-slate-600'}>
          {formatDate(row.expiryDate)}
        </span>
      );
    },
    sortValue: (row) => row.expiryDate || '',
  },
];

const filters: FilterDef[] = [
  {
    key: 'type',
    label: 'Type',
    options: [
      { value: 'Governance', label: 'Governance' },
      { value: 'Financial', label: 'Financial' },
      { value: 'Safeguarding', label: 'Safeguarding' },
      { value: 'Identity', label: 'Identity' },
      { value: 'Regulatory', label: 'Regulatory' },
    ],
  },
  {
    key: 'status',
    label: 'Status',
    options: [
      { value: 'Received', label: 'Received' },
      { value: 'Pending', label: 'Pending' },
      { value: 'Expired', label: 'Expired' },
      { value: 'Not Required', label: 'Not Required' },
    ],
  },
];

export default function DocumentsTable({ documents }: Props) {
  return (
    <DataTable<DDDocument>
      data={documents}
      columns={columns}
      searchKeys={['documentName']}
      searchPlaceholder="Search documents..."
      filters={filters}
      emptyTitle="No documents found"
      emptyDescription="No due diligence documents match your search or filters."
      exportFilename="prism-documents"
    />
  );
}
