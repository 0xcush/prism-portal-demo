// ---------------------------------------------------------------------------
// Grantee Portal — types, mock data, getters, formatters
// ---------------------------------------------------------------------------

// ── Types ──────────────────────────────────────────────────────────────────

export interface Grantee {
  id: string;
  charityName: string;
  charityNumber: string;
  contactName: string;
  contactEmail: string;
  address: string;
  sector: string;
  totalReceived: number;
  activeGrants: number;
  /** @deprecated Use charityName */
  name: string;
  /** @deprecated Use contactName */
  contactPerson: string;
}

export type GrantStage = 'Requested' | 'In Review' | 'Approved' | 'Paid' | 'Declined';

export interface GranteeGrant {
  id: string;
  grantName: string;
  charityId: string;
  amount: number;
  stage: GrantStage;
  /** @deprecated Use stage */
  status: GrantStage;
  dateRequested: string;
  dateApproved: string | null;
  datePaid: string | null;
  donorName: string;
  /** @deprecated Use donorName */
  donorFund: string;
  issueArea: string;
  notes: string;
  /** @deprecated Use getDocumentsForCharity() */
  ddStatus: 'Not Started' | 'Pending' | 'In Progress' | 'Complete';
  /** @deprecated Use getDocumentsForCharity() */
  requiredDocuments: { name: string; status: string; submittedDate: string | null; notes: string }[];
  /** @deprecated Use getPaymentsForCharity() */
  paymentRef: string | null;
  reportDueDate: string | null;
  reportStatus: 'Not Due' | 'Due' | 'Submitted' | 'Overdue';
}

export interface DDDocument {
  id: string;
  charityId: string;
  documentName: string;
  type: 'Governance' | 'Financial' | 'Safeguarding' | 'Identity' | 'Regulatory';
  status: 'Received' | 'Pending' | 'Expired' | 'Not Required';
  dateUploaded: string;
  expiryDate: string;
}

export interface GrantPayment {
  id: string;
  grantId: string;
  charityId: string;
  amount: number;
  status: 'Scheduled' | 'Processing' | 'Sent' | 'Received' | 'Failed';
  scheduledDate: string;
  sentDate: string;
  reference: string;
  bankRef: string;
}

// ── Backward-compat type alias ─────────────────────────────────────────────
// The old file exported GranteeCharity; keep it as an alias so existing
// pages that import it don't break.
export type GranteeCharity = Grantee;

// ── Mock data: Grantees ────────────────────────────────────────────────────

