import { useState } from 'react';
import DataTable from '../DataTable';
import type { ColumnDef, FilterDef } from '../DataTable';
import StatusBadge from '../StatusBadge';
import ErrorBoundary from '../ErrorBoundary';
import ContactDetail from './ContactDetail';
import { formatDate } from '../../data/admin';
import type { Contact } from '../../data/admin';

interface ContactsTableProps {
  contacts: Contact[];
}

const columns: ColumnDef<Contact>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (row) => (
      <div>
        <p className="font-medium text-slate-900">{row.name}</p>
        {row.firmName && <p className="text-xs text-slate-400">{row.firmName}</p>}
      </div>
    ),
  },
  {
    key: 'category',
    header: 'Category',
    render: (row) => <StatusBadge status={row.category} />,
  },
  {
    key: 'email',
    header: 'Email',
    render: (row) => (
      <a
        href={`mailto:${row.email}`}
        className="text-xs text-navy-600 hover:text-navy-700 hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {row.email}
      </a>
    ),
  },
  {
    key: 'phone',
    header: 'Phone',
    render: (row) => row.phone ? (
      <a
        href={`tel:${row.phone}`}
        className="text-xs text-navy-600 hover:text-navy-700 hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {row.phone}
      </a>
    ) : <span className="text-xs text-slate-400">-</span>,
  },
  {
    key: 'followUpStatus',
    header: 'Follow-up',
    align: 'center',
    render: (row) => <StatusBadge status={row.followUpStatus} />,
  },
  {
    key: 'lastContactDate',
    header: 'Last Contact',
    render: (row) => <span className="text-xs text-slate-500">{formatDate(row.lastContactDate)}</span>,
    sortValue: (row) => new Date(row.lastContactDate).getTime(),
  },
  {
    key: 'nextFollowUp',
    header: 'Next Follow-up',
    render: (row) => <span className="text-xs text-slate-500">{formatDate(row.nextFollowUp)}</span>,
  },
  {
    key: 'source',
    header: 'Source',
    render: (row) => <span className="text-xs text-slate-500">{row.source}</span>,
  },
];

const filters: FilterDef[] = [
  {
    key: 'category',
    label: 'Category',
    options: [
      { value: 'Intermediary', label: 'Intermediary' },
      { value: 'Potential Donor', label: 'Potential Donor' },
      { value: 'Donor', label: 'Donor' },
      { value: 'Lawyer', label: 'Lawyer' },
      { value: 'Investment Manager', label: 'Investment Manager' },
      { value: 'Accountant', label: 'Accountant' },
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
];

export default function ContactsTable({ contacts }: ContactsTableProps) {
  const [selected, setSelected] = useState<Contact | null>(null);

  return (
    <ErrorBoundary>
      <DataTable<Contact>
        data={contacts}
        columns={columns}
        searchKeys={['name', 'email', 'firmName', 'notes']}
        searchPlaceholder="Search contacts..."
        filters={filters}
        onRowClick={(row) => setSelected(row)}
        emptyTitle="No contacts found"
        emptyDescription="Try adjusting your search or filter criteria."
        exportFilename="contacts-export"
      />
      <ContactDetail
        contact={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </ErrorBoundary>
  );
}
