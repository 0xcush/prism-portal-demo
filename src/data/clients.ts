export interface PerformanceEntry {
  month: string;
  fundValue: number;
  benchmark: number;
}

export interface ActivityEntry {
  type: 'income' | 'disbursement' | 'compliance' | 'statement' | 'rebalance';
  title: string;
  description: string;
  timestamp: string;
  aiGenerated: boolean;
}

export interface TimelineStep {
  status: string;
  date: string;
  actor: string;
  note: string;
}

export interface Grant {
  id: string;
  charity: string;
  charityNumber: string;
  amount: number;
  dateRequested: string;
  dateApproved: string | null;
  datePaid: string | null;
  status: 'Paid' | 'Approved' | 'In Review' | 'Requested';
  issueArea: string;
  delayReason?: string;
  timeline: TimelineStep[];
  verifiedViaCC: boolean;
  charityAddress: string;
  charityWebsite: string;
  charityType: string;
  approvalNotes: string;
  charityContact?: string;
}

export interface AssetAllocation {
  name: string;
  value: number;
  color: string;
}

export interface IssueArea {
  area: string;
  percentage: number;
  amount: number;
}

export interface Statement {
  period: string;
  type: 'Quarterly' | 'Annual' | 'Tax';
  date: string;
  aiGenerated: boolean;
}

export interface Transaction {
  date: string;
  description: string;
  reference: string;
  debit: number | null;
  credit: number | null;
  balance: number;
  category?: string;
}

export interface Holding {
  name: string;
  ticker: string;
  units: number;
  price: number;
  value: number;
  change: number; // percentage change
  weight: number; // percentage of portfolio
}

export interface ClientData {
  id: string;
  name: string;
  accountNumber: string;
  relationshipManager: string;
  accountType: 'DAF' | 'Collective Fund';
  status: 'Active' | 'Pending' | 'Suspended';
  onboardedDate: string;
  balances: {
    cash: number;
    investments: number;
    offshore?: number;
    total: number;
  };
  ytdReturn: number;
  assetDistribution: AssetAllocation[];
  grants: Grant[];
  issueAreaBreakdown: IssueArea[];
  statements: Statement[];
  transactions: Transaction[];
  holdings: Holding[];
  monthlyPerformance: PerformanceEntry[];
  recentActivity: ActivityEntry[];
}