const grantees: Grantee[] = [
  {
    id: 'nspcc',
    charityName: 'NSPCC',
    name: 'NSPCC',
    charityNumber: '216401',
    contactName: 'Rachel Thornbury',
    contactPerson: 'Rachel Thornbury',
    contactEmail: 'grants@example-nspcc.org',
    address: 'Weston House, 42 Curtain Road, London EC2A 3NH',
    sector: "Children's Welfare",
    totalReceived: 340_000,
    activeGrants: 3,
  },
  {
    id: 'tate',
    charityName: 'Tate Foundation',
    name: 'Tate Foundation',
    charityNumber: '1085314',
    contactName: 'James Caldwell',
    contactPerson: 'James Caldwell',
    contactEmail: 'grants@example-tate.org',
    address: 'Millbank, London SW1P 4RG',
    sector: 'Arts & Culture',
    totalReceived: 180_000,
    activeGrants: 2,
  },
  {
    id: 'bhf',
    charityName: 'British Heart Foundation',
    name: 'British Heart Foundation',
    charityNumber: '225971',
    contactName: 'Dr Sarah Winters',
    contactPerson: 'Dr Sarah Winters',
    contactEmail: 'grants@example-bhf.org',
    address: 'Greater London House, 180 Hampstead Road, London NW1 7AW',
    sector: 'Medical Research',
    totalReceived: 520_000,
    activeGrants: 4,
  },
  {
    id: 'wwf',
    charityName: 'WWF UK',
    name: 'WWF UK',
    charityNumber: '1081247',
    contactName: 'Oliver Hartley',
    contactPerson: 'Oliver Hartley',
    contactEmail: 'grants@example-wwf.org',
    address: 'The Living Planet Centre, Rufford House, Brewery Road, Woking GU21 4LL',
    sector: 'Environment',
    totalReceived: 275_000,
    activeGrants: 2,
  },
  {
    id: 'shelter',
    charityName: 'Shelter',
    name: 'Shelter',
    charityNumber: '263710',
    contactName: 'Rebecca Ashmore',
    contactPerson: 'Rebecca Ashmore',
    contactEmail: 'grants@example-shelter.org',
    address: '88 Old Street, London EC1V 9HU',
    sector: 'Housing & Homelessness',
    totalReceived: 195_000,
    activeGrants: 3,
  },
  {
    id: 'roh',
    charityName: 'Royal Opera House',
    name: 'Royal Opera House',
    charityNumber: '211775',
    contactName: 'Victoria Fleming',
    contactPerson: 'Victoria Fleming',
    contactEmail: 'grants@example-roh.org',
    address: 'Bow Street, London WC2E 9DD',
    sector: 'Arts & Culture',
    totalReceived: 120_000,
    activeGrants: 2,
  },
  {
    id: 'eton',
    charityName: 'Eton College Foundation',
    name: 'Eton College Foundation',
    charityNumber: '1139086',
    contactName: 'Philip Hargreaves',
    contactPerson: 'Philip Hargreaves',
    contactEmail: 'grants@example-eton.org',
    address: 'Eton College, Windsor SL4 6DW',
    sector: 'Education',
    totalReceived: 200_000,
    activeGrants: 1,
  },
  {
    id: 'redcross',
    charityName: 'British Red Cross',
    name: 'British Red Cross',
    charityNumber: '220949',
    contactName: 'Aisha Mahmood',
    contactPerson: 'Aisha Mahmood',
    contactEmail: 'grants@example-redcross.org',
    address: '44 Moorfields, London EC2Y 9AL',
    sector: 'Humanitarian',
    totalReceived: 100_000,
    activeGrants: 1,
  },
  {
    id: 'felix',
    charityName: 'The Felix Project',
    name: 'The Felix Project',
    charityNumber: '1168183',
    contactName: 'Sophie Tremblay',
    contactPerson: 'Sophie Tremblay',
    contactEmail: 'grants@example-felix.org',
    address: 'Unit 6, Poplar Business Park, London E14 0BF',
    sector: 'Poverty & Food',
    totalReceived: 45_000,
    activeGrants: 1,
  },
  {
    id: 'mind',
    charityName: 'Mind',
    name: 'Mind',
    charityNumber: '219830',
    contactName: 'Dr Liam Patterson',
    contactPerson: 'Dr Liam Patterson',
    contactEmail: 'grants@example-mind.org',
    address: '2 Redman Place, London E20 1JQ',
    sector: 'Mental Health',
    totalReceived: 280_000,
    activeGrants: 2,
  },
  {
    id: 'nlt',
    charityName: 'National Literacy Trust',
    name: 'National Literacy Trust',
    charityNumber: '1116260',
    contactName: 'Emma Richardson',
    contactPerson: 'Emma Richardson',
    contactEmail: 'grants@example-nlt.org',
    address: '68 South Lambeth Road, London SW8 1RL',
    sector: 'Education',
    totalReceived: 85_000,
    activeGrants: 1,
  },
  {
    id: 'mcs',
    charityName: 'Marine Conservation Society',
    name: 'Marine Conservation Society',
    charityNumber: '1004005',
    contactName: 'Dr Hannah Wolfe',
    contactPerson: 'Dr Hannah Wolfe',
    contactEmail: 'grants@example-mcs.org',
    address: 'Overross House, Ross-on-Wye HR9 7QQ',
    sector: 'Environment',
    totalReceived: 150_000,
    activeGrants: 1,
  },
  {
    id: 'woodland',
    charityName: 'Woodland Trust',
    name: 'Woodland Trust',
    charityNumber: '294344',
    contactName: 'Robert Ellison',
    contactPerson: 'Robert Ellison',
    contactEmail: 'grants@example-woodland.org',
    address: 'Kempton Way, Grantham NG31 6LL',
    sector: 'Environment',
    totalReceived: 95_000,
    activeGrants: 1,
  },
  {
    id: 'cruk',
    charityName: 'Cancer Research UK',
    name: 'Cancer Research UK',
    charityNumber: '1089464',
    contactName: 'Professor Diane Hughes',
    contactPerson: 'Professor Diane Hughes',
    contactEmail: 'grants@example-cruk.org',
    address: '2 Redman Place, London E20 1JQ',
    sector: 'Medical Research',
    totalReceived: 400_000,
    activeGrants: 1,
  },
  {
    id: 'nyo',
    charityName: 'National Youth Orchestra',
    name: 'National Youth Orchestra',
    charityNumber: '263878',
    contactName: 'Margaret Chen',
    contactPerson: 'Margaret Chen',
    contactEmail: 'grants@example-nyo.org',
    address: 'Kings Place, 90 York Way, London N1 9AG',
    sector: 'Arts & Culture',
    totalReceived: 60_000,
    activeGrants: 1,
  },
  {
    id: 'vam',
    charityName: 'Victoria & Albert Museum',
    name: 'Victoria & Albert Museum',
    charityNumber: '312058',
    contactName: 'Dr Nicholas Harwell',
    contactPerson: 'Dr Nicholas Harwell',
    contactEmail: 'grants@example-vam.org',
    address: 'Cromwell Road, London SW7 2RL',
    sector: 'Arts & Culture',
    totalReceived: 0,
    activeGrants: 0,
  },
];

// ── Mock data: Grants ──────────────────────────────────────────────────────

