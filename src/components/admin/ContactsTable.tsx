import { useState, useMemo } from 'react';
import DataTable from '../DataTable';
import type { ColumnDef, FilterDef } from '../DataTable';
import StatusBadge from '../StatusBadge';
import ErrorBoundary from '../ErrorBoundary';
import ContactDetail from './ContactDetail';
import { formatDate, computeReminderStatus, TAG_COLORS } from '../../data/admin';
import type { Contact } from '../../data/admin';

type ContactWithReminder = Contact & { reminderStatus?: 'Upcoming' | 'Due' | 'Overdue' };

interface ContactsTableProps {
  contacts: Contact[];
}

const columns: ColumnDef<ContactWithReminder>[] = [
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
    key: 'followUpStatus',
    header: 'Follow-up',
    align: 'center',
    render: (row) => <StatusBadge status={row.followUpStatus} />,
  },
  {
    key: 'nextReminderDate',
    header: 'Next Contact',
    render: (row) => {
      if (!row.nextReminderDate) return <span className="text-xs text-slate-400">-</span>;
      const status = row.reminderStatus;
      const colorClass = status === 'Overdue' ? 'text-red-600 font-medium' : status === 'Due' ? 'text-amber-600 font-medium' : 'text-emerald-600';
      return <span className={`text-xs ${colorClass}`}>{formatDate(row.nextReminderDate)}</span>;
    },
    sortValue: (row) => row.nextReminderDate ? new Date(row.nextReminderDate).getTime() : Infinity,
  },
  {
    key: 'tags',
    header: 'Tags',
    render: (row) => {
      if (!row.tags?.length) return <span className="text-xs text-slate-400">-</span>;
      return (
        <div className="flex flex-wrap gap-1">
          {row.tags.map((tag) => (
            <span key={tag} className={`px-2 py-0.5 rounded-full text-xs font-medium ${TAG_COLORS[tag] || 'bg-slate-100 text-slate-600'}`}>
              {tag}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    key: 'lastContactDate',
    header: 'Last Contact',
    render: (row) => <span className="text-xs text-slate-500">{formatDate(row.lastContactDate)}</span>,
    sortValue: (row) => new Date(row.lastContactDate).getTime(),
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
  {
    key: 'reminderStatus',
    label: 'Reminder',
    options: [
      { value: 'Upcoming', label: 'Upcoming' },
      { value: 'Due', label: 'Due' },
      { value: 'Overdue', label: 'Overdue' },
    ],
  },
];

const ALL_TAGS = ['Invite to Event', 'Add to Mailing List', 'Key Decision Maker', 'VIP', 'New Contact', 'MailChimp', 'Events Gaslight'];

export default function ContactsTable({ contacts }: ContactsTableProps) {
  const [selected, setSelected] = useState<Contact | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);

  const enriched = useMemo<ContactWithReminder[]>(() => {
    return contacts.map((c) => ({
      ...c,
      reminderStatus: c.nextReminderDate ? computeReminderStatus(c.nextReminderDate) : undefined,
    }));
  }, [contacts]);

  const overdueCount = useMemo(() => enriched.filter((c) => c.reminderStatus === 'Overdue').length, [enriched]);

  const filtered = useMemo(() => {
    if (selectedTag === 'all') return enriched;
    return enriched.filter((c) => c.tags?.includes(selectedTag));
  }, [enriched, selectedTag]);

  return (
    <ErrorBoundary>
      {/* Tag filter bar */}
      <div className="flex items-center gap-2 mb-3">
        <div className="relative">
          <button
            onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
            className={`inline-flex items-center px-3 py-2 rounded-lg border text-sm transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 ${
              selectedTag !== 'all'
                ? 'border-navy-200 bg-navy-50 text-navy-700'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <svg className="w-3.5 h-3.5 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {selectedTag !== 'all' ? selectedTag : 'Tags'}
            <svg className="w-3.5 h-3.5 ml-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {tagDropdownOpen && (
            <div className="absolute left-0 mt-1 w-52 bg-white rounded-lg border border-slate-200 shadow-lg z-20 max-h-60 overflow-y-auto">
              <button
                onClick={() => { setSelectedTag('all'); setTagDropdownOpen(false); }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors first:rounded-t-lg ${
                  selectedTag === 'all' ? 'text-navy-600 font-medium bg-slate-50' : 'text-slate-600'
                }`}
              >
                All
              </button>
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => { setSelectedTag(tag); setTagDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors last:rounded-b-lg ${
                    selectedTag === tag ? 'text-navy-600 font-medium bg-slate-50' : 'text-slate-600'
                  }`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${(TAG_COLORS[tag] || 'bg-slate-100').split(' ')[0]}`} />
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
        {overdueCount > 0 && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600">
            {overdueCount} overdue
          </span>
        )}
        {selectedTag !== 'all' && (
          <button
            onClick={() => setSelectedTag('all')}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            Clear tag
          </button>
        )}
      </div>

      <DataTable<ContactWithReminder>
        data={filtered}
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
