import { useState } from 'react';
import DataTable from '../DataTable';
import type { ColumnDef, FilterDef } from '../DataTable';
import StatusBadge from '../StatusBadge';
import ErrorBoundary from '../ErrorBoundary';
import { formatCurrencyFull, formatDate } from '../../data/admin';
import type { BDActivity } from '../../data/admin';
import ActivityDetail from './ActivityDetail';

const CURRENT_DATE = new Date('2026-03-11');

function getFollowUpDateColor(dateStr: string): string {
  const date = new Date(dateStr);
  const diffDays = (date.getTime() - CURRENT_DATE.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays < 0) return 'text-red-600';
  if (diffDays <= 7) return 'text-amber-600';
  return 'text-emerald-600';
}

interface ActivitiesTableProps {
  activities: BDActivity[];
}

const columns: ColumnDef<BDActivity>[] = [
  {
    key: 'activity',
    header: 'Activity',
    render: (row) => (
      <div>
        <p className="font-medium text-slate-900">{row.activity}</p>
        {row.firmName && <p className="text-xs text-slate-400">{row.firmName}</p>}
      </div>
    ),
  },
  {
    key: 'type',
    header: 'Type',
    render: (row) => <StatusBadge status={row.type} />,
  },
  {
    key: 'date',
    header: 'Date',
    render: (row) => <span className="text-xs text-slate-500">{formatDate(row.date)}</span>,
    sortValue: (row) => new Date(row.date).getTime(),
  },
  {
    key: 'status',
    header: 'Status',
    align: 'center',
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: 'location',
    header: 'Location',
    render: (row) => <span className="text-xs text-slate-500">{row.location}</span>,
  },
  {
    key: 'attendeeCount',
    header: 'Attendees',
    align: 'center',
    render: (row) => row.attendeeCount > 0
      ? <span className="text-sm text-slate-700">{row.attendeeCount}</span>
      : <span className="text-xs text-slate-400">-</span>,
  },
  {
    key: 'prospectsGenerated',
    header: 'Prospects',
    align: 'center',
    render: (row) => row.prospectsGenerated > 0
      ? <span className="text-sm font-semibold text-emerald-600">{row.prospectsGenerated}</span>
      : <span className="text-xs text-slate-400">-</span>,
    sortValue: (row) => row.prospectsGenerated,
  },
  {
    key: 'assignedTo',
    header: 'Assigned',
    render: (row) => <span className="text-xs text-slate-600">{row.assignedTo}</span>,
  },
  {
    key: 'followUpDate',
    header: 'Follow-Up',
    render: (row) => (
      <div className="flex items-center gap-2">
        <span className={`text-xs font-medium ${getFollowUpDateColor(row.followUpDate)}`}>
          {formatDate(row.followUpDate)}
        </span>
        <StatusBadge status={row.followUpStatus} />
      </div>
    ),
    sortValue: (row) => new Date(row.followUpDate).getTime(),
  },
  {
    key: 'cost',
    header: 'Cost',
    align: 'right',
    render: (row) => <span className="text-xs text-slate-600">{formatCurrencyFull(row.cost)}</span>,
    sortValue: (row) => row.cost,
  },
];

const filters: FilterDef[] = [
  {
    key: 'type',
    label: 'Type',
    options: [
      { value: 'Lunch & Learn', label: 'Lunch & Learn' },
      { value: 'Office Visit', label: 'Office Visit' },
      { value: 'Conference', label: 'Conference' },
      { value: 'Webinar', label: 'Webinar' },
      { value: 'Email Campaign', label: 'Email Campaign' },
      { value: 'Networking Event', label: 'Networking Event' },
    ],
  },
  {
    key: 'status',
    label: 'Status',
    options: [
      { value: 'Planned', label: 'Planned' },
      { value: 'Completed', label: 'Completed' },
      { value: 'Cancelled', label: 'Cancelled' },
    ],
  },
  {
    key: 'assignedTo',
    label: 'Assigned To',
    options: [
      { value: 'Kirsty', label: 'Kirsty' },
      { value: 'Dibo', label: 'Dibo' },
      { value: 'Unassigned', label: 'Unassigned' },
    ],
  },
  {
    key: 'followUpStatus',
    label: 'Follow-Up',
    options: [
      { value: 'Pending', label: 'Pending' },
      { value: 'Completed', label: 'Completed' },
      { value: 'Overdue', label: 'Overdue' },
    ],
  },
];

export default function ActivitiesTable({ activities }: ActivitiesTableProps) {
  const [selected, setSelected] = useState<BDActivity | null>(null);

  return (
    <ErrorBoundary>
      <DataTable<BDActivity>
        data={activities}
        columns={columns}
        searchKeys={['activity', 'firmName']}
        searchPlaceholder="Search activities..."
        filters={filters}
        emptyTitle="No activities found"
        emptyDescription="Try adjusting your search or filter criteria."
        exportFilename="activities-export"
        onRowClick={(row) => setSelected(row)}
      />
      <ActivityDetail activity={selected} open={!!selected} onClose={() => setSelected(null)} />
    </ErrorBoundary>
  );
}