const grants: GranteeGrant[] = [
  // ── NSPCC (3 grants) ────────────────────────────────────────────────────
  {
    id: 'gr-nspcc-001',
    grantName: 'Childline Digital Expansion',
    charityId: 'nspcc',
    amount: 150_000,
    stage: 'Paid',
    status: 'Paid',
    dateRequested: '2025-06-12',
    dateApproved: '2025-07-04',
    datePaid: '2025-07-22',
    donorName: 'Richard M.',
    donorFund: 'Cavendish-Hale Foundation Fund',
    issueArea: 'Children & Young People',
    notes: 'Year-two funding for online counselling platform rollout.',
    ddStatus: 'Complete',
    requiredDocuments: [
      { name: 'Charity Commission Registration', status: 'Verified', submittedDate: '2025-06-14', notes: '' },
      { name: 'Latest Annual Accounts', status: 'Verified', submittedDate: '2025-06-14', notes: 'FY2024-25' },
      { name: 'Safeguarding Policy', status: 'Verified', submittedDate: '2025-06-16', notes: '' },
      { name: 'Bank Verification Letter', status: 'Verified', submittedDate: '2025-06-15', notes: '' },
    ],
    paymentRef: 'PRISM-2025-0722-NSPCC-1',
    reportDueDate: '2026-01-22',
    reportStatus: 'Submitted',
  },
  {
    id: 'gr-nspcc-002',
    grantName: 'Schools Safeguarding Programme',
    charityId: 'nspcc',
    amount: 85_000,
    stage: 'Approved',
    status: 'Approved',
    dateRequested: '2025-11-03',
    dateApproved: '2025-12-01',
    datePaid: null,
    donorName: 'Catherine W.',
    donorFund: 'Westminster Giving Fund',
    issueArea: 'Children & Young People',
    notes: 'Training programme for 200 primary schools across the Midlands.',
    ddStatus: 'Complete',
    requiredDocuments: [
      { name: 'Charity Commission Registration', status: 'Verified', submittedDate: '2025-11-05', notes: '' },
      { name: 'Latest Annual Accounts', status: 'Verified', submittedDate: '2025-11-05', notes: 'FY2024-25' },
      { name: 'Programme Budget & Timeline', status: 'Verified', submittedDate: '2025-11-10', notes: '' },
      { name: 'Bank Verification Letter', status: 'Verified', submittedDate: '2025-11-06', notes: '' },
    ],
    paymentRef: null,
    reportDueDate: '2026-06-01',
    reportStatus: 'Not Due',
  },
  {
    id: 'gr-nspcc-003',
    grantName: 'Early Years Intervention Research',
    charityId: 'nspcc',
    amount: 105_000,
    stage: 'In Review',
    status: 'In Review',
    dateRequested: '2026-01-18',
    dateApproved: null,
    datePaid: null,
    donorName: 'Amara K.',
    donorFund: 'Kensington Collective Fund',
    issueArea: 'Children & Young People',
    notes: 'Longitudinal study in partnership with University of Bristol.',
    ddStatus: 'In Progress',
    requiredDocuments: [
      { name: 'Charity Commission Registration', status: 'Verified', submittedDate: '2026-01-20', notes: '' },
      { name: 'Latest Annual Accounts', status: 'Verified', submittedDate: '2026-01-20', notes: 'FY2024-25' },
      { name: 'Research Ethics Approval', status: 'Submitted', submittedDate: '2026-01-25', notes: 'Under review by grants team' },
      { name: 'Impact Measurement Framework', status: 'Required', submittedDate: null, notes: 'Requested 28 Jan' },
    ],
    paymentRef: null,
    reportDueDate: null,
    reportStatus: 'Not Due',
  },

  // ── Tate Foundation (2 grants) ──────────────────────────────────────────
  {
    id: 'gr-tate-001',
    grantName: 'Turner Collection Restoration',
    charityId: 'tate',
    amount: 120_000,
    stage: 'Paid',
    status: 'Paid',
    dateRequested: '2025-04-20',
    dateApproved: '2025-05-15',
    datePaid: '2025-06-02',
    donorName: 'Edward L.',
    donorFund: 'Ashworth Arts & Heritage Fund',
    issueArea: 'Arts & Heritage',
    notes: 'Conservation of 14 watercolours from the Turner Bequest.',
    ddStatus: 'Complete',
    requiredDocuments: [
      { name: 'Charity Commission Registration', status: 'Verified', submittedDate: '2025-04-22', notes: '' },
      { name: 'Latest Annual Accounts', status: 'Verified', submittedDate: '2025-04-22', notes: 'FY2024-25' },
      { name: 'Project Specification', status: 'Verified', submittedDate: '2025-04-25', notes: '' },
      { name: 'Bank Verification Letter', status: 'Verified', submittedDate: '2025-04-23', notes: '' },
    ],
    paymentRef: 'PRISM-2025-0602-TATE-1',
    reportDueDate: '2025-12-02',
    reportStatus: 'Submitted',
  },
  {
    id: 'gr-tate-002',
    grantName: 'Community Engagement Programme',
    charityId: 'tate',
    amount: 60_000,
    stage: 'Requested',
    status: 'Requested',
    dateRequested: '2026-02-10',
    dateApproved: null,
    datePaid: null,
    donorName: 'Fiona D.',
    donorFund: 'Kensington Collective Fund',
    issueArea: 'Arts & Heritage',
    notes: 'Free workshops for under-served communities in Liverpool and St Ives.',
    ddStatus: 'Pending',
    requiredDocuments: [
      { name: 'Charity Commission Registration', status: 'Submitted', submittedDate: '2026-02-12', notes: '' },
      { name: 'Latest Annual Accounts', status: 'Required', submittedDate: null, notes: '' },
      { name: 'Programme Proposal', status: 'Required', submittedDate: null, notes: '' },
      { name: 'Bank Verification Letter', status: 'Required', submittedDate: null, notes: '' },
    ],
    paymentRef: null,
    reportDueDate: null,
    reportStatus: 'Not Due',
  },

  // ── British Heart Foundation (4 grants) ─────────────────────────────────
  {
    id: 'gr-bhf-001',
    grantName: 'Cardiovascular Genomics Study',
    charityId: 'bhf',
    amount: 150_000,
    stage: 'Paid',
    status: 'Paid',
    dateRequested: '2025-03-10',
    dateApproved: '2025-04-08',
    datePaid: '2025-04-28',
    donorName: 'Jonathan P.',
    donorFund: 'Westminster Giving Fund',
    issueArea: 'Medical Research',
    notes: 'Genome-wide association study at Imperial College London.',
    ddStatus: 'Complete',
    requiredDocuments: [
      { name: 'Charity Commission Registration', status: 'Verified', submittedDate: '2025-03-12', notes: '' },
      { name: 'Latest Annual Accounts', status: 'Verified', submittedDate: '2025-03-12', notes: 'FY2024-25' },
      { name: 'Research Ethics Approval', status: 'Verified', submittedDate: '2025-03-15', notes: 'Imperial ethics ref #3291' },
      { name: 'Bank Verification Letter', status: 'Verified', submittedDate: '2025-03-13', notes: '' },
    ],
    paymentRef: 'PRISM-2025-0428-BHF-1',
    reportDueDate: '2025-10-28',
    reportStatus: 'Submitted',
  },
  {
    id: 'gr-bhf-002',
    grantName: 'Defibrillator Access Initiative',
    charityId: 'bhf',
    amount: 95_000,
    stage: 'Paid',
    status: 'Paid',
    dateRequested: '2025-08-22',
    dateApproved: '2025-09-15',
    datePaid: '2025-10-01',
    donorName: 'Sarah H.',
    donorFund: 'Ashford Legacy Fund',
    issueArea: 'Community Health',
    notes: '450 public-access defibrillators installed across rural Wales.',
    ddStatus: 'Complete',
    requiredDocuments: [
      { name: 'Charity Commission Registration', status: 'Verified', submittedDate: '2025-08-24', notes: '' },
      { name: 'Latest Annual Accounts', status: 'Verified', submittedDate: '2025-08-24', notes: 'FY2024-25' },
      { name: 'Equipment Procurement Plan', status: 'Verified', submittedDate: '2025-08-28', notes: '' },
      { name: 'Bank Verification Letter', status: 'Verified', submittedDate: '2025-08-25', notes: '' },
    ],
    paymentRef: 'PRISM-2025-1001-BHF-3',
    reportDueDate: '2026-04-01',
    reportStatus: 'Due',
  },
  {
    id: 'gr-bhf-003',
    grantName: 'Cardiac Rehabilitation Pilot',
    charityId: 'bhf',
    amount: 125_000,
    stage: 'Approved',
    status: 'Approved',
    dateRequested: '2025-12-05',
    dateApproved: '2026-01-10',
    datePaid: null,
    donorName: 'Marcus T.',
    donorFund: 'Thornbury Impact Fund',
    issueArea: 'Medical Research',
    notes: 'Digital rehab pathway trial across 12 NHS trusts.',
    ddStatus: 'Complete',
    requiredDocuments: [
      { name: 'Charity Commission Registration', status: 'Verified', submittedDate: '2025-12-07', notes: '' },
      { name: 'Latest Annual Accounts', status: 'Verified', submittedDate: '2025-12-07', notes: 'FY2024-25' },
      { name: 'NHS Trust Partnership Letters', status: 'Verified', submittedDate: '2025-12-12', notes: '12 letters received' },
      { name: 'Bank Verification Letter', status: 'Verified', submittedDate: '2025-12-08', notes: '' },
    ],
    paymentRef: null,
    reportDueDate: null,
    reportStatus: 'Not Due',
  },
  {
    id: 'gr-bhf-004',
    grantName: 'Heart Failure Early Detection',
    charityId: 'bhf',
    amount: 150_000,
    stage: 'In Review',
    status: 'In Review',
    dateRequested: '2026-02-14',
    dateApproved: null,
    datePaid: null,
    donorName: 'Helen R.',
    donorFund: 'Beaumont Charitable Fund',
    issueArea: 'Medical Research',
    notes: 'AI-assisted screening tool development with Kings College London.',
    ddStatus: 'In Progress',
    requiredDocuments: [
      { name: 'Charity Commission Registration', status: 'Verified', submittedDate: '2026-02-16', notes: '' },
      { name: 'Latest Annual Accounts', status: 'Verified', submittedDate: '2026-02-16', notes: 'FY2024-25' },
      { name: 'Research Ethics Approval', status: 'Submitted', submittedDate: '2026-02-20', notes: "KCL ethics board — awaiting response" },
      { name: 'Data Protection Impact Assessment', status: 'Required', submittedDate: null, notes: 'AI/ML project — DPIA mandatory' },
    ],
    paymentRef: null,
    reportDueDate: null,
    reportStatus: 'Not Due',
  },

  // ── WWF UK (2 grants) ──────────────────────────────────────────────────
  {
    id: 'gr-wwf-001',
    grantName: 'UK Peatland Restoration',
    charityId: 'wwf',
    amount: 140_000,
    stage: 'Paid',
    status: 'Paid',
    dateRequested: '2025-05-14',
    dateApproved: '2025-06-12',
    datePaid: '2025-07-01',
    donorName: 'Alistair G.',
    donorFund: 'Cavendish-Hale Foundation Fund',
    issueArea: 'Conservation',
    notes: 'Restoring 800 hectares of degraded peatland in the Scottish Highlands.',
    ddStatus: 'Complete',
    requiredDocuments: [
      { name: 'Charity Commission Registration', status: 'Verified', submittedDate: '2025-05-16', notes: '' },
      { name: 'Latest Annual Accounts', status: 'Verified', submittedDate: '2025-05-16', notes: 'FY2024-25' },
      { name: 'Conservation Impact Report', status: 'Verified', submittedDate: '2025-05-20', notes: '' },
      { name: 'Bank Verification Letter', status: 'Verified', submittedDate: '2025-05-17', notes: '' },
    ],
    paymentRef: 'PRISM-2025-0701-WWF-1',
    reportDueDate: '2026-01-01',
    reportStatus: 'Overdue',
  },
  {
    id: 'gr-wwf-002',
    grantName: 'Ocean Plastics Education Campaign',
    charityId: 'wwf',
    amount: 135_000,
    stage: 'In Review',
    status: 'In Review',
    dateRequested: '2026-01-28',
    dateApproved: null,
    datePaid: null,
    donorName: 'Priya N.',
    donorFund: 'Penrose Wealth CF',
    issueArea: 'Environment',
    notes: 'National schools programme targeting 50,000 pupils in Year 7-9.',
    ddStatus: 'In Progress',
    requiredDocuments: [
      { name: 'Charity Commission Registration', status: 'Verified', submittedDate: '2026-01-30', notes: '' },
      { name: 'Latest Annual Accounts', status: 'Verified', submittedDate: '2026-01-30', notes: 'FY2024-25' },
      { name: 'Programme Budget', status: 'Submitted', submittedDate: '2026-02-03', notes: 'Under review' },
      { name: 'Safeguarding Policy (Schools)', status: 'Required', submittedDate: null, notes: 'DfE-compliant policy needed' },
    ],
    paymentRef: null,
    reportDueDate: null,
    reportStatus: 'Not Due',
  },

  // ── Shelter (3 grants) ──────────────────────────────────────────────────
  {
    id: 'gr-shelter-001',
    grantName: 'Emergency Helpline Expansion',
    charityId: 'shelter',
    amount: 75_000,
    stage: 'Paid',
    status: 'Paid',
    dateRequested: '2025-07-01',
    dateApproved: '2025-07-25',
    datePaid: '2025-08-12',
    donorName: 'David B.',
    donorFund: 'Thornbury Impact Fund',
    issueArea: 'Housing & Homelessness',
    notes: 'Extended helpline hours to 24/7 coverage for winter months.',
    ddStatus: 'Complete',
    requiredDocuments: [
      { name: 'Charity Commission Registration', status: 'Verified', submittedDate: '2025-07-03', notes: '' },
      { name: 'Latest Annual Accounts', status: 'Verified', submittedDate: '2025-07-03', notes: 'FY2024-25' },
      { name: 'Bank Verification Letter', status: 'Verified', submittedDate: '2025-07-04', notes: '' },
    ],
    paymentRef: 'PRISM-2025-0812-SHELT-1',
    reportDueDate: '2026-02-12',
    reportStatus: 'Submitted',
  },
  {
    id: 'gr-shelter-002',
    grantName: 'Housing Legal Advice Service',
    charityId: 'shelter',
    amount: 60_000,
    stage: 'Approved',
    status: 'Approved',
    dateRequested: '2025-11-18',
    dateApproved: '2025-12-16',
    datePaid: null,
    donorName: 'Natasha C.',
    donorFund: 'Ashford Legacy Fund',
    issueArea: 'Housing & Homelessness',
    notes: 'Free legal casework for tenants facing Section 21 evictions.',
    ddStatus: 'Complete',
    requiredDocuments: [
      { name: 'Charity Commission Registration', status: 'Verified', submittedDate: '2025-11-20', notes: '' },
      { name: 'Latest Annual Accounts', status: 'Verified', submittedDate: '2025-11-20', notes: 'FY2024-25' },
      { name: 'Programme Outcomes Framework', status: 'Verified', submittedDate: '2025-11-25', notes: '' },
      { name: 'Bank Verification Letter', status: 'Verified', submittedDate: '2025-11-21', notes: '' },
    ],
    paymentRef: null,
    reportDueDate: null,
    reportStatus: 'Not Due',
  },
  {
    id: 'gr-shelter-003',
    grantName: 'Rough Sleeper Outreach — Manchester',
    charityId: 'shelter',
    amount: 60_000,
    stage: 'Requested',
    status: 'Requested',
    dateRequested: '2026-02-25',
    dateApproved: null,
    datePaid: null,
    donorName: 'George F.',
    donorFund: 'Beaumont Charitable Fund',
    issueArea: 'Housing & Homelessness',
    notes: 'Street outreach team and temporary accommodation placements.',
    ddStatus: 'Not Started',
    requiredDocuments: [
      { name: 'Charity Commission Registration', status: 'Required', submittedDate: null, notes: '' },
      { name: 'Latest Annual Accounts', status: 'Required', submittedDate: null, notes: '' },
      { name: 'Project Proposal', status: 'Required', submittedDate: null, notes: '' },
      { name: 'Bank Verification Letter', status: 'Required', submittedDate: null, notes: '' },
    ],
    paymentRef: null,
    reportDueDate: null,
    reportStatus: 'Not Due',
  },
];

