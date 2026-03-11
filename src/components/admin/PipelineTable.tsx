import { useState } from 'react';
import DataTable from '../DataTable';
import type { ColumnDef, FilterDef } from '../DataTable';
import StatusBadge from '../StatusBadge';
import ErrorBoundary from '../ErrorBoundary';
import ProspectDetail from './ProspectDetail';
import { formatCurrencyFull, formatDate } from '../../data/admin';
import type { Prospect } from '../../data/admin';

interface PipelineTableProps {
  prospects: Prospect[];
}

const columns: ColumnDef<Prospect>[] = [
  {
    key: 'name',
    header: 'Name',
    className: 'min-w-[200px] max-w-[260px]',
    render: (row) => (
      <div>
        <p className="font-medium text-slate-900 line-clamp-2">{row.name}</p>
        {row.referringFirm && <p className="text-xs text-slate-400 truncate">via {row.referringFirm}</p>}
      </div>
    ),
  },
  {
    key: 'stage',
    header: 'Stage',
    render: (row) => <StatusBadge status={row.stage} />,
  },
  {
    key: 'dafSize',
    header: 'DAF Size',
    align: 'right',
    render: (row) => <span className="font-medium text-slate-700">{formatCurrencyFull(row.dafSize)}</span>,
    sortValue: (row) => row.dafSize,
  },
  {
    key: 'fundType',
    header: 'Fund Type',
    align: 'center',
    render: (row) => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${row.fundType === 'DAF' ? 'bg-navy-50 text-navy-700' : 'bg-gold-50 text-gold-700'}`}>
        {row.fundType}
      </span>
    ),
  },
  {
    key: 'conversionProbability',
    header: 'Probability',
    align: 'center',
    render: (row) => <StatusBadge status={row.conversionProbability} />,
  },
  {
    key: 'sourceActivity',
    header: 'Source',
    render: (row) => <span className="text-xs text-slate-600 max-w-[140px] truncate block">{row.sourceActivity}</span>,
  },
  {
    key: 'followUpStatus',
    header: 'Follow-up',
    align: 'center',
    render: (row) => <StatusBadge status={row.followUpStatus} />,
  },
  {
    key: 'lastContact',
    header: 'Last Contact',
    render: (row) => <span className="text-xs text-slate-500">{formatDate(row.lastContact)}</span>,
    sortValue: (row) => new Date(row.lastContact).getTime(),
  },
  {
    key: 'daysInPipeline',
    header: 'Days',
    align: 'center',
    render: (row) => <span className="text-xs text-slate-500">{row.daysInPipeline}</span>,
    sortValue: (row) => row.daysInPipeline,
  },
  {
    key: 'relationshipManager',
    header: 'RM',
    render: (row) => <span className="text-xs text-slate-500">{row.relationshipManager.split(' ')[0]}</span>,
  },
  {
    key: 'bdPointOfContact',
    header: 'BD Contact',
    render: (row) => <span className="text-xs text-slate-500">{row.bdPointOfContact}</span>,
  },
];

const filters: FilterDef[] = [
  {
    key: 'stage',
    label: 'Stage',
    options: [
      { value: 'Lead', label: 'Lead' },
      { value: 'Initial Contact', label: 'Initial Contact' },
      { value: 'Questions Sent', label: 'Questions Sent' },
      { value: 'Fee Proposal', label: 'Fee Proposal' },
      { value: 'Contract', label: 'Contract' },
      { value: 'Onboarding', label: 'Onboarding' },
      { value: 'Active Client', label: 'Active Client' },
      { value: 'Handed to RM', label: 'Handed to RM' },
    ],
  },
  {
    key: 'conversionProbability',
    label: 'Probability',
    options: [
      { value: 'High', label: 'High' },
      { value: 'Medium', label: 'Medium' },
      { value: 'Low', label: 'Low' },
    ],
  },
  {
    key: 'followUpStatus',
    label: 'Follow-up',
    options: [
      { value: 'On Track', label: 'On Track' },
      { value: 'Due', label: 'Due' },
      { value: 'Overdue', label: 'Overdue' },
    ],
  },
  {
    key: 'fundType',
    label: 'Fund Type',
    options: [
      { value: 'DAF', label: 'DAF' },
      { value: 'CF', label: 'Collective Fund' },
    ],
  },
];

export default function PipelineTable({ prospects }: PipelineTableProps) {
  const [selected, setSelected] = useState<Prospect | null>(null);

  return (
    <ErrorBoundary>
      <DataTable<Prospect>
        data={prospects}
        columns={columns}
        searchKeys={['name', 'referringFirm', 'notes']}
        searchPlaceholder="Search prospects..."
        filters={filters}
        onRowClick={(row) => setSelected(row)}
        emptyTitle="No prospects found"
        emptyDescription="Try adjusting your search or filter criteria."
        exportFilename="pipeline-export"
      />
      <ProspectDetail
        prospect={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </ErrorBoundary>
  );
}