export const clients: Record<string, ClientData> = {
  ashford: {
    id: 'ashford',
    name: 'The Ashford Foundation',
    accountNumber: 'PTGF-2024-0847',
    relationshipManager: 'James Prescott',
    accountType: 'DAF',
    status: 'Active',
    onboardedDate: '2024-03-15',
    balances: {
      cash: 847230,
      investments: 1423560,
      total: 2270790,
    },
    ytdReturn: 3.2,
    assetDistribution: [
      { name: 'UK Equities', value: 35, color: '#1e3a5f' },
      { name: 'Global Bonds', value: 25, color: '#3b6da1' },
      { name: 'Property Fund', value: 15, color: '#c5a55a' },
      { name: 'ESG Impact Fund', value: 15, color: '#6ba368' },
      { name: 'Cash', value: 10, color: '#94a3b8' },
    ],
    grants: [
      {
        id: 'GR-2026-0112',
        charity: 'Save the Children UK',
        charityNumber: '213890',
        amount: 75000,
        dateRequested: '2026-02-28',
        dateApproved: '2026-03-03',
        datePaid: '2026-03-07',
        status: 'Paid',
        issueArea: 'Social Welfare',
        timeline: [
          { status: 'Requested', date: '2026-02-28', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-03-02', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2026-03-03', actor: 'James Prescott', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2026-03-07', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: '1 St John\'s Lane, London EC1M 4AR',
        charityWebsite: 'savethechildren.org.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Standard due diligence passed',
        charityContact: 'Sarah Mitchell, Partnerships',
      },
      {
        id: 'GR-2026-0108',
        charity: 'Macmillan Cancer Support',
        charityNumber: '261017',
        amount: 120000,
        dateRequested: '2026-02-15',
        dateApproved: '2026-02-20',
        datePaid: '2026-02-25',
        status: 'Paid',
        issueArea: 'Healthcare',
        timeline: [
          { status: 'Requested', date: '2026-02-15', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-02-17', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2026-02-20', actor: 'James Prescott', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2026-02-25', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: '89 Albert Embankment, London SE1 7UQ',
        charityWebsite: 'macmillan.org.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Enhanced review completed for grants over £100,000',
        charityContact: 'Dr. Richard Hayes, Philanthropy',
      },
      {
        id: 'GR-2026-0119',
        charity: 'Royal Opera House Foundation',
        charityNumber: '211775',
        amount: 50000,
        dateRequested: '2026-03-05',
        dateApproved: '2026-03-08',
        datePaid: null,
        status: 'Approved',
        issueArea: 'Arts & Culture',
        timeline: [
          { status: 'Requested', date: '2026-03-05', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-03-07', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2026-03-08', actor: 'James Prescott', note: 'Grant approved following compliance review' },
        ],
        verifiedViaCC: true,
        charityAddress: 'Bow Street, London WC2E 9DD',
        charityWebsite: 'roh.org.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Standard due diligence passed',
        charityContact: 'Emma Whitworth, Development',
      },
      {
        id: 'GR-2026-0121',
        charity: 'WWF UK',
        charityNumber: '1081247',
        amount: 35000,
        dateRequested: '2026-03-07',
        dateApproved: null,
        datePaid: null,
        status: 'In Review',
        issueArea: 'Environment',
        delayReason: 'Awaiting bank statement verification',
        timeline: [
          { status: 'Requested', date: '2026-03-07', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-03-09', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
        ],
        verifiedViaCC: true,
        charityAddress: 'The Living Planet Centre, Rufford House, Brewery Road, Woking GU21 4LL',
        charityWebsite: 'wwf.org.uk',
        charityType: 'CIO',
        approvalNotes: 'Awaiting bank statement verification from charity',
        charityContact: 'Tom Langley, Corporate Partnerships',
      },
      {
        id: 'GR-2026-0124',
        charity: 'National Trust',
        charityNumber: '205846',
        amount: 25000,
        dateRequested: '2026-03-09',
        dateApproved: null,
        datePaid: null,
        status: 'Requested',
        issueArea: 'Environment',
        timeline: [
          { status: 'Requested', date: '2026-03-09', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
        ],
        verifiedViaCC: true,
        charityAddress: 'Heelis, Kemble Drive, Swindon SN2 2NA',
        charityWebsite: 'nationaltrust.org.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Pending initial review',
      },
      {
        id: 'GR-2026-0098',
        charity: "Great Ormond Street Hospital Children's Charity",
        charityNumber: '1160024',
        amount: 200000,
        dateRequested: '2026-01-22',
        dateApproved: '2026-01-28',
        datePaid: '2026-02-03',
        status: 'Paid',
        issueArea: 'Healthcare',
        timeline: [
          { status: 'Requested', date: '2026-01-22', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-01-24', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2026-01-28', actor: 'James Prescott', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2026-02-03', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: 'Great Ormond Street, London WC1N 3JH',
        charityWebsite: 'gosh.org',
        charityType: 'Registered Charity',
        approvalNotes: 'Enhanced review completed for grants over £100,000',
      },
      {
        id: 'GR-2026-0089',
        charity: 'The Sutton Trust',
        charityNumber: '1146244',
        amount: 85000,
        dateRequested: '2026-01-10',
        dateApproved: '2026-01-15',
        datePaid: '2026-01-20',
        status: 'Paid',
        issueArea: 'Education',
        timeline: [
          { status: 'Requested', date: '2026-01-10', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-01-12', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2026-01-15', actor: 'James Prescott', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2026-01-20', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: '9th Floor, Millbank Tower, 21-24 Millbank, London SW1P 4QP',
        charityWebsite: 'suttontrust.com',
        charityType: 'Registered Charity',
        approvalNotes: 'Standard due diligence passed',
      },
      {
        id: 'GR-2025-0341',
        charity: 'Tate Foundation',
        charityNumber: '1085314',
        amount: 60000,
        dateRequested: '2025-12-08',
        dateApproved: '2025-12-12',
        datePaid: '2025-12-18',
        status: 'Paid',
        issueArea: 'Arts & Culture',
        timeline: [
          { status: 'Requested', date: '2025-12-08', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2025-12-10', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2025-12-12', actor: 'James Prescott', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2025-12-18', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: 'Tate Modern, Bankside, London SE1 9TG',
        charityWebsite: 'tate.org.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Expedited approval - existing relationship',
      },
      {
        id: 'GR-2025-0330',
        charity: 'British Red Cross',
        charityNumber: '220949',
        amount: 45000,
        dateRequested: '2025-11-20',
        dateApproved: '2025-11-25',
        datePaid: '2025-12-01',
        status: 'Paid',
        issueArea: 'Social Welfare',
        timeline: [
          { status: 'Requested', date: '2025-11-20', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2025-11-22', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2025-11-25', actor: 'James Prescott', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2025-12-01', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: '44 Moorfields, London EC2Y 9AL',
        charityWebsite: 'redcross.org.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Standard due diligence passed',
      },
      {
        id: 'GR-2025-0318',
        charity: 'University of Oxford Development Trust',
        charityNumber: '1143548',
        amount: 150000,
        dateRequested: '2025-11-05',
        dateApproved: '2025-11-10',
        datePaid: '2025-11-18',
        status: 'Paid',
        issueArea: 'Education',
        timeline: [
          { status: 'Requested', date: '2025-11-05', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2025-11-07', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2025-11-10', actor: 'James Prescott', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2025-11-18', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: 'University Offices, Wellington Square, Oxford OX1 2JD',
        charityWebsite: 'development.ox.ac.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Enhanced review completed for grants over £100,000',
      },
    ],
    issueAreaBreakdown: [
      { area: 'Healthcare', percentage: 32, amount: 726000 },
      { area: 'Education', percentage: 24, amount: 545000 },
      { area: 'Arts & Culture', percentage: 18, amount: 409000 },
      { area: 'Environment', percentage: 15, amount: 341000 },
      { area: 'Social Welfare', percentage: 11, amount: 250000 },
    ],
    statements: [
      { period: 'Q1 2026', type: 'Quarterly', date: '2026-04-01', aiGenerated: true },
      { period: 'Q4 2025', type: 'Quarterly', date: '2026-01-15', aiGenerated: true },
      { period: 'Q3 2025', type: 'Quarterly', date: '2025-10-15', aiGenerated: true },
      { period: 'Q2 2025', type: 'Quarterly', date: '2025-07-15', aiGenerated: true },
      { period: 'Q1 2025', type: 'Quarterly', date: '2025-04-15', aiGenerated: true },
      { period: 'Annual Statement 2025', type: 'Annual', date: '2026-02-01', aiGenerated: true },
      { period: 'Annual Statement 2024', type: 'Annual', date: '2025-02-01', aiGenerated: true },
      { period: 'Tax Summary 2025', type: 'Tax', date: '2026-02-15', aiGenerated: true },
    ],
    transactions: [
      { date: '2026-03-07', description: 'Grant Payment - Save the Children UK', reference: 'GR-2026-0112', debit: 75000, credit: null, balance: 847230, category: 'Grant Disbursement' },
      { date: '2026-03-05', description: 'Investment Income - UK Equities Dividend', reference: 'INV-2026-0341', debit: null, credit: 12450, balance: 922230, category: 'Investment Income' },
      { date: '2026-03-01', description: 'Management Fee - Q1 2026', reference: 'FEE-2026-Q1', debit: 2837.50, credit: null, balance: 909780, category: 'Fees & Charges' },
      { date: '2026-02-25', description: 'Grant Payment - Macmillan Cancer Support', reference: 'GR-2026-0108', debit: 120000, credit: null, balance: 912617.50, category: 'Grant Disbursement' },
      { date: '2026-02-20', description: 'Investment Income - Global Bonds Coupon', reference: 'INV-2026-0298', debit: null, credit: 8920, balance: 1032617.50, category: 'Investment Income' },
      { date: '2026-02-15', description: 'Donation Received - Ashford Trust', reference: 'DON-2026-0045', debit: null, credit: 250000, balance: 1023697.50, category: 'Donation' },
      { date: '2026-02-10', description: 'Investment Rebalance - ESG Impact Fund', reference: 'REB-2026-0012', debit: 50000, credit: null, balance: 773697.50, category: 'Investment Transfer' },
      { date: '2026-02-10', description: 'Investment Rebalance - UK Equities', reference: 'REB-2026-0013', debit: null, credit: 50000, balance: 823697.50, category: 'Investment Transfer' },
      { date: '2026-02-03', description: 'Grant Payment - GOSH Children\'s Charity', reference: 'GR-2026-0098', debit: 200000, credit: null, balance: 773697.50, category: 'Grant Disbursement' },
      { date: '2026-01-28', description: 'Investment Income - Property Fund Distribution', reference: 'INV-2026-0187', debit: null, credit: 15340, balance: 973697.50, category: 'Investment Income' },
      { date: '2026-01-20', description: 'Grant Payment - The Sutton Trust', reference: 'GR-2026-0089', debit: 85000, credit: null, balance: 958357.50, category: 'Grant Disbursement' },
      { date: '2026-01-15', description: 'Platform Fee - January 2026', reference: 'FEE-2026-0115', debit: 567.80, credit: null, balance: 1043357.50, category: 'Fees & Charges' },
      { date: '2026-01-10', description: 'Investment Income - ESG Fund Distribution', reference: 'INV-2026-0092', debit: null, credit: 6780, balance: 1043925.30, category: 'Investment Income' },
      { date: '2025-12-18', description: 'Grant Payment - Tate Foundation', reference: 'GR-2025-0341', debit: 60000, credit: null, balance: 1037145.30, category: 'Grant Disbursement' },
      { date: '2025-12-15', description: 'Donation Received - Year-End Contribution', reference: 'DON-2025-0198', debit: null, credit: 175000, balance: 1097145.30, category: 'Donation' },
    ],
    holdings: [
      { name: 'Vanguard FTSE All-World UCITS ETF', ticker: 'VWRL', units: 2415, price: 109.82, value: 265215, change: 5.4, weight: 18.6 },
      { name: 'iShares Core MSCI World UCITS ETF', ticker: 'SWDA', units: 2780, price: 82.45, value: 229211, change: 4.8, weight: 16.1 },
      { name: 'Royal London Ethical Bond Fund', ticker: 'RLEBF', units: 168450, price: 1.1340, value: 190942, change: 1.2, weight: 13.4 },
      { name: 'Rathbone Ethical Bond Fund', ticker: 'RATEB', units: 150320, price: 1.2185, value: 183215, change: 0.8, weight: 12.9 },
      { name: 'Impax Environmental Markets', ticker: 'IEM', units: 32800, price: 5.19, value: 170232, change: 6.7, weight: 12.0 },
      { name: 'Troy Trojan Fund', ticker: 'TROYF', units: 62400, price: 2.5780, value: 160867, change: 2.1, weight: 11.3 },
      { name: 'CCLA COIF Charities Fixed Interest Fund', ticker: 'CCFIF', units: 119200, price: 1.1865, value: 141351, change: -0.4, weight: 9.9 },
      { name: 'M&G Optimal Income Fund', ticker: 'MGOI', units: 57640, price: 1.4430, value: 82527, change: 1.6, weight: 5.8 },
    ],
    monthlyPerformance: [
      { month: 'Apr 2025', fundValue: 2190000, benchmark: 2190000 },
      { month: 'May 2025', fundValue: 2198500, benchmark: 2196200 },
      { month: 'Jun 2025', fundValue: 2210300, benchmark: 2205800 },
      { month: 'Jul 2025', fundValue: 2225100, benchmark: 2218400 },
      { month: 'Aug 2025', fundValue: 2218700, benchmark: 2214600 },
      { month: 'Sep 2025', fundValue: 2212400, benchmark: 2210200 },
      { month: 'Oct 2025', fundValue: 2228900, benchmark: 2221500 },
      { month: 'Nov 2025', fundValue: 2241600, benchmark: 2230800 },
      { month: 'Dec 2025', fundValue: 2252200, benchmark: 2238100 },
      { month: 'Jan 2026', fundValue: 2258800, benchmark: 2242600 },
      { month: 'Feb 2026', fundValue: 2264500, benchmark: 2246900 },
      { month: 'Mar 2026', fundValue: 2270790, benchmark: 2250000 },
    ],
    recentActivity: [
      { type: 'disbursement', title: 'Grant Paid', description: 'Save the Children UK - £75,000 processed via BACS', timestamp: '2026-03-07', aiGenerated: false },
      { type: 'income', title: 'Dividend Received', description: 'UK Equities quarterly dividend - £12,450 credited', timestamp: '2026-03-05', aiGenerated: false },
      { type: 'compliance', title: 'Charity Commission Check', description: 'WWF UK (1081247) verification initiated for pending grant GR-2026-0121', timestamp: '2026-03-09', aiGenerated: true },
      { type: 'statement', title: 'Q1 2026 Statement Ready', description: 'Quarterly statement for Jan-Mar 2026 generated and available for download.', timestamp: '2026-03-10', aiGenerated: true },
      { type: 'rebalance', title: 'Portfolio Rebalanced', description: 'ESG Impact Fund allocation increased from 12% to 15%, funded from UK Equities', timestamp: '2026-02-10', aiGenerated: true },
      { type: 'disbursement', title: 'Grant Paid', description: 'Macmillan Cancer Support - £120,000 processed via BACS', timestamp: '2026-02-25', aiGenerated: false },
      { type: 'income', title: 'Donation Received', description: 'Ashford Trust annual contribution - £250,000 credited to cash account', timestamp: '2026-02-15', aiGenerated: false },
      { type: 'compliance', title: 'Annual Review Complete', description: 'FCA compliance check passed. All documentation verified and filed.', timestamp: '2026-01-31', aiGenerated: true },
      { type: 'disbursement', title: 'Grant Paid', description: "GOSH Children's Charity - £200,000 processed via BACS", timestamp: '2026-02-03', aiGenerated: false },
      { type: 'statement', title: 'Tax Summary 2025 Ready', description: 'Annual tax summary for 2025 generated. Gift Aid reclaims totalling £48,200 identified.', timestamp: '2026-02-15', aiGenerated: true },
    ],
  },

  greenfield: {
    id: 'greenfield',
    name: 'Greenfield Community Trust',
    accountNumber: 'PTGF-2023-0412',
    relationshipManager: 'Eleanor Pemberton',
    accountType: 'Collective Fund',
    status: 'Active',
    onboardedDate: '2023-06-01',
    balances: {
      cash: 234500,
      investments: 498200,
      offshore: 157300,
      total: 890000,
    },
    ytdReturn: 2.8,
    assetDistribution: [
      { name: 'UK Gilts', value: 30, color: '#1e3a5f' },
      { name: 'Corporate Bonds', value: 20, color: '#3b6da1' },
      { name: 'UK Equities', value: 20, color: '#c5a55a' },
      { name: 'International Equities', value: 15, color: '#6ba368' },
      { name: 'Offshore Fixed Income', value: 10, color: '#8b5cf6' },
      { name: 'Cash', value: 5, color: '#94a3b8' },
    ],
    grants: [
      {
        id: 'GR-2026-0445',
        charity: 'Oxfam GB',
        charityNumber: '202918',
        amount: 30000,
        dateRequested: '2026-03-01',
        dateApproved: '2026-03-05',
        datePaid: '2026-03-09',
        status: 'Paid',
        issueArea: 'Social Welfare',
        timeline: [
          { status: 'Requested', date: '2026-03-01', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-03-03', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2026-03-05', actor: 'Eleanor Pemberton', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2026-03-09', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: 'Oxfam House, John Smith Drive, Cowley, Oxford OX4 2JY',
        charityWebsite: 'oxfam.org.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Standard due diligence passed',
      },
      {
        id: 'GR-2026-0451',
        charity: 'Royal National Lifeboat Institution',
        charityNumber: '209603',
        amount: 15000,
        dateRequested: '2026-03-04',
        dateApproved: '2026-03-07',
        datePaid: null,
        status: 'Approved',
        issueArea: 'Social Welfare',
        timeline: [
          { status: 'Requested', date: '2026-03-04', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-03-06', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2026-03-07', actor: 'Eleanor Pemberton', note: 'Grant approved following compliance review' },
        ],
        verifiedViaCC: true,
        charityAddress: 'West Quay Road, Poole, Dorset BH15 1HZ',
        charityWebsite: 'rnli.org',
        charityType: 'Registered Charity',
        approvalNotes: 'Expedited approval - existing relationship',
      },
      {
        id: 'GR-2026-0458',
        charity: 'The Woodland Trust',
        charityNumber: '294344',
        amount: 20000,
        dateRequested: '2026-03-08',
        dateApproved: null,
        datePaid: null,
        status: 'In Review',
        issueArea: 'Environment',
        timeline: [
          { status: 'Requested', date: '2026-03-08', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-03-10', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
        ],
        verifiedViaCC: true,
        charityAddress: 'Kempton Way, Grantham, Lincolnshire NG31 6LL',
        charityWebsite: 'woodlandtrust.org.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Standard review in progress',
      },
      {
        id: 'GR-2026-0432',
        charity: 'Cancer Research UK',
        charityNumber: '1089464',
        amount: 45000,
        dateRequested: '2026-02-18',
        dateApproved: '2026-02-22',
        datePaid: '2026-02-28',
        status: 'Paid',
        issueArea: 'Healthcare',
        timeline: [
          { status: 'Requested', date: '2026-02-18', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-02-20', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2026-02-22', actor: 'Eleanor Pemberton', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2026-02-28', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: '2 Redman Place, London E20 1JQ',
        charityWebsite: 'cancerresearchuk.org',
        charityType: 'Registered Charity',
        approvalNotes: 'Standard due diligence passed',
      },
      {
        id: 'GR-2026-0420',
        charity: 'Shelter',
        charityNumber: '263710',
        amount: 25000,
        dateRequested: '2026-02-05',
        dateApproved: '2026-02-10',
        datePaid: '2026-02-15',
        status: 'Paid',
        issueArea: 'Social Welfare',
        timeline: [
          { status: 'Requested', date: '2026-02-05', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-02-07', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2026-02-10', actor: 'Eleanor Pemberton', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2026-02-15', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: '88 Old Street, London EC1V 9HU',
        charityWebsite: 'shelter.org.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Standard due diligence passed',
      },
      {
        id: 'GR-2025-0398',
        charity: 'Mind',
        charityNumber: '219830',
        amount: 18000,
        dateRequested: '2025-12-10',
        dateApproved: '2025-12-15',
        datePaid: '2025-12-20',
        status: 'Paid',
        issueArea: 'Healthcare',
        timeline: [
          { status: 'Requested', date: '2025-12-10', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2025-12-12', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2025-12-15', actor: 'Eleanor Pemberton', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2025-12-20', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: '2 Redman Place, Stratford, London E20 1JQ',
        charityWebsite: 'mind.org.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Standard due diligence passed',
      },
      {
        id: 'GR-2025-0385',
        charity: 'The Royal Horticultural Society',
        charityNumber: '222879',
        amount: 12000,
        dateRequested: '2025-11-22',
        dateApproved: '2025-11-27',
        datePaid: '2025-12-03',
        status: 'Paid',
        issueArea: 'Environment',
        timeline: [
          { status: 'Requested', date: '2025-11-22', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2025-11-24', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2025-11-27', actor: 'Eleanor Pemberton', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2025-12-03', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: '80 Vincent Square, London SW1P 2PE',
        charityWebsite: 'rhs.org.uk',
        charityType: 'Charitable Trust',
        approvalNotes: 'Standard due diligence passed',
      },
      {
        id: 'GR-2025-0370',
        charity: 'Barnardo\'s',
        charityNumber: '216250',
        amount: 22000,
        dateRequested: '2025-11-08',
        dateApproved: '2025-11-13',
        datePaid: '2025-11-19',
        status: 'Paid',
        issueArea: 'Social Welfare',
        timeline: [
          { status: 'Requested', date: '2025-11-08', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2025-11-10', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2025-11-13', actor: 'Eleanor Pemberton', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2025-11-19', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: 'Tanners Lane, Barkingside, Ilford, Essex IG6 1QG',
        charityWebsite: 'barnardos.org.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Standard due diligence passed',
      },
    ],
    issueAreaBreakdown: [
      { area: 'Social Welfare', percentage: 38, amount: 338200 },
      { area: 'Healthcare', percentage: 28, amount: 249200 },
      { area: 'Environment', percentage: 20, amount: 178000 },
      { area: 'Education', percentage: 9, amount: 80100 },
      { area: 'Arts & Culture', percentage: 5, amount: 44500 },
    ],
    statements: [
      { period: 'Q1 2026', type: 'Quarterly', date: '2026-04-01', aiGenerated: true },
      { period: 'Q4 2025', type: 'Quarterly', date: '2026-01-15', aiGenerated: true },
      { period: 'Q3 2025', type: 'Quarterly', date: '2025-10-15', aiGenerated: true },
      { period: 'Q2 2025', type: 'Quarterly', date: '2025-07-15', aiGenerated: true },
      { period: 'Q1 2025', type: 'Quarterly', date: '2025-04-15', aiGenerated: true },
      { period: 'Annual Statement 2025', type: 'Annual', date: '2026-02-01', aiGenerated: true },
      { period: 'Annual Statement 2024', type: 'Annual', date: '2025-02-01', aiGenerated: true },
      { period: 'Tax Summary 2025', type: 'Tax', date: '2026-02-15', aiGenerated: true },
    ],
    transactions: [
      { date: '2026-03-09', description: 'Grant Payment - Oxfam GB', reference: 'GR-2026-0445', debit: 30000, credit: null, balance: 234500, category: 'Grant Disbursement' },
      { date: '2026-03-01', description: 'Management Fee - Q1 2026', reference: 'FEE-2026-Q1G', debit: 1112.50, credit: null, balance: 264500, category: 'Fees & Charges' },
      { date: '2026-02-28', description: 'Grant Payment - Cancer Research UK', reference: 'GR-2026-0432', debit: 45000, credit: null, balance: 265612.50, category: 'Grant Disbursement' },
      { date: '2026-02-20', description: 'Investment Income - Corporate Bonds', reference: 'INV-2026-0267', debit: null, credit: 4230, balance: 310612.50, category: 'Investment Income' },
      { date: '2026-02-15', description: 'Grant Payment - Shelter', reference: 'GR-2026-0420', debit: 25000, credit: null, balance: 306382.50, category: 'Grant Disbursement' },
      { date: '2026-02-10', description: 'Investment Income - UK Gilts Coupon', reference: 'INV-2026-0245', debit: null, credit: 3890, balance: 331382.50, category: 'Investment Income' },
      { date: '2026-02-05', description: 'Donation Received - Greenfield Trustees', reference: 'DON-2026-0034', debit: null, credit: 75000, balance: 327492.50, category: 'Donation' },
      { date: '2026-01-28', description: 'Platform Fee - January 2026', reference: 'FEE-2026-0128G', debit: 445.25, credit: null, balance: 252492.50, category: 'Fees & Charges' },
      { date: '2026-01-22', description: 'Investment Rebalance - Corporate Bonds', reference: 'REB-2026-0008', debit: 25000, credit: null, balance: 252937.75, category: 'Investment Transfer' },
      { date: '2026-01-22', description: 'Investment Rebalance - UK Equities', reference: 'REB-2026-0009', debit: null, credit: 25000, balance: 277937.75, category: 'Investment Transfer' },
      { date: '2026-01-15', description: 'Investment Income - International Equities Dividend', reference: 'INV-2026-0156', debit: null, credit: 5670, balance: 252937.75, category: 'Investment Income' },
      { date: '2025-12-20', description: 'Grant Payment - Mind', reference: 'GR-2025-0398', debit: 18000, credit: null, balance: 247267.75, category: 'Grant Disbursement' },
      { date: '2025-12-15', description: 'Donation Received - Annual Contribution', reference: 'DON-2025-0167', debit: null, credit: 50000, balance: 265267.75, category: 'Donation' },
      { date: '2025-12-03', description: 'Grant Payment - Royal Horticultural Society', reference: 'GR-2025-0385', debit: 12000, credit: null, balance: 215267.75, category: 'Grant Disbursement' },
      { date: '2025-11-25', description: 'Management Fee - Q4 2025', reference: 'FEE-2025-Q4G', debit: 1112.50, credit: null, balance: 227267.75, category: 'Fees & Charges' },
    ],
    holdings: [
      { name: 'CCLA COIF Charities Investment Fund', ticker: 'CCIF', units: 52400, price: 2.6850, value: 140694, change: 2.3, weight: 28.2 },
      { name: 'Vanguard LifeStrategy 60% Equity Fund', ticker: 'VLS60', units: 43600, price: 2.4120, value: 105163, change: 3.1, weight: 21.1 },
      { name: 'iShares UK Gilts All Stocks Index Fund', ticker: 'IGLT', units: 62150, price: 1.2480, value: 77563, change: -0.6, weight: 15.6 },
      { name: 'Royal London Short Duration Global Index', ticker: 'RLSD', units: 58200, price: 1.0540, value: 61343, change: 0.4, weight: 12.3 },
      { name: 'Trojan Income Fund', ticker: 'TROYI', units: 28600, price: 1.8760, value: 53654, change: 1.9, weight: 10.8 },
      { name: 'Impax Environmental Markets', ticker: 'IEM', units: 11500, price: 5.19, value: 59685, change: 6.7, weight: 12.0 },
    ],
    monthlyPerformance: [
      { month: 'Apr 2025', fundValue: 865000, benchmark: 865000 },
      { month: 'May 2025', fundValue: 867400, benchmark: 866800 },
      { month: 'Jun 2025', fundValue: 870200, benchmark: 869100 },
      { month: 'Jul 2025', fundValue: 873800, benchmark: 871500 },
      { month: 'Aug 2025', fundValue: 872100, benchmark: 870800 },
      { month: 'Sep 2025', fundValue: 874500, benchmark: 872200 },
      { month: 'Oct 2025', fundValue: 877900, benchmark: 874000 },
      { month: 'Nov 2025', fundValue: 880600, benchmark: 875300 },
      { month: 'Dec 2025', fundValue: 883200, benchmark: 876100 },
      { month: 'Jan 2026', fundValue: 885800, benchmark: 876800 },
      { month: 'Feb 2026', fundValue: 887900, benchmark: 877500 },
      { month: 'Mar 2026', fundValue: 890000, benchmark: 878000 },
    ],
    recentActivity: [
      { type: 'disbursement', title: 'Grant Paid', description: 'Oxfam GB - £30,000 processed via BACS', timestamp: '2026-03-09', aiGenerated: false },
      { type: 'compliance', title: 'Charity Commission Check', description: 'The Woodland Trust (294344) verification initiated for pending grant GR-2026-0458', timestamp: '2026-03-10', aiGenerated: true },
      { type: 'income', title: 'Corporate Bonds Coupon', description: 'Corporate Bonds semi-annual coupon - £4,230 credited', timestamp: '2026-02-20', aiGenerated: false },
      { type: 'rebalance', title: 'Portfolio Rebalanced', description: 'UK Equities allocation increased by £25,000, funded from Corporate Bonds', timestamp: '2026-01-22', aiGenerated: true },
      { type: 'statement', title: 'Q4 2025 Statement Ready', description: 'Quarterly statement for Oct-Dec 2025 generated and available for download.', timestamp: '2026-01-15', aiGenerated: true },
      { type: 'disbursement', title: 'Grant Paid', description: 'Cancer Research UK - £45,000 processed via BACS', timestamp: '2026-02-28', aiGenerated: false },
      { type: 'income', title: 'Donation Received', description: 'Greenfield Trustees annual contribution - £75,000 credited to cash account', timestamp: '2026-02-05', aiGenerated: false },
      { type: 'compliance', title: 'Offshore Holdings Review', description: 'Annual offshore fixed income compliance review completed. All holdings verified.', timestamp: '2026-01-31', aiGenerated: true },
      { type: 'statement', title: 'Annual Statement 2025 Ready', description: 'Full annual statement for 2025 generated. Total grants disbursed: £187,000.', timestamp: '2026-02-01', aiGenerated: true },
      { type: 'disbursement', title: 'Grant Paid', description: 'Shelter - £25,000 processed via BACS', timestamp: '2026-02-15', aiGenerated: false },
    ],
  },

  whitmore: {
    id: 'whitmore',
    name: 'Dr. Jane Whitmore',
    accountNumber: 'PTGF-2022-0193',
    relationshipManager: 'Victoria Ashworth',
    accountType: 'DAF',
    status: 'Active',
    onboardedDate: '2022-09-12',
    balances: {
      cash: 1245800,
      investments: 2854200,
      total: 4100000,
    },
    ytdReturn: 4.1,
    assetDistribution: [
      { name: 'Global Equities', value: 30, color: '#1e3a5f' },
      { name: 'UK Equities', value: 20, color: '#3b6da1' },
      { name: 'ESG Impact Fund', value: 20, color: '#6ba368' },
      { name: 'Emerging Market Bonds', value: 10, color: '#c5a55a' },
      { name: 'Private Equity', value: 10, color: '#8b5cf6' },
      { name: 'Cash', value: 10, color: '#94a3b8' },
    ],
    grants: [
      {
        id: 'GR-2026-0601',
        charity: 'Wellcome Trust',
        charityNumber: '210183',
        amount: 250000,
        dateRequested: '2026-03-02',
        dateApproved: '2026-03-06',
        datePaid: '2026-03-10',
        status: 'Paid',
        issueArea: 'Healthcare',
        timeline: [
          { status: 'Requested', date: '2026-03-02', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-03-04', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2026-03-06', actor: 'Victoria Ashworth', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2026-03-10', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: '215 Euston Road, London NW1 2BE',
        charityWebsite: 'wellcome.org',
        charityType: 'Charitable Trust',
        approvalNotes: 'Enhanced review completed for grants over £100,000',
      },
      {
        id: 'GR-2026-0612',
        charity: 'Imperial College London',
        charityNumber: '1147157',
        amount: 180000,
        dateRequested: '2026-03-06',
        dateApproved: '2026-03-09',
        datePaid: null,
        status: 'Approved',
        issueArea: 'Education',
        timeline: [
          { status: 'Requested', date: '2026-03-06', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-03-08', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2026-03-09', actor: 'Victoria Ashworth', note: 'Grant approved following compliance review' },
        ],
        verifiedViaCC: true,
        charityAddress: 'South Kensington Campus, London SW7 2AZ',
        charityWebsite: 'imperial.ac.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Enhanced review completed for grants over £100,000',
      },
      {
        id: 'GR-2026-0618',
        charity: 'Royal Academy of Engineering',
        charityNumber: '293074',
        amount: 100000,
        dateRequested: '2026-03-08',
        dateApproved: null,
        datePaid: null,
        status: 'In Review',
        issueArea: 'Education',
        delayReason: 'Pending compliance review for grant amount',
        timeline: [
          { status: 'Requested', date: '2026-03-08', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-03-10', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
        ],
        verifiedViaCC: true,
        charityAddress: '3 Carlton House Terrace, London SW1Y 5DG',
        charityWebsite: 'raeng.org.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Pending compliance review for grant amount exceeding £50,000 threshold',
      },
      {
        id: 'GR-2026-0620',
        charity: 'Médecins Sans Frontières UK',
        charityNumber: '1026588',
        amount: 75000,
        dateRequested: '2026-03-09',
        dateApproved: null,
        datePaid: null,
        status: 'Requested',
        issueArea: 'Healthcare',
        timeline: [
          { status: 'Requested', date: '2026-03-09', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
        ],
        verifiedViaCC: true,
        charityAddress: 'Chancery Exchange, 10 Furnival Street, London EC4A 1AB',
        charityWebsite: 'msf.org.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Pending initial review',
      },
      {
        id: 'GR-2026-0588',
        charity: 'The Royal Society',
        charityNumber: '207043',
        amount: 200000,
        dateRequested: '2026-02-20',
        dateApproved: '2026-02-25',
        datePaid: '2026-03-01',
        status: 'Paid',
        issueArea: 'Education',
        timeline: [
          { status: 'Requested', date: '2026-02-20', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-02-22', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2026-02-25', actor: 'Victoria Ashworth', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2026-03-01', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: '6-9 Carlton House Terrace, London SW1Y 5AG',
        charityWebsite: 'royalsociety.org',
        charityType: 'Registered Charity',
        approvalNotes: 'Enhanced review completed for grants over £100,000',
      },
      {
        id: 'GR-2026-0575',
        charity: 'British Heart Foundation',
        charityNumber: '225971',
        amount: 150000,
        dateRequested: '2026-02-08',
        dateApproved: '2026-02-13',
        datePaid: '2026-02-18',
        status: 'Paid',
        issueArea: 'Healthcare',
        timeline: [
          { status: 'Requested', date: '2026-02-08', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-02-10', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2026-02-13', actor: 'Victoria Ashworth', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2026-02-18', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: 'Greater London House, 180 Hampstead Road, London NW1 7AW',
        charityWebsite: 'bhf.org.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Enhanced review completed for grants over £100,000',
      },
      {
        id: 'GR-2026-0560',
        charity: 'Cambridge University Endowment Fund',
        charityNumber: '1137428',
        amount: 300000,
        dateRequested: '2026-01-25',
        dateApproved: '2026-01-30',
        datePaid: '2026-02-05',
        status: 'Paid',
        issueArea: 'Education',
        timeline: [
          { status: 'Requested', date: '2026-01-25', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2026-01-27', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2026-01-30', actor: 'Victoria Ashworth', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2026-02-05', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: 'The Old Schools, Trinity Lane, Cambridge CB2 1TN',
        charityWebsite: 'philanthropy.cam.ac.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Enhanced review completed for grants over £100,000',
      },
      {
        id: 'GR-2025-0542',
        charity: 'The Francis Crick Institute',
        charityNumber: '1140062',
        amount: 175000,
        dateRequested: '2025-12-15',
        dateApproved: '2025-12-20',
        datePaid: '2025-12-28',
        status: 'Paid',
        issueArea: 'Healthcare',
        timeline: [
          { status: 'Requested', date: '2025-12-15', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2025-12-17', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2025-12-20', actor: 'Victoria Ashworth', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2025-12-28', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: '1 Midland Road, London NW1 1AT',
        charityWebsite: 'crick.ac.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Enhanced review completed for grants over £100,000',
      },
      {
        id: 'GR-2025-0530',
        charity: 'Southbank Centre',
        charityNumber: '298909',
        amount: 80000,
        dateRequested: '2025-12-01',
        dateApproved: '2025-12-05',
        datePaid: '2025-12-12',
        status: 'Paid',
        issueArea: 'Arts & Culture',
        timeline: [
          { status: 'Requested', date: '2025-12-01', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2025-12-03', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2025-12-05', actor: 'Victoria Ashworth', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2025-12-12', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: 'Belvedere Road, London SE1 8XX',
        charityWebsite: 'southbankcentre.co.uk',
        charityType: 'Registered Charity',
        approvalNotes: 'Expedited approval - existing relationship',
      },
      {
        id: 'GR-2025-0518',
        charity: 'Greenpeace UK',
        charityNumber: '284934',
        amount: 60000,
        dateRequested: '2025-11-18',
        dateApproved: '2025-11-22',
        datePaid: '2025-11-29',
        status: 'Paid',
        issueArea: 'Environment',
        timeline: [
          { status: 'Requested', date: '2025-11-18', actor: 'Client Portal', note: 'Grant recommendation submitted via portal' },
          { status: 'In Review', date: '2025-11-20', actor: 'Compliance Team', note: 'Due diligence and Charity Commission verification initiated' },
          { status: 'Approved', date: '2025-11-22', actor: 'Victoria Ashworth', note: 'Grant approved following compliance review' },
          { status: 'Paid', date: '2025-11-29', actor: 'Treasury', note: 'Payment processed via BACS to charity bank account' },
        ],
        verifiedViaCC: true,
        charityAddress: 'Canonbury Villas, London N1 2PN',
        charityWebsite: 'greenpeace.org.uk',
        charityType: 'CIO',
        approvalNotes: 'Standard due diligence passed',
      },
    ],
    issueAreaBreakdown: [
      { area: 'Healthcare', percentage: 35, amount: 1435000 },
      { area: 'Education', percentage: 30, amount: 1230000 },
      { area: 'Environment', percentage: 15, amount: 615000 },
      { area: 'Arts & Culture', percentage: 12, amount: 492000 },
      { area: 'Social Welfare', percentage: 8, amount: 328000 },
    ],
    statements: [
      { period: 'Q1 2026', type: 'Quarterly', date: '2026-04-01', aiGenerated: true },
      { period: 'Q4 2025', type: 'Quarterly', date: '2026-01-15', aiGenerated: true },
      { period: 'Q3 2025', type: 'Quarterly', date: '2025-10-15', aiGenerated: true },
      { period: 'Q2 2025', type: 'Quarterly', date: '2025-07-15', aiGenerated: true },
      { period: 'Q1 2025', type: 'Quarterly', date: '2025-04-15', aiGenerated: true },
      { period: 'Annual Statement 2025', type: 'Annual', date: '2026-02-01', aiGenerated: true },
      { period: 'Annual Statement 2024', type: 'Annual', date: '2025-02-01', aiGenerated: true },
      { period: 'Tax Summary 2025', type: 'Tax', date: '2026-02-15', aiGenerated: true },
    ],
    transactions: [
      { date: '2026-03-10', description: 'Grant Payment - Wellcome Trust', reference: 'GR-2026-0601', debit: 250000, credit: null, balance: 1245800, category: 'Grant Disbursement' },
      { date: '2026-03-05', description: 'Investment Income - Global Equities Dividend', reference: 'INV-2026-0412', debit: null, credit: 34500, balance: 1495800, category: 'Investment Income' },
      { date: '2026-03-01', description: 'Grant Payment - The Royal Society', reference: 'GR-2026-0588', debit: 200000, credit: null, balance: 1461300, category: 'Grant Disbursement' },
      { date: '2026-02-25', description: 'Donation Received - Whitmore Family Office', reference: 'DON-2026-0078', debit: null, credit: 500000, balance: 1661300, category: 'Donation' },
      { date: '2026-02-18', description: 'Grant Payment - British Heart Foundation', reference: 'GR-2026-0575', debit: 150000, credit: null, balance: 1161300, category: 'Grant Disbursement' },
      { date: '2026-02-10', description: 'Investment Income - ESG Impact Fund', reference: 'INV-2026-0356', debit: null, credit: 18900, balance: 1311300, category: 'Investment Income' },
      { date: '2026-02-05', description: 'Grant Payment - Cambridge University', reference: 'GR-2026-0560', debit: 300000, credit: null, balance: 1292400, category: 'Grant Disbursement' },
      { date: '2026-01-28', description: 'Investment Income - Private Equity Distribution', reference: 'INV-2026-0198', debit: null, credit: 42800, balance: 1592400, category: 'Investment Income' },
      { date: '2026-01-20', description: 'Management Fee - Q1 2026', reference: 'FEE-2026-Q1C', debit: 5125, credit: null, balance: 1549600, category: 'Fees & Charges' },
      { date: '2026-01-15', description: 'Investment Income - Emerging Market Bonds', reference: 'INV-2026-0145', debit: null, credit: 15600, balance: 1554725, category: 'Investment Income' },
      { date: '2025-12-28', description: 'Grant Payment - The Francis Crick Institute', reference: 'GR-2025-0542', debit: 175000, credit: null, balance: 1539125, category: 'Grant Disbursement' },
      { date: '2025-12-20', description: 'Donation Received - Whitmore Family Year-End', reference: 'DON-2025-0212', debit: null, credit: 750000, balance: 1714125, category: 'Donation' },
      { date: '2025-12-12', description: 'Grant Payment - Southbank Centre', reference: 'GR-2025-0530', debit: 80000, credit: null, balance: 964125, category: 'Grant Disbursement' },
      { date: '2025-12-05', description: 'Investment Rebalance - Global to ESG', reference: 'REB-2025-0089', debit: 100000, credit: null, balance: 1044125, category: 'Investment Transfer' },
      { date: '2025-12-05', description: 'Investment Rebalance - ESG Impact Fund', reference: 'REB-2025-0090', debit: null, credit: 100000, balance: 1144125, category: 'Investment Transfer' },
    ],
    holdings: [
      { name: 'Fundsmith Equity Fund', ticker: 'FNSM', units: 118500, price: 5.6420, value: 668577, change: 7.2, weight: 23.4 },
      { name: 'Vanguard FTSE All-World UCITS ETF', ticker: 'VWRL', units: 4620, price: 109.82, value: 507368, change: 5.4, weight: 17.8 },
      { name: 'Baillie Gifford Positive Change Fund', ticker: 'BGPC', units: 145200, price: 2.5380, value: 368519, change: 4.1, weight: 12.9 },
      { name: 'iShares Core MSCI World UCITS ETF', ticker: 'SWDA', units: 4180, price: 82.45, value: 344641, change: 4.8, weight: 12.1 },
      { name: 'Rathbone Ethical Bond Fund', ticker: 'RATEB', units: 248600, price: 1.2185, value: 302920, change: 0.8, weight: 10.6 },
      { name: 'CCLA COIF Charities Ethical Investment Fund', ticker: 'CCEIF', units: 86500, price: 3.1240, value: 270226, change: 3.5, weight: 9.5 },
      { name: 'Troy Trojan Fund', ticker: 'TROYF', units: 78400, price: 2.5780, value: 202115, change: 2.1, weight: 7.1 },
      { name: 'M&G Optimal Income Fund', ticker: 'MGOI', units: 131280, price: 1.4430, value: 189437, change: 1.6, weight: 6.6 },
    ],
    monthlyPerformance: [
      { month: 'Apr 2025', fundValue: 3938000, benchmark: 3938000 },
      { month: 'May 2025', fundValue: 3962400, benchmark: 3955200 },
      { month: 'Jun 2025', fundValue: 3988100, benchmark: 3972800 },
      { month: 'Jul 2025', fundValue: 4018500, benchmark: 3995600 },
      { month: 'Aug 2025', fundValue: 3998200, benchmark: 3982400 },
      { month: 'Sep 2025', fundValue: 4012800, benchmark: 3990100 },
      { month: 'Oct 2025', fundValue: 4041600, benchmark: 4008900 },
      { month: 'Nov 2025', fundValue: 4058300, benchmark: 4020500 },
      { month: 'Dec 2025', fundValue: 4072100, benchmark: 4031200 },
      { month: 'Jan 2026', fundValue: 4085400, benchmark: 4039800 },
      { month: 'Feb 2026', fundValue: 4092700, benchmark: 4045600 },
      { month: 'Mar 2026', fundValue: 4100000, benchmark: 4050000 },
    ],
    recentActivity: [
      { type: 'disbursement', title: 'Grant Paid', description: 'Wellcome Trust - £250,000 processed via BACS', timestamp: '2026-03-10', aiGenerated: false },
      { type: 'income', title: 'Dividend Received', description: 'Global Equities quarterly dividend - £34,500 credited', timestamp: '2026-03-05', aiGenerated: false },
      { type: 'compliance', title: 'Charity Commission Check', description: 'Royal Academy of Engineering (293074) verification initiated for pending grant GR-2026-0618', timestamp: '2026-03-10', aiGenerated: true },
      { type: 'disbursement', title: 'Grant Paid', description: 'The Royal Society - £200,000 processed via BACS', timestamp: '2026-03-01', aiGenerated: false },
      { type: 'income', title: 'Donation Received', description: 'Whitmore Family Office contribution - £500,000 credited to cash account', timestamp: '2026-02-25', aiGenerated: false },
      { type: 'rebalance', title: 'Portfolio Rebalanced', description: 'ESG Impact Fund allocation increased from 15% to 20%, funded from Global Equities', timestamp: '2025-12-05', aiGenerated: true },
      { type: 'statement', title: 'Annual Statement 2025 Ready', description: 'Full annual statement for 2025 generated. Total grants disbursed: £1,570,000.', timestamp: '2026-02-01', aiGenerated: true },
      { type: 'compliance', title: 'Enhanced Due Diligence Complete', description: 'Quarterly enhanced due diligence review completed for high-value DAF. All controls satisfactory.', timestamp: '2026-01-31', aiGenerated: true },
      { type: 'income', title: 'Private Equity Distribution', description: 'Private Equity fund Q4 distribution - £42,800 credited', timestamp: '2026-01-28', aiGenerated: false },
      { type: 'statement', title: 'Tax Summary 2025 Ready', description: 'Annual tax summary for 2025 generated. Gift Aid reclaims totalling £125,600 identified.', timestamp: '2026-02-15', aiGenerated: true },
    ],
  },
};

export function getClient(id: string): ClientData | undefined {
  return clients[id];
}

export function getAllClients(): ClientData[] {
  return Object.values(clients);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