// ── Mock data: DD Documents ────────────────────────────────────────────────

const ddDocuments: DDDocument[] = [
  // ── NSPCC (10 documents) ────────────────────────────────────────────────
  { id: 'dd-nspcc-01', charityId: 'nspcc', documentName: 'Governing Document (Royal Charter)', type: 'Governance', status: 'Received', dateUploaded: '2025-06-10', expiryDate: '' },
  { id: 'dd-nspcc-02', charityId: 'nspcc', documentName: 'Annual Accounts 2024-25', type: 'Financial', status: 'Received', dateUploaded: '2025-06-10', expiryDate: '2026-09-30' },
  { id: 'dd-nspcc-03', charityId: 'nspcc', documentName: 'Annual Report 2024-25', type: 'Financial', status: 'Received', dateUploaded: '2025-06-10', expiryDate: '2026-09-30' },
  { id: 'dd-nspcc-04', charityId: 'nspcc', documentName: 'Safeguarding Policy', type: 'Safeguarding', status: 'Received', dateUploaded: '2025-06-12', expiryDate: '2026-06-12' },
  { id: 'dd-nspcc-05', charityId: 'nspcc', documentName: 'DBS Check Confirmation — Contact', type: 'Safeguarding', status: 'Received', dateUploaded: '2025-06-14', expiryDate: '2028-06-14' },
  { id: 'dd-nspcc-06', charityId: 'nspcc', documentName: 'Bank Statement (Barclays)', type: 'Financial', status: 'Received', dateUploaded: '2025-06-11', expiryDate: '2026-06-11' },
  { id: 'dd-nspcc-07', charityId: 'nspcc', documentName: 'Trustees List', type: 'Governance', status: 'Received', dateUploaded: '2025-06-10', expiryDate: '2026-09-30' },
  { id: 'dd-nspcc-08', charityId: 'nspcc', documentName: 'Charity Commission Registration', type: 'Regulatory', status: 'Received', dateUploaded: '2025-06-10', expiryDate: '' },
  { id: 'dd-nspcc-09', charityId: 'nspcc', documentName: 'Anti-Money Laundering Declaration', type: 'Regulatory', status: 'Received', dateUploaded: '2025-06-13', expiryDate: '2026-06-13' },
  { id: 'dd-nspcc-10', charityId: 'nspcc', documentName: 'Contact ID Verification', type: 'Identity', status: 'Received', dateUploaded: '2025-06-14', expiryDate: '2028-06-14' },

  // ── Tate Foundation (9 documents) ───────────────────────────────────────
  { id: 'dd-tate-01', charityId: 'tate', documentName: 'Articles of Association', type: 'Governance', status: 'Received', dateUploaded: '2025-04-18', expiryDate: '' },
  { id: 'dd-tate-02', charityId: 'tate', documentName: 'Annual Accounts 2024-25', type: 'Financial', status: 'Received', dateUploaded: '2025-04-18', expiryDate: '2026-09-30' },
  { id: 'dd-tate-03', charityId: 'tate', documentName: 'Annual Report 2024-25', type: 'Financial', status: 'Received', dateUploaded: '2025-04-18', expiryDate: '2026-09-30' },
  { id: 'dd-tate-04', charityId: 'tate', documentName: 'Safeguarding Policy', type: 'Safeguarding', status: 'Received', dateUploaded: '2025-04-20', expiryDate: '2026-04-20' },
  { id: 'dd-tate-05', charityId: 'tate', documentName: 'Bank Statement (HSBC)', type: 'Financial', status: 'Pending', dateUploaded: '', expiryDate: '' },
  { id: 'dd-tate-06', charityId: 'tate', documentName: 'Trustees List', type: 'Governance', status: 'Received', dateUploaded: '2025-04-19', expiryDate: '2026-09-30' },
  { id: 'dd-tate-07', charityId: 'tate', documentName: 'Charity Commission Registration', type: 'Regulatory', status: 'Received', dateUploaded: '2025-04-18', expiryDate: '' },
  { id: 'dd-tate-08', charityId: 'tate', documentName: 'Contact ID Verification', type: 'Identity', status: 'Received', dateUploaded: '2025-04-22', expiryDate: '2028-04-22' },
  { id: 'dd-tate-09', charityId: 'tate', documentName: 'Anti-Money Laundering Declaration', type: 'Regulatory', status: 'Pending', dateUploaded: '', expiryDate: '' },

  // ── British Heart Foundation (12 documents) ─────────────────────────────
  { id: 'dd-bhf-01', charityId: 'bhf', documentName: 'Memorandum & Articles of Association', type: 'Governance', status: 'Received', dateUploaded: '2025-03-08', expiryDate: '' },
  { id: 'dd-bhf-02', charityId: 'bhf', documentName: 'Annual Accounts 2024-25', type: 'Financial', status: 'Received', dateUploaded: '2025-03-08', expiryDate: '2026-09-30' },
  { id: 'dd-bhf-03', charityId: 'bhf', documentName: 'Annual Report 2024-25', type: 'Financial', status: 'Received', dateUploaded: '2025-03-08', expiryDate: '2026-09-30' },
  { id: 'dd-bhf-04', charityId: 'bhf', documentName: 'Audited Financial Statements 2023-24', type: 'Financial', status: 'Received', dateUploaded: '2025-03-08', expiryDate: '2026-03-08' },
  { id: 'dd-bhf-05', charityId: 'bhf', documentName: 'Safeguarding Policy', type: 'Safeguarding', status: 'Received', dateUploaded: '2025-03-10', expiryDate: '2026-03-10' },
  { id: 'dd-bhf-06', charityId: 'bhf', documentName: 'Whistleblowing Policy', type: 'Safeguarding', status: 'Received', dateUploaded: '2025-03-10', expiryDate: '2026-03-10' },
  { id: 'dd-bhf-07', charityId: 'bhf', documentName: 'Bank Statement (NatWest)', type: 'Financial', status: 'Received', dateUploaded: '2025-03-09', expiryDate: '2026-03-09' },
  { id: 'dd-bhf-08', charityId: 'bhf', documentName: 'Trustees List', type: 'Governance', status: 'Received', dateUploaded: '2025-03-08', expiryDate: '2026-09-30' },
  { id: 'dd-bhf-09', charityId: 'bhf', documentName: 'Charity Commission Registration', type: 'Regulatory', status: 'Received', dateUploaded: '2025-03-08', expiryDate: '' },
  { id: 'dd-bhf-10', charityId: 'bhf', documentName: 'Research Ethics Approval (UCL)', type: 'Regulatory', status: 'Received', dateUploaded: '2025-03-12', expiryDate: '2026-12-31' },
  { id: 'dd-bhf-11', charityId: 'bhf', documentName: 'Anti-Money Laundering Declaration', type: 'Regulatory', status: 'Received', dateUploaded: '2025-03-11', expiryDate: '2026-03-11' },
  { id: 'dd-bhf-12', charityId: 'bhf', documentName: 'Contact ID Verification', type: 'Identity', status: 'Expired', dateUploaded: '2022-03-15', expiryDate: '2025-03-15' },

  // ── WWF UK (10 documents) ──────────────────────────────────────────────
  { id: 'dd-wwf-01', charityId: 'wwf', documentName: 'Articles of Association', type: 'Governance', status: 'Received', dateUploaded: '2025-05-12', expiryDate: '' },
  { id: 'dd-wwf-02', charityId: 'wwf', documentName: 'Annual Accounts 2024-25', type: 'Financial', status: 'Received', dateUploaded: '2025-05-12', expiryDate: '2026-09-30' },
  { id: 'dd-wwf-03', charityId: 'wwf', documentName: 'Annual Report 2024-25', type: 'Financial', status: 'Received', dateUploaded: '2025-05-12', expiryDate: '2026-09-30' },
  { id: 'dd-wwf-04', charityId: 'wwf', documentName: 'Safeguarding Policy', type: 'Safeguarding', status: 'Received', dateUploaded: '2025-05-14', expiryDate: '2026-05-14' },
  { id: 'dd-wwf-05', charityId: 'wwf', documentName: 'Bank Statement (Lloyds)', type: 'Financial', status: 'Received', dateUploaded: '2025-05-13', expiryDate: '2026-05-13' },
  { id: 'dd-wwf-06', charityId: 'wwf', documentName: 'Trustees List', type: 'Governance', status: 'Received', dateUploaded: '2025-05-12', expiryDate: '2026-09-30' },
  { id: 'dd-wwf-07', charityId: 'wwf', documentName: 'Charity Commission Registration', type: 'Regulatory', status: 'Received', dateUploaded: '2025-05-12', expiryDate: '' },
  { id: 'dd-wwf-08', charityId: 'wwf', documentName: 'Environmental Impact Assessment', type: 'Regulatory', status: 'Received', dateUploaded: '2025-05-15', expiryDate: '2026-12-31' },
  { id: 'dd-wwf-09', charityId: 'wwf', documentName: 'Anti-Money Laundering Declaration', type: 'Regulatory', status: 'Received', dateUploaded: '2025-05-14', expiryDate: '2026-05-14' },
  { id: 'dd-wwf-10', charityId: 'wwf', documentName: 'Contact ID Verification', type: 'Identity', status: 'Received', dateUploaded: '2025-05-16', expiryDate: '2028-05-16' },

  // ── Shelter (8 documents) ──────────────────────────────────────────────
  { id: 'dd-shelter-01', charityId: 'shelter', documentName: 'Memorandum & Articles of Association', type: 'Governance', status: 'Received', dateUploaded: '2025-06-28', expiryDate: '' },
  { id: 'dd-shelter-02', charityId: 'shelter', documentName: 'Annual Accounts 2024-25', type: 'Financial', status: 'Received', dateUploaded: '2025-06-28', expiryDate: '2026-09-30' },
  { id: 'dd-shelter-03', charityId: 'shelter', documentName: 'Annual Report 2024-25', type: 'Financial', status: 'Received', dateUploaded: '2025-06-28', expiryDate: '2026-09-30' },
  { id: 'dd-shelter-04', charityId: 'shelter', documentName: 'Safeguarding Policy', type: 'Safeguarding', status: 'Expired', dateUploaded: '2024-07-01', expiryDate: '2025-07-01' },
  { id: 'dd-shelter-05', charityId: 'shelter', documentName: 'Bank Statement (Nationwide)', type: 'Financial', status: 'Received', dateUploaded: '2025-06-29', expiryDate: '2026-06-29' },
  { id: 'dd-shelter-06', charityId: 'shelter', documentName: 'Trustees List', type: 'Governance', status: 'Received', dateUploaded: '2025-06-28', expiryDate: '2026-09-30' },
  { id: 'dd-shelter-07', charityId: 'shelter', documentName: 'Charity Commission Registration', type: 'Regulatory', status: 'Received', dateUploaded: '2025-06-28', expiryDate: '' },
  { id: 'dd-shelter-08', charityId: 'shelter', documentName: 'Contact ID Verification', type: 'Identity', status: 'Pending', dateUploaded: '', expiryDate: '' },
];

// ── Mock data: Payments ────────────────────────────────────────────────────

const payments: GrantPayment[] = [
  // ── NSPCC payments ──────────────────────────────────────────────────────
  { id: 'pay-nspcc-01', grantId: 'gr-nspcc-001', charityId: 'nspcc', amount: 75_000, status: 'Received', scheduledDate: '2025-07-18', sentDate: '2025-07-22', reference: 'PRISM-2025-0722-NSPCC-1', bankRef: 'FPS-8291740' },
  { id: 'pay-nspcc-02', grantId: 'gr-nspcc-001', charityId: 'nspcc', amount: 75_000, status: 'Received', scheduledDate: '2025-10-15', sentDate: '2025-10-17', reference: 'PRISM-2025-1017-NSPCC-2', bankRef: 'FPS-8437012' },
  { id: 'pay-nspcc-03', grantId: 'gr-nspcc-002', charityId: 'nspcc', amount: 85_000, status: 'Scheduled', scheduledDate: '2026-01-15', sentDate: '', reference: 'PRISM-2026-0115-NSPCC-3', bankRef: '' },
  { id: 'pay-nspcc-04', grantId: 'gr-nspcc-003', charityId: 'nspcc', amount: 105_000, status: 'Scheduled', scheduledDate: '2026-03-20', sentDate: '', reference: 'PRISM-2026-0320-NSPCC-4', bankRef: '' },

  // ── Tate payments ──────────────────────────────────────────────────────
  { id: 'pay-tate-01', grantId: 'gr-tate-001', charityId: 'tate', amount: 60_000, status: 'Received', scheduledDate: '2025-05-28', sentDate: '2025-06-02', reference: 'PRISM-2025-0602-TATE-1', bankRef: 'FPS-7890234' },
  { id: 'pay-tate-02', grantId: 'gr-tate-001', charityId: 'tate', amount: 60_000, status: 'Received', scheduledDate: '2025-09-01', sentDate: '2025-09-03', reference: 'PRISM-2025-0903-TATE-2', bankRef: 'FPS-8120456' },
  { id: 'pay-tate-03', grantId: 'gr-tate-002', charityId: 'tate', amount: 60_000, status: 'Scheduled', scheduledDate: '2026-04-15', sentDate: '', reference: 'PRISM-2026-0415-TATE-3', bankRef: '' },

  // ── BHF payments ───────────────────────────────────────────────────────
  { id: 'pay-bhf-01', grantId: 'gr-bhf-001', charityId: 'bhf', amount: 75_000, status: 'Received', scheduledDate: '2025-04-22', sentDate: '2025-04-28', reference: 'PRISM-2025-0428-BHF-1', bankRef: 'FPS-7654321' },
  { id: 'pay-bhf-02', grantId: 'gr-bhf-001', charityId: 'bhf', amount: 75_000, status: 'Received', scheduledDate: '2025-08-01', sentDate: '2025-08-04', reference: 'PRISM-2025-0804-BHF-2', bankRef: 'FPS-7998412' },
  { id: 'pay-bhf-03', grantId: 'gr-bhf-002', charityId: 'bhf', amount: 95_000, status: 'Received', scheduledDate: '2025-09-28', sentDate: '2025-10-01', reference: 'PRISM-2025-1001-BHF-3', bankRef: 'FPS-8102938' },
  { id: 'pay-bhf-04', grantId: 'gr-bhf-003', charityId: 'bhf', amount: 125_000, status: 'Processing', scheduledDate: '2026-02-01', sentDate: '', reference: 'PRISM-2026-0201-BHF-4', bankRef: '' },
  { id: 'pay-bhf-05', grantId: 'gr-bhf-004', charityId: 'bhf', amount: 150_000, status: 'Scheduled', scheduledDate: '2026-04-15', sentDate: '', reference: 'PRISM-2026-0415-BHF-5', bankRef: '' },

  // ── WWF payments ───────────────────────────────────────────────────────
  { id: 'pay-wwf-01', grantId: 'gr-wwf-001', charityId: 'wwf', amount: 70_000, status: 'Received', scheduledDate: '2025-06-25', sentDate: '2025-07-01', reference: 'PRISM-2025-0701-WWF-1', bankRef: 'FPS-7812093' },
  { id: 'pay-wwf-02', grantId: 'gr-wwf-001', charityId: 'wwf', amount: 70_000, status: 'Received', scheduledDate: '2025-11-01', sentDate: '2025-11-04', reference: 'PRISM-2025-1104-WWF-2', bankRef: 'FPS-8309102' },
  { id: 'pay-wwf-03', grantId: 'gr-wwf-002', charityId: 'wwf', amount: 135_000, status: 'Scheduled', scheduledDate: '2026-03-15', sentDate: '', reference: 'PRISM-2026-0315-WWF-3', bankRef: '' },

  // ── Shelter payments ───────────────────────────────────────────────────
  { id: 'pay-shelter-01', grantId: 'gr-shelter-001', charityId: 'shelter', amount: 37_500, status: 'Received', scheduledDate: '2025-08-08', sentDate: '2025-08-12', reference: 'PRISM-2025-0812-SHELT-1', bankRef: 'FPS-7921034' },
  { id: 'pay-shelter-02', grantId: 'gr-shelter-001', charityId: 'shelter', amount: 37_500, status: 'Received', scheduledDate: '2025-11-15', sentDate: '2025-11-18', reference: 'PRISM-2025-1118-SHELT-2', bankRef: 'FPS-8287461' },
  { id: 'pay-shelter-03', grantId: 'gr-shelter-002', charityId: 'shelter', amount: 60_000, status: 'Processing', scheduledDate: '2026-01-20', sentDate: '', reference: 'PRISM-2026-0120-SHELT-3', bankRef: '' },
  { id: 'pay-shelter-04', grantId: 'gr-shelter-003', charityId: 'shelter', amount: 30_000, status: 'Scheduled', scheduledDate: '2026-04-10', sentDate: '', reference: 'PRISM-2026-0410-SHELT-4', bankRef: '' },
  { id: 'pay-shelter-05', grantId: 'gr-shelter-003', charityId: 'shelter', amount: 30_000, status: 'Scheduled', scheduledDate: '2026-07-10', sentDate: '', reference: 'PRISM-2026-0710-SHELT-5', bankRef: '' },
];

// ── Getter functions ───────────────────────────────────────────────────────

export function getGrantees(): Grantee[] {
  return grantees;
}

/** Backward-compat alias used by existing pages. */
export const getCharities = getGrantees;

export function getGranteeById(id: string): Grantee | undefined {
  return grantees.find((g) => g.id === id);
}

/** Backward-compat alias used by existing pages. */
export const getCharity = getGranteeById;

export function getGrantsForCharity(charityId: string): GranteeGrant[] {
  return grants.filter((g) => g.charityId === charityId);
}

export function getDocumentsForCharity(charityId: string): DDDocument[] {
  return ddDocuments.filter((d) => d.charityId === charityId);
}

export function getPaymentsForCharity(charityId: string): GrantPayment[] {
  return payments.filter((p) => p.charityId === charityId);
}

// ── Utility formatters ─────────────────────────────────────────────────────

export function formatCurrency(n: number): string {
  return '\u00A3' + n.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function formatDate(d: string): string {
  if (!d) return '\u2014';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
