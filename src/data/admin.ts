// ── Types ──────────────────────────────────────────────────────────────

export interface Prospect {
  id: string;
  name: string;
  stage: 'Lead' | 'Initial Contact' | 'Questions Sent' | 'Fee Proposal' | 'Contract' | 'Onboarding' | 'Active Client' | 'Handed to RM';
  dafSize: number;
  fundType: 'DAF' | 'CF';
  ukUs: 'UK' | 'US' | 'Both';
  conversionProbability: 'High' | 'Medium' | 'Low';
  sourceActivity: string;
  followUpStatus: 'On Track' | 'Due' | 'Overdue';
  referredBy: string;
  referringFirm: string;
  relationshipManager: string;
  bdPointOfContact: string;
  dateEnteredPipeline: string;
  lastContact: string;
  nextFollowUp: string;
  notes: string;
  daysInPipeline: number;
  impactCategory: string;
  location: string;
  ukGifts?: number;
  overseasGifts?: number;
  assetTypes?: string[];
  hasInvestmentAccount?: boolean;
  investmentProvider?: string;
  accountManager?: string;
  giftEligible?: boolean;
  donorCount?: number;
}

export interface Firm {
  id: string;
  name: string;
  type: 'Investment Manager' | 'Wealth Advisor' | 'Accountancy' | 'Law Firm' | 'Family Office' | 'Philanthropy Advisor';
  status: 'Active' | 'Nurturing' | 'Inactive';
  relationshipStatus: 'Active' | 'Nurturing' | 'Secured' | 'Cold';
  offices: string[];
  lastInteraction: string;
  relationshipStart: string;
  contactCount: number;
  referralCount: number;
  personalNotes: string;
  totalAUM: number;
  keyContactName: string;
  keyContactTitle: string;
  advisors: Array<{
    name: string;
    title: string;
    email: string;
    phone?: string;
    lastContact?: string;
  }>;
}

export interface Contact {
  id: string;
  name: string;
  category: 'Intermediary' | 'Potential Donor' | 'Donor' | 'Lawyer' | 'Investment Manager' | 'Accountant';
  email: string;
  phone: string;
  firmName: string;
  source: string;
  followUpStatus: 'On Track' | 'Due' | 'Overdue';
  lastContactDate: string;
  nextFollowUp: string;
  notes: string;
  contactFrequencyDays?: number;
  nextReminderDate?: string;
  tags?: string[];
}

export interface ClientAccount {
  id: string;
  name: string;
  accountNumber: string;
  accountType: 'DAF' | 'Collective Fund';
  entity: 'PTGF' | 'TPCT' | 'PAL' | 'Foundation';
  status: 'Active' | 'Pending' | 'Closed';
  cashBalance: number;
  investmentBalance: number;
  offshoreBalance: number;
  totalValue: number;
  ytdReturn: number;
  relationshipManager: string;
  onboardedDate: string;
  impactCategory: string;
  location: string;
  ukGifts?: number;
  overseasGifts?: number;
  assetTypes?: string[];
  hasInvestmentAccount?: boolean;
  investmentProvider?: string;
  accountManager?: string;
  giftEligible?: boolean;
  donorCount?: number;
}

export interface AdminGrant {
  id: string;
  grantName: string;
  charity: string;
  charityNumber: string;
  amount: number;
  stage: 'Requested' | 'First Contact' | 'Awaiting Bank Statement' | 'In Review' | 'Approved' | 'Paid' | 'Declined';
  issueArea: string;
  priority: 'High' | 'Medium' | 'Low';
  ddStatus: 'Not Started' | 'Pending' | 'In Progress' | 'Complete' | 'Failed';
  clientAccount: string;
  requestedBy: string;
  dateRequested: string;
  daysInStage: number;
}

export interface BDActivity {
  id: string;
  activity: string;
  type: 'Lunch & Learn' | 'Office Visit' | 'Conference' | 'Webinar' | 'Email Campaign' | 'Networking Event';
  date: string;
  status: 'Planned' | 'Completed' | 'Cancelled';
  firmName: string;
  cost: number;
  location: string;
  prospectsGenerated: number;
  attendeeCount: number;
  assignedTo: 'Kirsty' | 'Dibo' | 'Unassigned';
  followUpDate: string;
  followUpStatus: 'Pending' | 'Completed' | 'Overdue';
  followUpNotes: string;
}

export interface LocationBreakdown {
  location: string;
  meetings: number;
  lunchAndLearns: number;
  events: number;
  referrals: number;
}

export interface ConversionPath {
  firm: string;
  path: string[];
  duration: string;
}

export interface ConversionRates {
  meetingsToLunchAndLearns: number;
  meetingsToReferrals: number;
  lunchAndLearnsToClients: number;
  overallMeetingsToClients: number;
  conversionPaths?: ConversionPath[];
}

export interface QuarterlyKPIs {
  quarter: string;
  meetings: number;
  lunchAndLearns: number;
  events: number;
  newProspects: number;
  conversions: number;
  locationBreakdown?: LocationBreakdown[];
  conversionRates?: ConversionRates;
}

export interface DashboardStats {
  totalPipelineValue: number;
  activeAccounts: number;
  dafCount: number;
  cfCount: number;
  grantsPipeline: number;
  grantsCount: number;
  paidGrants: number;
  approvedGrants: number;
  firmCount: number;
  activeFirms: number;
  nurturingFirms: number;
  overdueFollowUps: number;
}

// ── Mock Data ──────────────────────────────────────────────────────────

const prospects: Prospect[] = [
  { id: 'p1', name: 'Lord Ashford', stage: 'Fee Proposal', dafSize: 5200000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Lunch & Learn - Cazenove', followUpStatus: 'On Track', referredBy: 'Edward Langley', referringFirm: 'Cazenove Capital', relationshipManager: 'Victoria Langley', bdPointOfContact: 'Kirsty', dateEnteredPipeline: '2025-11-15', lastContact: '2026-03-04', nextFollowUp: '2026-03-14', notes: 'Interested in environmental grants. Wants bespoke investment mandate.', daysInPipeline: 115, impactCategory: 'Environment', location: 'London, UK', ukGifts: 3, overseasGifts: 0, assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'Cazenove Capital', accountManager: 'Edward Langley', giftEligible: true, donorCount: 1 },
  { id: 'p2', name: 'Elizabeth Park-Wilson', stage: 'Contract', dafSize: 3800000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Referral - JM Finn', followUpStatus: 'On Track', referredBy: 'Thomas Barrington', referringFirm: 'JM Finn', relationshipManager: 'James Prescott', bdPointOfContact: 'Dibo', dateEnteredPipeline: '2025-12-01', lastContact: '2026-03-07', nextFollowUp: '2026-03-12', notes: 'Contract review with solicitor. Expects to sign next week.', daysInPipeline: 99, impactCategory: 'Education', location: 'Oxford, UK', ukGifts: 2, overseasGifts: 1, assetTypes: ['Cash'], hasInvestmentAccount: true, investmentProvider: 'JM Finn', accountManager: 'Thomas Barrington', giftEligible: true, donorCount: 1 },
  { id: 'p3', name: 'Dr Alistair Waverly', stage: 'Questions Sent', dafSize: 1500000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'Medium', sourceActivity: 'Conference - STEP', followUpStatus: 'Due', referredBy: 'Self', referringFirm: '', relationshipManager: 'Rachel Whitfield', bdPointOfContact: 'Kirsty', dateEnteredPipeline: '2026-01-10', lastContact: '2026-02-20', nextFollowUp: '2026-03-10', notes: 'Academic with family wealth. Interested in education grants.', daysInPipeline: 59, impactCategory: 'Education', location: 'Cambridge, UK', ukGifts: 1, overseasGifts: 0, assetTypes: ['Cash'], hasInvestmentAccount: false, giftEligible: true, donorCount: 1 },
  { id: 'p4', name: 'The Kensington Trust', stage: 'Initial Contact', dafSize: 12000000, fundType: 'CF', ukUs: 'UK', conversionProbability: 'Medium', sourceActivity: 'Referral - Goldman Sachs', followUpStatus: 'On Track', referredBy: 'Patricia Gresham', referringFirm: 'Goldman Sachs', relationshipManager: 'Victoria Langley', bdPointOfContact: 'Dibo', dateEnteredPipeline: '2026-02-01', lastContact: '2026-03-06', nextFollowUp: '2026-03-18', notes: 'Multi-generational family trust. Exploring charitable vehicles.', daysInPipeline: 37, impactCategory: 'Social Welfare', location: 'London, UK', ukGifts: 8, overseasGifts: 3, assetTypes: ['Cash', 'Shares', 'Property'], hasInvestmentAccount: true, investmentProvider: 'Goldman Sachs', accountManager: 'Patricia Gresham', giftEligible: true, donorCount: 4 },
  { id: 'p5', name: 'Sir Geoffrey Hartwell', stage: 'Onboarding', dafSize: 7500000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Office Visit - Rathbones', followUpStatus: 'On Track', referredBy: 'Henry Ashmore', referringFirm: 'Rathbones', relationshipManager: 'Sophie Merrick', bdPointOfContact: 'Kirsty', dateEnteredPipeline: '2025-09-20', lastContact: '2026-03-08', nextFollowUp: '2026-03-15', notes: 'KYC documentation being collected. First tranche expected April.', daysInPipeline: 171, impactCategory: 'Environment', location: 'Edinburgh, UK', ukGifts: 5, overseasGifts: 2, assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'Rathbones', accountManager: 'Henry Ashmore', giftEligible: true, donorCount: 1 },
  { id: 'p6', name: 'Eleanor Fairchild', stage: 'Lead', dafSize: 900000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'Low', sourceActivity: 'Webinar - Tax Planning', followUpStatus: 'Overdue', referredBy: 'Website', referringFirm: '', relationshipManager: 'Rachel Whitfield', bdPointOfContact: 'Unassigned', dateEnteredPipeline: '2026-02-20', lastContact: '2026-02-22', nextFollowUp: '2026-03-05', notes: 'Downloaded white paper. No direct conversation yet.', daysInPipeline: 18, impactCategory: 'Arts & Culture', location: 'Bath, UK', assetTypes: ['Cash'], hasInvestmentAccount: false, giftEligible: true, donorCount: 1 },
  { id: 'p7', name: 'Worthington Family Office', stage: 'Fee Proposal', dafSize: 8200000, fundType: 'CF', ukUs: 'Both', conversionProbability: 'High', sourceActivity: 'Referral - Evelyn Partners', followUpStatus: 'On Track', referredBy: 'Charlotte Pemberton', referringFirm: 'Evelyn Partners', relationshipManager: 'James Prescott', bdPointOfContact: 'Dibo', dateEnteredPipeline: '2025-10-05', lastContact: '2026-03-05', nextFollowUp: '2026-03-13', notes: 'Wants collective fund with ESG mandate. Fee proposal under review.', daysInPipeline: 156, impactCategory: 'International Development', location: 'London, UK', ukGifts: 6, overseasGifts: 4, assetTypes: ['Cash', 'Shares', 'Property'], hasInvestmentAccount: true, investmentProvider: 'Evelyn Partners', accountManager: 'Charlotte Pemberton', giftEligible: true, donorCount: 3 },
  { id: 'p8', name: 'Catherine Beaumont', stage: 'Active Client', dafSize: 2100000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Referral - Schroders', followUpStatus: 'On Track', referredBy: 'Marcus Thornley', referringFirm: 'Schroders', relationshipManager: 'Victoria Langley', bdPointOfContact: 'Kirsty', dateEnteredPipeline: '2025-06-12', lastContact: '2026-03-01', nextFollowUp: '2026-04-01', notes: 'First grant disbursement made in January. Very satisfied.', daysInPipeline: 271, impactCategory: 'Healthcare', location: 'London, UK', ukGifts: 4, overseasGifts: 0, assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'Schroders', accountManager: 'Marcus Thornley', giftEligible: true, donorCount: 1 },
  { id: 'p9', name: 'Rt Hon James Fairfax MP', stage: 'Questions Sent', dafSize: 650000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'Medium', sourceActivity: 'Networking Event', followUpStatus: 'Overdue', referredBy: 'Self', referringFirm: '', relationshipManager: 'Sophie Merrick', bdPointOfContact: 'Kirsty', dateEnteredPipeline: '2026-01-20', lastContact: '2026-02-10', nextFollowUp: '2026-03-01', notes: 'Interested in arts and heritage. Needs privacy assurances.', daysInPipeline: 49, impactCategory: 'Arts & Culture', location: 'London, UK', ukGifts: 1, overseasGifts: 0, assetTypes: ['Cash'], hasInvestmentAccount: false, giftEligible: true, donorCount: 1 },
  { id: 'p10', name: 'Thornbridge Capital Partners', stage: 'Initial Contact', dafSize: 4500000, fundType: 'CF', ukUs: 'UK', conversionProbability: 'Medium', sourceActivity: 'Conference - Philanthropy Impact', followUpStatus: 'On Track', referredBy: 'Conference introduction', referringFirm: '', relationshipManager: 'James Prescott', bdPointOfContact: 'Dibo', dateEnteredPipeline: '2026-02-15', lastContact: '2026-03-03', nextFollowUp: '2026-03-17', notes: 'Corporate foundation exploring DAF alternative.', daysInPipeline: 23, impactCategory: 'Social Welfare', location: 'Manchester, UK', ukGifts: 2, overseasGifts: 1, assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'Brewin Dolphin', accountManager: 'Fund Committee', giftEligible: true, donorCount: 5 },
  { id: 'p11', name: 'Lady Sophia Ashworth', stage: 'Handed to RM', dafSize: 1800000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Referral - Coutts', followUpStatus: 'On Track', referredBy: 'James Hartington', referringFirm: 'Coutts', relationshipManager: 'Rachel Whitfield', bdPointOfContact: 'Kirsty', dateEnteredPipeline: '2025-08-05', lastContact: '2026-03-09', nextFollowUp: '2026-03-20', notes: 'Fully onboarded. RM managing ongoing relationship.', daysInPipeline: 217, impactCategory: 'Arts & Culture', location: 'London, UK', ukGifts: 7, overseasGifts: 0, assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'Coutts', accountManager: 'James Hartington', giftEligible: true, donorCount: 1 },
  { id: 'p12', name: 'The Elmswood Foundation', stage: 'Lead', dafSize: 3000000, fundType: 'CF', ukUs: 'UK', conversionProbability: 'Low', sourceActivity: 'Email Campaign - Q1', followUpStatus: 'Due', referredBy: 'Marketing', referringFirm: '', relationshipManager: 'Victoria Langley', bdPointOfContact: 'Unassigned', dateEnteredPipeline: '2026-03-01', lastContact: '2026-03-02', nextFollowUp: '2026-03-10', notes: 'Opened email. Clicked on DAF info page.', daysInPipeline: 9, impactCategory: 'Environment', location: 'Bristol, UK', assetTypes: ['Cash'], hasInvestmentAccount: false, giftEligible: false, donorCount: 2 },
  { id: 'p13', name: 'Robert Windham KC', stage: 'Fee Proposal', dafSize: 2400000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Referral - Withers LLP', followUpStatus: 'On Track', referredBy: 'Sarah Pemberton', referringFirm: 'Withers LLP', relationshipManager: 'Sophie Merrick', bdPointOfContact: 'Dibo', dateEnteredPipeline: '2025-11-28', lastContact: '2026-03-06', nextFollowUp: '2026-03-16', notes: 'Fee proposal accepted verbally. Drafting agreement.', daysInPipeline: 102, impactCategory: 'Social Welfare', location: 'London, UK', ukGifts: 2, overseasGifts: 0, assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'Rathbones', accountManager: 'Sarah Pemberton', giftEligible: true, donorCount: 1 },
  { id: 'p14', name: 'Helena Cavendish-Hale', stage: 'Active Client', dafSize: 4200000, fundType: 'DAF', ukUs: 'Both', conversionProbability: 'High', sourceActivity: 'Referral - Goldman Sachs', followUpStatus: 'On Track', referredBy: 'Patricia Gresham', referringFirm: 'Goldman Sachs', relationshipManager: 'James Prescott', bdPointOfContact: 'Kirsty', dateEnteredPipeline: '2025-01-15', lastContact: '2026-02-28', nextFollowUp: '2026-03-28', notes: 'US/UK dual giving. Second tranche received February.', daysInPipeline: 334, impactCategory: 'Healthcare', location: 'London, UK', ukGifts: 6, overseasGifts: 3, assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'Goldman Sachs', accountManager: 'Patricia Gresham', giftEligible: true, donorCount: 1 },
  { id: 'p15', name: 'Alderman Christopher Mercer', stage: 'Onboarding', dafSize: 1200000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Lunch & Learn - City of London', followUpStatus: 'Due', referredBy: 'Livery Company', referringFirm: '', relationshipManager: 'Rachel Whitfield', bdPointOfContact: 'Dibo', dateEnteredPipeline: '2025-12-15', lastContact: '2026-02-25', nextFollowUp: '2026-03-10', notes: 'Gift deed being executed. Completion expected mid-March.', daysInPipeline: 85, impactCategory: 'Religious', location: 'London, UK', ukGifts: 3, overseasGifts: 0, assetTypes: ['Cash'], hasInvestmentAccount: false, giftEligible: true, donorCount: 1 },
  { id: 'p16', name: 'Penrose Wealth Management', stage: 'Contract', dafSize: 6000000, fundType: 'CF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Office Visit - direct', followUpStatus: 'On Track', referredBy: 'Industry contact', referringFirm: '', relationshipManager: 'Victoria Langley', bdPointOfContact: 'Kirsty', dateEnteredPipeline: '2025-10-20', lastContact: '2026-03-07', nextFollowUp: '2026-03-14', notes: 'Collective fund for their HNW clients. Legal review stage.', daysInPipeline: 141, impactCategory: 'International Development', location: 'London, UK', ukGifts: 4, overseasGifts: 5, assetTypes: ['Cash', 'Shares', 'Property'], hasInvestmentAccount: true, investmentProvider: 'Brewin Dolphin', accountManager: 'Fund Manager', giftEligible: true, donorCount: 8 },
  { id: 'p17', name: 'Beatrice Dunmore', stage: 'Lead', dafSize: 500000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'Low', sourceActivity: 'Website Enquiry', followUpStatus: 'On Track', referredBy: 'Website', referringFirm: '', relationshipManager: 'Sophie Merrick', bdPointOfContact: 'Unassigned', dateEnteredPipeline: '2026-03-05', lastContact: '2026-03-06', nextFollowUp: '2026-03-19', notes: 'Initial enquiry form submitted. Basic info call scheduled.', daysInPipeline: 5, impactCategory: 'Education', location: 'Glasgow, UK', assetTypes: ['Cash'], hasInvestmentAccount: false, giftEligible: true, donorCount: 1 },
  { id: 'p18', name: 'Duke of Strathmere', stage: 'Questions Sent', dafSize: 15000000, fundType: 'CF', ukUs: 'UK', conversionProbability: 'Medium', sourceActivity: 'Referral - Cazenove Capital', followUpStatus: 'On Track', referredBy: 'Edward Langley', referringFirm: 'Cazenove Capital', relationshipManager: 'Victoria Langley', bdPointOfContact: 'Kirsty', dateEnteredPipeline: '2026-01-05', lastContact: '2026-03-03', nextFollowUp: '2026-03-17', notes: 'Very large prospect. Wants multi-generational philanthropic vehicle.', daysInPipeline: 64, impactCategory: 'Environment', location: 'Inverness, UK', ukGifts: 10, overseasGifts: 2, assetTypes: ['Cash', 'Shares', 'Property'], hasInvestmentAccount: true, investmentProvider: 'Cazenove Capital', accountManager: 'Edward Langley', giftEligible: true, donorCount: 6 },
  { id: 'p19', name: 'Hartfield & Partners Trust', stage: 'Initial Contact', dafSize: 2800000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'Medium', sourceActivity: 'Conference - STEP', followUpStatus: 'Overdue', referredBy: 'STEP event', referringFirm: '', relationshipManager: 'James Prescott', bdPointOfContact: 'Dibo', dateEnteredPipeline: '2026-02-10', lastContact: '2026-02-15', nextFollowUp: '2026-03-03', notes: 'Exchanged cards at STEP. Sent intro email, no reply yet.', daysInPipeline: 28, impactCategory: 'Social Welfare', location: 'Leeds, UK', assetTypes: ['Cash'], hasInvestmentAccount: false, giftEligible: true, donorCount: 2 },
  { id: 'p20', name: 'Professor Diana Ellsworth', stage: 'Active Client', dafSize: 980000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Referral - JM Finn', followUpStatus: 'On Track', referredBy: 'Thomas Barrington', referringFirm: 'JM Finn', relationshipManager: 'Rachel Whitfield', bdPointOfContact: 'Kirsty', dateEnteredPipeline: '2025-03-10', lastContact: '2026-03-02', nextFollowUp: '2026-04-02', notes: 'Science and research focus. Annual review scheduled April.', daysInPipeline: 294, impactCategory: 'Education', location: 'Oxford, UK', ukGifts: 5, overseasGifts: 1, assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'JM Finn', accountManager: 'Thomas Barrington', giftEligible: true, donorCount: 1 },
  { id: 'p21', name: 'The Millbrook Charitable Trust', stage: 'Fee Proposal', dafSize: 3400000, fundType: 'CF', ukUs: 'UK', conversionProbability: 'Medium', sourceActivity: 'Referral - Evelyn Partners', followUpStatus: 'Due', referredBy: 'Charlotte Pemberton', referringFirm: 'Evelyn Partners', relationshipManager: 'Sophie Merrick', bdPointOfContact: 'Dibo', dateEnteredPipeline: '2025-11-08', lastContact: '2026-02-27', nextFollowUp: '2026-03-10', notes: 'Comparing fees with competitor. Need to follow up on proposal.', daysInPipeline: 122, impactCategory: 'Healthcare', location: 'Birmingham, UK', ukGifts: 3, overseasGifts: 2, assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'Evelyn Partners', accountManager: 'Charlotte Pemberton', giftEligible: true, donorCount: 3 },
  { id: 'p22', name: 'Oliver Radcliffe', stage: 'Lead', dafSize: 750000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'Low', sourceActivity: 'Webinar - Philanthropy 101', followUpStatus: 'On Track', referredBy: 'Webinar', referringFirm: '', relationshipManager: 'Rachel Whitfield', bdPointOfContact: 'Unassigned', dateEnteredPipeline: '2026-03-08', lastContact: '2026-03-08', nextFollowUp: '2026-03-22', notes: 'Young tech entrepreneur. Attended webinar, asked questions.', daysInPipeline: 2, impactCategory: 'International Development', location: 'London, UK', assetTypes: ['Cash'], hasInvestmentAccount: false, giftEligible: true, donorCount: 1 },
];

const firms: Firm[] = [
  { id: 'f1', name: 'Goldman Sachs', type: 'Investment Manager', status: 'Active', relationshipStatus: 'Active', offices: ['London', 'New York'], lastInteraction: '2026-03-06', relationshipStart: '2022-04-15', contactCount: 4, referralCount: 6, personalNotes: 'Key strategic partner. Patricia Gresham is primary contact.', totalAUM: 28500000, keyContactName: 'Patricia Gresham', keyContactTitle: 'Managing Director, Private Wealth', advisors: [
    { name: 'Patricia Gresham', title: 'Managing Director, Private Wealth', email: 'p.gresham@goldmansachs.co.uk', phone: '+44 20 7774 1001', lastContact: '2026-03-06' },
    { name: 'Andrew Whitfield', title: 'Vice President, Philanthropy', email: 'a.whitfield@goldmansachs.co.uk', phone: '+44 20 7774 1002', lastContact: '2026-02-20' },
    { name: 'Laura Chen-Martin', title: 'Associate, Private Wealth', email: 'l.chenmartin@goldmansachs.co.uk', lastContact: '2026-02-15' },
    { name: 'Daniel Hargreaves', title: 'Director, Client Advisory', email: 'd.hargreaves@goldmansachs.co.uk', phone: '+44 20 7774 1004', lastContact: '2026-01-28' },
  ] },
  { id: 'f2', name: 'Schroders', type: 'Investment Manager', status: 'Active', relationshipStatus: 'Active', offices: ['London'], lastInteraction: '2026-03-01', relationshipStart: '2021-09-10', contactCount: 3, referralCount: 4, personalNotes: 'Strong relationship through Marcus Thornley. Annual charity lunch.', totalAUM: 15200000, keyContactName: 'Marcus Thornley', keyContactTitle: 'Head of Charity Investments', advisors: [
    { name: 'Marcus Thornley', title: 'Head of Charity Investments', email: 'm.thornley@schroders.co.uk', phone: '+44 20 7658 3001', lastContact: '2026-03-01' },
    { name: 'Sophie Lancaster', title: 'Investment Director', email: 's.lancaster@schroders.co.uk', phone: '+44 20 7658 3002', lastContact: '2026-02-14' },
    { name: 'George Atkinson', title: 'Client Relationship Manager', email: 'g.atkinson@schroders.co.uk', lastContact: '2026-02-28' },
  ] },
  { id: 'f3', name: 'Evelyn Partners', type: 'Wealth Advisor', status: 'Active', relationshipStatus: 'Secured', offices: ['London', 'Birmingham', 'Manchester'], lastInteraction: '2026-03-05', relationshipStart: '2023-01-20', contactCount: 5, referralCount: 8, personalNotes: 'Most active referral source. Charlotte Pemberton championing internally.', totalAUM: 22300000, keyContactName: 'Charlotte Pemberton', keyContactTitle: 'Director of Philanthropy', advisors: [
    { name: 'Charlotte Pemberton', title: 'Director of Philanthropy', email: 'c.pemberton@evelynpartners.co.uk', phone: '+44 20 7189 2001', lastContact: '2026-03-05' },
    { name: 'William Radcliffe', title: 'Head of Wealth Planning', email: 'w.radcliffe@evelynpartners.co.uk', phone: '+44 20 7189 2002', lastContact: '2026-02-22' },
    { name: 'Emma Sinclair', title: 'Senior Wealth Manager', email: 'e.sinclair@evelynpartners.co.uk', lastContact: '2026-03-01' },
    { name: 'Jonathan Hale', title: 'Wealth Manager, Birmingham', email: 'j.hale@evelynpartners.co.uk', phone: '+44 121 236 4001', lastContact: '2026-02-10' },
    { name: 'Natasha Bridges', title: 'Wealth Manager, Manchester', email: 'n.bridges@evelynpartners.co.uk', lastContact: '2026-01-30' },
  ] },
  { id: 'f4', name: 'Coutts', type: 'Wealth Advisor', status: 'Active', relationshipStatus: 'Secured', offices: ['London'], lastInteraction: '2026-03-09', relationshipStart: '2020-06-01', contactCount: 3, referralCount: 5, personalNotes: 'Longest standing partner. Royal warrant holder.', totalAUM: 19800000, keyContactName: 'Victoria Haversham', keyContactTitle: 'Head of Private Clients', advisors: [
    { name: 'Victoria Haversham', title: 'Head of Private Clients', email: 'v.haversham@coutts.co.uk', phone: '+44 20 7957 2001', lastContact: '2026-03-09' },
    { name: 'James Hartington', title: 'Senior Philanthropy Advisor', email: 'j.hartington@coutts.co.uk', phone: '+44 20 7957 2002', lastContact: '2026-02-20' },
    { name: 'Arabella Fitzgerald', title: 'Private Banker', email: 'a.fitzgerald@coutts.co.uk', lastContact: '2026-03-04' },
  ] },
  { id: 'f5', name: 'Cazenove Capital', type: 'Investment Manager', status: 'Active', relationshipStatus: 'Active', offices: ['London'], lastInteraction: '2026-03-04', relationshipStart: '2023-06-15', contactCount: 2, referralCount: 3, personalNotes: 'Edward Langley refers UHNW clients. Quality over quantity.', totalAUM: 32100000, keyContactName: 'Edward Langley', keyContactTitle: 'Senior Investment Manager', advisors: [
    { name: 'Edward Langley', title: 'Senior Investment Manager', email: 'e.langley@cazenove.co.uk', phone: '+44 20 7658 4001', lastContact: '2026-03-04' },
    { name: 'Penelope Stratton', title: 'Client Director', email: 'p.stratton@cazenove.co.uk', phone: '+44 20 7658 4002', lastContact: '2026-02-18' },
  ] },
  { id: 'f6', name: 'JM Finn', type: 'Investment Manager', status: 'Active', relationshipStatus: 'Active', offices: ['London', 'Bristol', 'Leeds'], lastInteraction: '2026-03-07', relationshipStart: '2022-11-01', contactCount: 4, referralCount: 5, personalNotes: 'Thomas Barrington keen to grow partnership. Regional offices useful.', totalAUM: 12400000, keyContactName: 'Thomas Barrington', keyContactTitle: 'Partner', advisors: [
    { name: 'Thomas Barrington', title: 'Partner', email: 't.barrington@jmfinn.co.uk', phone: '+44 20 7600 1001', lastContact: '2026-03-07' },
    { name: 'Harriet Wellesley', title: 'Investment Manager', email: 'h.wellesley@jmfinn.co.uk', lastContact: '2026-02-25' },
    { name: 'Michael Sutherland', title: 'Investment Manager, Bristol', email: 'm.sutherland@jmfinn.co.uk', phone: '+44 117 930 2001', lastContact: '2026-02-12' },
    { name: 'Claire Dunbar', title: 'Client Relations, Leeds', email: 'c.dunbar@jmfinn.co.uk', lastContact: '2026-01-20' },
  ] },
  { id: 'f7', name: 'Rathbones', type: 'Investment Manager', status: 'Active', relationshipStatus: 'Active', offices: ['London', 'Edinburgh', 'Liverpool'], lastInteraction: '2026-03-08', relationshipStart: '2021-03-15', contactCount: 3, referralCount: 3, personalNotes: 'Henry Ashmore is key contact. Charity specialist team engaged.', totalAUM: 18700000, keyContactName: 'Henry Ashmore', keyContactTitle: 'Head of Charities', advisors: [
    { name: 'Henry Ashmore', title: 'Head of Charities', email: 'h.ashmore@rathbones.co.uk', phone: '+44 20 7399 0001', lastContact: '2026-03-08' },
    { name: 'Fiona MacLeod', title: 'Investment Director, Edinburgh', email: 'f.macleod@rathbones.co.uk', phone: '+44 131 523 8001', lastContact: '2026-02-22' },
    { name: 'Robert Cartwright', title: 'Charity Investment Manager', email: 'r.cartwright@rathbones.co.uk', lastContact: '2026-03-01' },
  ] },
  { id: 'f8', name: 'Withers LLP', type: 'Law Firm', status: 'Active', relationshipStatus: 'Active', offices: ['London', 'Geneva', 'Hong Kong'], lastInteraction: '2026-03-06', relationshipStart: '2022-08-01', contactCount: 3, referralCount: 4, personalNotes: 'Private client team refers HNW individuals. Sarah Pemberton is champion.', totalAUM: 0, keyContactName: 'Sarah Pemberton', keyContactTitle: 'Partner, Private Client', advisors: [
    { name: 'Sarah Pemberton', title: 'Partner, Private Client', email: 's.pemberton@withersworldwide.co.uk', phone: '+44 20 7597 6001', lastContact: '2026-03-06' },
    { name: 'Nicholas Cavendish', title: 'Senior Associate, Charities', email: 'n.cavendish@withersworldwide.co.uk', phone: '+44 20 7597 6002', lastContact: '2026-02-15' },
    { name: 'Isabelle Grant', title: 'Associate, Tax & Estate Planning', email: 'i.grant@withersworldwide.co.uk', lastContact: '2026-02-28' },
  ] },
  { id: 'f9', name: 'Deloitte Private', type: 'Accountancy', status: 'Nurturing', relationshipStatus: 'Nurturing', offices: ['London', 'Manchester'], lastInteraction: '2026-02-15', relationshipStart: '2024-05-10', contactCount: 2, referralCount: 1, personalNotes: 'Tax planning referrals. Need to schedule L&L with wider team.', totalAUM: 4200000, keyContactName: 'James Whitfield', keyContactTitle: 'Tax Director', advisors: [
    { name: 'James Whitfield', title: 'Tax Director', email: 'j.whitfield@deloitte.co.uk', phone: '+44 20 7303 7001', lastContact: '2026-02-15' },
    { name: 'Rachel Fortescue', title: 'Senior Manager, Private Client', email: 'r.fortescue@deloitte.co.uk', lastContact: '2026-01-22' },
  ] },
  { id: 'f10', name: 'BDO', type: 'Accountancy', status: 'Nurturing', relationshipStatus: 'Nurturing', offices: ['London'], lastInteraction: '2026-01-28', relationshipStart: '2024-09-01', contactCount: 2, referralCount: 0, personalNotes: 'Had initial meeting. Need to follow up with case studies.', totalAUM: 0, keyContactName: 'Rebecca Collins', keyContactTitle: 'Senior Manager, Private Client', advisors: [
    { name: 'Rebecca Collins', title: 'Senior Manager, Private Client', email: 'r.collins@bdo.co.uk', phone: '+44 20 7486 5888', lastContact: '2026-01-28' },
    { name: 'Stuart Ambrose', title: 'Tax Partner', email: 's.ambrose@bdo.co.uk', lastContact: '2026-01-10' },
  ] },
  { id: 'f11', name: 'Stonehage Fleming', type: 'Family Office', status: 'Active', relationshipStatus: 'Active', offices: ['London', 'Jersey', 'Zurich'], lastInteraction: '2026-02-25', relationshipStart: '2023-03-01', contactCount: 3, referralCount: 2, personalNotes: 'Multi-family office. Interested in collective fund structures.', totalAUM: 8900000, keyContactName: 'Alexander Montague', keyContactTitle: 'Director, Family Office', advisors: [
    { name: 'Alexander Montague', title: 'Director, Family Office', email: 'a.montague@stonehagefleming.co.uk', phone: '+44 20 7087 0001', lastContact: '2026-02-25' },
    { name: 'Fiona Campbell', title: 'Senior Wealth Advisor', email: 'f.campbell@stonehagefleming.co.uk', phone: '+44 20 7087 0002', lastContact: '2026-02-10' },
    { name: 'Hugo Beauchamp', title: 'Investment Analyst', email: 'h.beauchamp@stonehagefleming.co.uk', lastContact: '2026-01-30' },
  ] },
  { id: 'f12', name: 'Philanthropy Impact', type: 'Philanthropy Advisor', status: 'Active', relationshipStatus: 'Active', offices: ['London'], lastInteraction: '2026-03-03', relationshipStart: '2021-01-01', contactCount: 2, referralCount: 3, personalNotes: 'Industry body. Good for events and thought leadership.', totalAUM: 0, keyContactName: 'Diana Hartwell', keyContactTitle: 'Chief Executive', advisors: [
    { name: 'Diana Hartwell', title: 'Chief Executive', email: 'd.hartwell@philanthropyimpact.org', phone: '+44 20 3752 8001', lastContact: '2026-03-03' },
    { name: 'Martin Ashby', title: 'Head of Partnerships', email: 'm.ashby@philanthropyimpact.org', lastContact: '2026-02-18' },
  ] },
  { id: 'f13', name: 'Charles Russell Speechlys', type: 'Law Firm', status: 'Nurturing', relationshipStatus: 'Nurturing', offices: ['London', 'Cheltenham', 'Guildford'], lastInteraction: '2026-02-10', relationshipStart: '2024-11-01', contactCount: 1, referralCount: 0, personalNotes: 'Initial meeting positive. Follow up with charity team.', totalAUM: 0, keyContactName: 'Oliver Whitmore', keyContactTitle: 'Partner, Charities', advisors: [
    { name: 'Oliver Whitmore', title: 'Partner, Charities', email: 'o.whitmore@crsblaw.co.uk', phone: '+44 20 7427 6001', lastContact: '2026-02-10' },
  ] },
  { id: 'f14', name: 'KPMG Private Enterprise', type: 'Accountancy', status: 'Inactive', relationshipStatus: 'Cold', offices: ['London'], lastInteraction: '2025-08-20', relationshipStart: '2024-02-01', contactCount: 1, referralCount: 0, personalNotes: 'Initial contact went cold. Revisit in Q3.', totalAUM: 0, keyContactName: 'Simon Fletcher', keyContactTitle: 'Director', advisors: [
    { name: 'Simon Fletcher', title: 'Director', email: 's.fletcher@kpmg.co.uk', phone: '+44 20 7311 1001', lastContact: '2025-08-20' },
  ] },
  { id: 'f15', name: 'Sandaire', type: 'Family Office', status: 'Nurturing', relationshipStatus: 'Nurturing', offices: ['London', 'Edinburgh'], lastInteraction: '2026-02-18', relationshipStart: '2024-07-01', contactCount: 2, referralCount: 1, personalNotes: 'Multi-family office focused on impact investing.', totalAUM: 3500000, keyContactName: 'Catherine Blackwood', keyContactTitle: 'Investment Director', advisors: [
    { name: 'Catherine Blackwood', title: 'Investment Director', email: 'c.blackwood@sandaire.co.uk', phone: '+44 20 7389 4001', lastContact: '2026-02-18' },
    { name: 'Douglas Elliot', title: 'Senior Wealth Planner', email: 'd.elliot@sandaire.co.uk', lastContact: '2026-01-25' },
  ] },
  { id: 'f16', name: 'Brewin Dolphin', type: 'Investment Manager', status: 'Active', relationshipStatus: 'Active', offices: ['London', 'Oxford', 'Belfast'], lastInteraction: '2026-02-28', relationshipStart: '2023-09-15', contactCount: 3, referralCount: 2, personalNotes: 'Good relationship with charity team. Quarterly catch-ups.', totalAUM: 7600000, keyContactName: 'Richard Fairweather', keyContactTitle: 'Head of Charity Team', advisors: [
    { name: 'Richard Fairweather', title: 'Head of Charity Team', email: 'r.fairweather@brewin.co.uk', phone: '+44 20 7248 4001', lastContact: '2026-02-28' },
    { name: 'Alice Thornton', title: 'Investment Manager, Oxford', email: 'a.thornton@brewin.co.uk', phone: '+44 1865 720 001', lastContact: '2026-02-15' },
    { name: 'Patrick O\'Donnell', title: 'Investment Manager, Belfast', email: 'p.odonnell@brewin.co.uk', lastContact: '2026-02-05' },
  ] },
];

const contacts: Contact[] = [
  { id: 'c1', name: 'Patricia Gresham', category: 'Intermediary', email: 'p.gresham@example.com', phone: '+44 20 7946 3817', firmName: 'Goldman Sachs', source: 'Industry event', followUpStatus: 'On Track', lastContactDate: '2026-03-06', nextFollowUp: '2026-04-06', notes: 'Key referral source. Quarterly dinners.', contactFrequencyDays: 90, nextReminderDate: '2026-06-04', tags: ['Key Decision Maker', 'Invite to Event'] },
  { id: 'c2', name: 'Marcus Thornley', category: 'Investment Manager', email: 'm.thornley@example.com', phone: '+44 20 7946 5294', firmName: 'Schroders', source: 'Direct outreach', followUpStatus: 'On Track', lastContactDate: '2026-03-01', nextFollowUp: '2026-03-28', notes: 'Charity specialist. Refers HNW clients with philanthropic interests.', contactFrequencyDays: 30, nextReminderDate: '2026-03-31', tags: ['Add to Mailing List', 'MailChimp'] },
  { id: 'c3', name: 'Charlotte Pemberton', category: 'Intermediary', email: 'c.pemberton@example.com', phone: '+44 20 7946 6138', firmName: 'Evelyn Partners', source: 'Conference', followUpStatus: 'On Track', lastContactDate: '2026-03-05', nextFollowUp: '2026-03-19', notes: 'Most prolific referrer. Internal champion.', contactFrequencyDays: 30, nextReminderDate: '2026-04-04', tags: ['VIP', 'Key Decision Maker', 'Events Gaslight'] },
  { id: 'c4', name: 'James Hartington', category: 'Intermediary', email: 'j.hartington@example.com', phone: '+44 20 7946 7421', firmName: 'Coutts', source: 'Existing relationship', followUpStatus: 'Due', lastContactDate: '2026-02-20', nextFollowUp: '2026-03-10', notes: 'Senior partner at Coutts philanthropy desk.', contactFrequencyDays: 30, nextReminderDate: '2026-03-22', tags: ['Key Decision Maker', 'Invite to Event'] },
  { id: 'c5', name: 'Edward Langley', category: 'Investment Manager', email: 'e.langley@example.com', phone: '+44 20 7946 2053', firmName: 'Cazenove Capital', source: 'Direct', followUpStatus: 'On Track', lastContactDate: '2026-03-04', nextFollowUp: '2026-03-25', notes: 'UHNW referrals. Selective but high quality.', contactFrequencyDays: 60, nextReminderDate: '2026-05-03', tags: ['VIP', 'Add to Mailing List'] },
  { id: 'c6', name: 'Thomas Barrington', category: 'Investment Manager', email: 't.barrington@example.com', phone: '+44 20 7946 4762', firmName: 'JM Finn', source: 'Industry event', followUpStatus: 'Overdue', lastContactDate: '2026-02-10', nextFollowUp: '2026-03-03', notes: 'Keen to grow partnership. Needs updated materials.', contactFrequencyDays: 30, nextReminderDate: '2026-03-12', tags: ['Add to Mailing List', 'MailChimp', 'Invite to Event'] },
  { id: 'c7', name: 'Henry Ashmore', category: 'Intermediary', email: 'h.ashmore@example.com', phone: '+44 20 7946 8305', firmName: 'Rathbones', source: 'Conference', followUpStatus: 'On Track', lastContactDate: '2026-03-08', nextFollowUp: '2026-03-29', notes: 'Charity team lead. Regional connections.', contactFrequencyDays: 60, nextReminderDate: '2026-05-07', tags: ['Events Gaslight', 'Add to Mailing List'] },
  { id: 'c8', name: 'Sarah Pemberton', category: 'Lawyer', email: 's.pemberton@example.com', phone: '+44 20 7946 1679', firmName: 'Withers LLP', source: 'STEP event', followUpStatus: 'On Track', lastContactDate: '2026-03-06', nextFollowUp: '2026-04-06', notes: 'Private client lawyer. Charity and philanthropy specialist.', contactFrequencyDays: 60, nextReminderDate: '2026-05-05', tags: ['Invite to Event', 'MailChimp'] },
  { id: 'c9', name: 'Lord Ashford', category: 'Potential Donor', email: 'l.ashford@example.com', phone: '+44 20 7946 9241', firmName: '', source: 'Lunch & Learn', followUpStatus: 'On Track', lastContactDate: '2026-03-04', nextFollowUp: '2026-03-14', notes: 'Environmental focus. Fee proposal stage.', contactFrequencyDays: 30, nextReminderDate: '2026-04-03', tags: ['VIP', 'New Contact'] },
  { id: 'c10', name: 'Elizabeth Park-Wilson', category: 'Potential Donor', email: 'e.parkwilson@example.com', phone: '+44 20 7946 3584', firmName: '', source: 'JM Finn referral', followUpStatus: 'On Track', lastContactDate: '2026-03-07', nextFollowUp: '2026-03-12', notes: 'Contract stage. Solicitor reviewing.', contactFrequencyDays: 30, nextReminderDate: '2026-04-06', tags: ['New Contact'] },
  { id: 'c11', name: 'Helena Cavendish-Hale', category: 'Donor', email: 'h.cavendishhale@example.com', phone: '+44 20 7946 6702', firmName: '', source: 'Goldman Sachs referral', followUpStatus: 'On Track', lastContactDate: '2026-02-28', nextFollowUp: '2026-03-28', notes: 'Active client. US/UK dual giving. Second tranche received.', contactFrequencyDays: 60, nextReminderDate: '2026-04-29', tags: ['VIP', 'Key Decision Maker', 'Events Gaslight'] },
  { id: 'c12', name: 'David Ashworth', category: 'Accountant', email: 'd.ashworth@example.com', phone: '+44 20 7946 4918', firmName: 'Deloitte Private', source: 'Tax event', followUpStatus: 'Overdue', lastContactDate: '2026-02-01', nextFollowUp: '2026-02-28', notes: 'Need to send case studies for tax planning clients.', contactFrequencyDays: 60, nextReminderDate: '2026-04-02', tags: ['Add to Mailing List'] },
  { id: 'c13', name: 'Fiona Campbell', category: 'Intermediary', email: 'f.campbell@example.com', phone: '+44 20 7946 7536', firmName: 'Stonehage Fleming', source: 'Family office network', followUpStatus: 'On Track', lastContactDate: '2026-02-25', nextFollowUp: '2026-03-25', notes: 'Interested in CF structures for their families.', contactFrequencyDays: 30, nextReminderDate: '2026-03-27', tags: ['Invite to Event', 'Events Gaslight'] },
  { id: 'c14', name: 'Catherine Beaumont', category: 'Donor', email: 'c.beaumont@example.com', phone: '+44 20 7946 2847', firmName: '', source: 'Schroders referral', followUpStatus: 'On Track', lastContactDate: '2026-03-01', nextFollowUp: '2026-04-01', notes: 'Active client. First grant disbursement made January.', contactFrequencyDays: 90, nextReminderDate: '2026-05-30', tags: ['VIP', 'MailChimp'] },
  { id: 'c15', name: 'Professor Diana Ellsworth', category: 'Donor', email: 'd.ellsworth@example.com', phone: '+44 20 7946 0362', firmName: '', source: 'JM Finn referral', followUpStatus: 'On Track', lastContactDate: '2026-03-02', nextFollowUp: '2026-04-02', notes: 'Science and research focus. Annual review scheduled April.', contactFrequencyDays: 90, nextReminderDate: '2026-05-31', tags: ['Add to Mailing List', 'Invite to Event'] },
  { id: 'c16', name: 'Peter Worthington', category: 'Potential Donor', email: 'p.worthington@example.com', phone: '+44 20 7946 5183', firmName: 'Worthington Family Office', source: 'Evelyn Partners referral', followUpStatus: 'On Track', lastContactDate: '2026-03-05', nextFollowUp: '2026-03-13', notes: 'Family office principal. CF with ESG mandate.', contactFrequencyDays: 30, nextReminderDate: '2026-04-04', tags: ['New Contact', 'Key Decision Maker'] },
];

const clientAccounts: ClientAccount[] = [
  { id: 'ca1', name: 'Cavendish-Hale Foundation Fund', accountNumber: 'DAF-2025-0041', accountType: 'DAF', entity: 'PTGF', status: 'Active', cashBalance: 380000, investmentBalance: 3620000, offshoreBalance: 200000, totalValue: 4200000, ytdReturn: 7.2, relationshipManager: 'James Prescott', onboardedDate: '2025-05-15', impactCategory: 'Healthcare', location: 'London, UK', ukGifts: 6, overseasGifts: 3, assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'Goldman Sachs', accountManager: 'Patricia Gresham', giftEligible: true, donorCount: 1 },
  { id: 'ca2', name: 'Beaumont Charitable Fund', accountNumber: 'DAF-2025-0055', accountType: 'DAF', entity: 'PTGF', status: 'Active', cashBalance: 150000, investmentBalance: 1820000, offshoreBalance: 0, totalValue: 1970000, ytdReturn: 5.8, relationshipManager: 'Victoria Langley', onboardedDate: '2025-08-20', impactCategory: 'Healthcare', location: 'London, UK', ukGifts: 4, overseasGifts: 0, assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'Schroders', accountManager: 'Marcus Thornley', giftEligible: true, donorCount: 1 },
  { id: 'ca3', name: 'Ellsworth Research Fund', accountNumber: 'DAF-2025-0063', accountType: 'DAF', entity: 'PTGF', status: 'Active', cashBalance: 95000, investmentBalance: 845000, offshoreBalance: 0, totalValue: 940000, ytdReturn: 6.1, relationshipManager: 'Rachel Whitfield', onboardedDate: '2025-07-10', impactCategory: 'Education', location: 'Oxford, UK', ukGifts: 5, overseasGifts: 1, assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'JM Finn', accountManager: 'Thomas Barrington', giftEligible: true, donorCount: 1 },
  { id: 'ca4', name: 'Ashworth Arts & Heritage Fund', accountNumber: 'DAF-2025-0071', accountType: 'DAF', entity: 'PTGF', status: 'Active', cashBalance: 220000, investmentBalance: 1480000, offshoreBalance: 0, totalValue: 1700000, ytdReturn: 4.9, relationshipManager: 'Rachel Whitfield', onboardedDate: '2025-10-01', impactCategory: 'Arts & Culture', location: 'London, UK', ukGifts: 7, overseasGifts: 0, assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'Coutts', accountManager: 'James Hartington', giftEligible: true, donorCount: 1 },
  { id: 'ca5', name: 'Kensington Collective Fund', accountNumber: 'CF-2024-0012', accountType: 'Collective Fund', entity: 'TPCT', status: 'Active', cashBalance: 1200000, investmentBalance: 8500000, offshoreBalance: 2300000, totalValue: 12000000, ytdReturn: 8.4, relationshipManager: 'Victoria Langley', onboardedDate: '2024-03-01', impactCategory: 'Social Welfare', location: 'London, UK', ukGifts: 12, overseasGifts: 5, assetTypes: ['Cash', 'Shares', 'Property'], hasInvestmentAccount: true, investmentProvider: 'Goldman Sachs', accountManager: 'Patricia Gresham', giftEligible: true, donorCount: 4 },
  { id: 'ca6', name: 'Waverly Education Fund', accountNumber: 'DAF-2026-0003', accountType: 'DAF', entity: 'PTGF', status: 'Pending', cashBalance: 0, investmentBalance: 0, offshoreBalance: 0, totalValue: 0, ytdReturn: 0, relationshipManager: 'Rachel Whitfield', onboardedDate: '2026-02-28', impactCategory: 'Education', location: 'Cambridge, UK', assetTypes: ['Cash'], hasInvestmentAccount: false, giftEligible: true, donorCount: 1 },
  { id: 'ca7', name: 'Hartwell Environmental Trust', accountNumber: 'DAF-2026-0005', accountType: 'DAF', entity: 'PTGF', status: 'Pending', cashBalance: 0, investmentBalance: 0, offshoreBalance: 0, totalValue: 0, ytdReturn: 0, relationshipManager: 'Sophie Merrick', onboardedDate: '2026-03-01', impactCategory: 'Environment', location: 'Edinburgh, UK', assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'Rathbones', accountManager: 'Henry Ashmore', giftEligible: true, donorCount: 1 },
  { id: 'ca8', name: 'Westminster Giving Fund', accountNumber: 'CF-2023-0008', accountType: 'Collective Fund', entity: 'TPCT', status: 'Active', cashBalance: 850000, investmentBalance: 6200000, offshoreBalance: 1450000, totalValue: 8500000, ytdReturn: 7.8, relationshipManager: 'James Prescott', onboardedDate: '2023-06-15', impactCategory: 'Healthcare', location: 'London, UK', ukGifts: 9, overseasGifts: 4, assetTypes: ['Cash', 'Shares', 'Property'], hasInvestmentAccount: true, investmentProvider: 'Rathbones', accountManager: 'Trust Committee', giftEligible: true, donorCount: 6 },
  { id: 'ca9', name: 'Mercer Livery Fund', accountNumber: 'DAF-2026-0007', accountType: 'DAF', entity: 'PTGF', status: 'Pending', cashBalance: 0, investmentBalance: 0, offshoreBalance: 0, totalValue: 0, ytdReturn: 0, relationshipManager: 'Rachel Whitfield', onboardedDate: '2026-03-05', impactCategory: 'Religious', location: 'London, UK', assetTypes: ['Cash'], hasInvestmentAccount: false, giftEligible: true, donorCount: 1 },
  { id: 'ca10', name: 'Thornbury Impact Fund', accountNumber: 'CF-2024-0018', accountType: 'Collective Fund', entity: 'TPCT', status: 'Active', cashBalance: 420000, investmentBalance: 3100000, offshoreBalance: 680000, totalValue: 4200000, ytdReturn: 6.5, relationshipManager: 'Sophie Merrick', onboardedDate: '2024-09-01', impactCategory: 'Social Welfare', location: 'Manchester, UK', ukGifts: 6, overseasGifts: 2, assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'Brewin Dolphin', accountManager: 'Fund Committee', giftEligible: true, donorCount: 5 },
  { id: 'ca11', name: 'Ashford Legacy Fund', accountNumber: 'DAF-2024-0029', accountType: 'DAF', entity: 'PAL', status: 'Active', cashBalance: 180000, investmentBalance: 2300000, offshoreBalance: 0, totalValue: 2480000, ytdReturn: 5.3, relationshipManager: 'Victoria Langley', onboardedDate: '2024-05-20', impactCategory: 'Environment', location: 'London, UK', ukGifts: 3, overseasGifts: 0, assetTypes: ['Cash', 'Shares'], hasInvestmentAccount: true, investmentProvider: 'Cazenove Capital', accountManager: 'Edward Langley', giftEligible: true, donorCount: 1 },
  { id: 'ca12', name: 'Penrose Wealth CF', accountNumber: 'CF-2025-0022', accountType: 'Collective Fund', entity: 'TPCT', status: 'Active', cashBalance: 600000, investmentBalance: 4800000, offshoreBalance: 900000, totalValue: 6300000, ytdReturn: 7.1, relationshipManager: 'Victoria Langley', onboardedDate: '2025-01-10', impactCategory: 'International Development', location: 'London, UK', ukGifts: 4, overseasGifts: 5, assetTypes: ['Cash', 'Shares', 'Property'], hasInvestmentAccount: true, investmentProvider: 'Brewin Dolphin', accountManager: 'Fund Manager', giftEligible: true, donorCount: 8 },
  { id: 'ca13', name: 'Brighton Community Fund', accountNumber: 'CF-2023-0005', accountType: 'Collective Fund', entity: 'Foundation', status: 'Closed', cashBalance: 0, investmentBalance: 0, offshoreBalance: 0, totalValue: 0, ytdReturn: 0, relationshipManager: 'James Prescott', onboardedDate: '2023-02-01', impactCategory: 'Social Welfare', location: 'Brighton, UK', ukGifts: 2, overseasGifts: 0, assetTypes: ['Cash'], hasInvestmentAccount: false, giftEligible: false, donorCount: 3 },
];

const adminGrants: AdminGrant[] = [
  { id: 'g1', grantName: 'Annual Support Grant', charity: 'NSPCC', charityNumber: '216401', amount: 250000, stage: 'Paid', issueArea: 'Children & Young People', priority: 'High', ddStatus: 'Complete', clientAccount: 'Cavendish-Hale Foundation Fund', requestedBy: 'Helena Cavendish-Hale', dateRequested: '2026-01-10', daysInStage: 0 },
  { id: 'g2', grantName: 'Restoration Fund', charity: 'Tate Foundation', charityNumber: '1085314', amount: 175000, stage: 'Approved', issueArea: 'Arts & Culture', priority: 'Medium', ddStatus: 'Complete', clientAccount: 'Ashworth Arts & Heritage Fund', requestedBy: 'Lady Sophia Ashworth', dateRequested: '2026-02-01', daysInStage: 14 },
  { id: 'g3', grantName: 'Research Programme Grant', charity: 'British Heart Foundation', charityNumber: '225971', amount: 500000, stage: 'In Review', issueArea: 'Health & Medical', priority: 'High', ddStatus: 'Complete', clientAccount: 'Westminster Giving Fund', requestedBy: 'Trust Committee', dateRequested: '2026-02-15', daysInStage: 23 },
  { id: 'g4', grantName: 'Conservation Programme', charity: 'WWF UK', charityNumber: '1081247', amount: 350000, stage: 'Paid', issueArea: 'Environment', priority: 'High', ddStatus: 'Complete', clientAccount: 'Cavendish-Hale Foundation Fund', requestedBy: 'Helena Cavendish-Hale', dateRequested: '2025-06-01', daysInStage: 0 },
  { id: 'g5', grantName: 'Performance Season Support', charity: 'Royal Opera House', charityNumber: '211775', amount: 120000, stage: 'Awaiting Bank Statement', issueArea: 'Arts & Culture', priority: 'Medium', ddStatus: 'In Progress', clientAccount: 'Ashworth Arts & Heritage Fund', requestedBy: 'Lady Sophia Ashworth', dateRequested: '2026-02-20', daysInStage: 18 },
  { id: 'g6', grantName: 'Scholarships Fund', charity: 'Eton College Foundation', charityNumber: '1139086', amount: 200000, stage: 'Approved', issueArea: 'Education', priority: 'Medium', ddStatus: 'Complete', clientAccount: 'Ellsworth Research Fund', requestedBy: 'Professor Diana Ellsworth', dateRequested: '2026-01-20', daysInStage: 21 },
  { id: 'g7', grantName: 'Emergency Relief Fund', charity: 'British Red Cross', charityNumber: '220949', amount: 100000, stage: 'Paid', issueArea: 'Humanitarian', priority: 'High', ddStatus: 'Complete', clientAccount: 'Beaumont Charitable Fund', requestedBy: 'Catherine Beaumont', dateRequested: '2026-01-05', daysInStage: 0 },
  { id: 'g8', grantName: 'Community Kitchen', charity: 'The Felix Project', charityNumber: '1168183', amount: 45000, stage: 'First Contact', issueArea: 'Poverty & Food', priority: 'Low', ddStatus: 'Pending', clientAccount: 'Thornbury Impact Fund', requestedBy: 'Fund Committee', dateRequested: '2026-03-01', daysInStage: 9 },
  { id: 'g9', grantName: 'Mental Health Programme', charity: 'Mind', charityNumber: '219830', amount: 280000, stage: 'In Review', issueArea: 'Health & Medical', priority: 'High', ddStatus: 'In Progress', clientAccount: 'Ashford Legacy Fund', requestedBy: 'Trust Manager', dateRequested: '2026-02-10', daysInStage: 28 },
  { id: 'g10', grantName: 'Literacy Programme', charity: 'National Literacy Trust', charityNumber: '1116260', amount: 85000, stage: 'Requested', issueArea: 'Education', priority: 'Medium', ddStatus: 'Not Started', clientAccount: 'Ellsworth Research Fund', requestedBy: 'Professor Diana Ellsworth', dateRequested: '2026-03-05', daysInStage: 5 },
  { id: 'g11', grantName: 'Ocean Conservation', charity: 'Marine Conservation Society', charityNumber: '1004005', amount: 150000, stage: 'Approved', issueArea: 'Environment', priority: 'Medium', ddStatus: 'Complete', clientAccount: 'Penrose Wealth CF', requestedBy: 'Fund Committee', dateRequested: '2026-01-25', daysInStage: 18 },
  { id: 'g12', grantName: 'Youth Orchestra Support', charity: 'National Youth Orchestra', charityNumber: '263878', amount: 60000, stage: 'Paid', issueArea: 'Arts & Culture', priority: 'Low', ddStatus: 'Complete', clientAccount: 'Ashworth Arts & Heritage Fund', requestedBy: 'Lady Sophia Ashworth', dateRequested: '2025-03-15', daysInStage: 0 },
  { id: 'g13', grantName: 'Homelessness Prevention', charity: 'Shelter', charityNumber: '263710', amount: 190000, stage: 'In Review', issueArea: 'Housing', priority: 'High', ddStatus: 'Complete', clientAccount: 'Thornbury Impact Fund', requestedBy: 'Fund Committee', dateRequested: '2026-02-05', daysInStage: 33 },
  { id: 'g14', grantName: 'Reforestation Project', charity: 'Woodland Trust', charityNumber: '294344', amount: 95000, stage: 'First Contact', issueArea: 'Environment', priority: 'Medium', ddStatus: 'Not Started', clientAccount: 'Beaumont Charitable Fund', requestedBy: 'Catherine Beaumont', dateRequested: '2026-03-03', daysInStage: 7 },
  { id: 'g15', grantName: 'Cancer Research Grant', charity: 'Cancer Research UK', charityNumber: '1089464', amount: 400000, stage: 'Requested', issueArea: 'Health & Medical', priority: 'High', ddStatus: 'Not Started', clientAccount: 'Kensington Collective Fund', requestedBy: 'Trust Committee', dateRequested: '2026-03-08', daysInStage: 2 },
  { id: 'g16', grantName: 'Museum Acquisition Fund', charity: 'Victoria & Albert Museum', charityNumber: '312058', amount: 75000, stage: 'Declined', issueArea: 'Arts & Culture', priority: 'Low', ddStatus: 'Failed', clientAccount: 'Ashworth Arts & Heritage Fund', requestedBy: 'Lady Sophia Ashworth', dateRequested: '2026-01-15', daysInStage: 54 },
];

const bdActivities: BDActivity[] = [
  { id: 'a1', activity: 'Philanthropy Tax Planning Lunch & Learn', type: 'Lunch & Learn', date: '2026-02-12', status: 'Completed', firmName: 'Evelyn Partners', cost: 2800, location: 'The Ivy, London', prospectsGenerated: 3, attendeeCount: 14 },
  { id: 'a2', activity: 'Cazenove Client Event', type: 'Lunch & Learn', date: '2026-01-22', status: 'Completed', firmName: 'Cazenove Capital', cost: 3200, location: 'Cazenove Offices, London', prospectsGenerated: 2, attendeeCount: 8 },
  { id: 'a3', activity: 'STEP Annual Conference', type: 'Conference', date: '2026-02-05', status: 'Completed', firmName: '', cost: 4500, location: 'ICC Birmingham', prospectsGenerated: 4, attendeeCount: 350 },
  { id: 'a4', activity: 'City of London Livery Dinner', type: 'Networking Event', date: '2026-01-30', status: 'Completed', firmName: '', cost: 1800, location: 'Mansion House, London', prospectsGenerated: 1, attendeeCount: 120 },
  { id: 'a5', activity: 'Philanthropy 101 Webinar', type: 'Webinar', date: '2026-03-06', status: 'Completed', firmName: '', cost: 350, location: 'Online', prospectsGenerated: 2, attendeeCount: 45 },
  { id: 'a6', activity: 'Q1 Tax Planning Email Campaign', type: 'Email Campaign', date: '2026-02-20', status: 'Completed', firmName: '', cost: 200, location: 'Digital', prospectsGenerated: 1, attendeeCount: 850 },
  { id: 'a7', activity: 'Rathbones Office Visit', type: 'Office Visit', date: '2026-03-08', status: 'Completed', firmName: 'Rathbones', cost: 150, location: 'Rathbones, London', prospectsGenerated: 0, attendeeCount: 6 },
  { id: 'a8', activity: 'Goldman Sachs L&L', type: 'Lunch & Learn', date: '2026-03-20', status: 'Planned', firmName: 'Goldman Sachs', cost: 3500, location: 'Goldman Sachs, London', prospectsGenerated: 0, attendeeCount: 0 },
  { id: 'a9', activity: 'Philanthropy Impact Conference', type: 'Conference', date: '2026-04-15', status: 'Planned', firmName: '', cost: 5200, location: 'QEII Centre, London', prospectsGenerated: 0, attendeeCount: 0 },
  { id: 'a10', activity: 'JM Finn Bristol Visit', type: 'Office Visit', date: '2026-03-25', status: 'Planned', firmName: 'JM Finn', cost: 400, location: 'JM Finn, Bristol', prospectsGenerated: 0, attendeeCount: 0 },
  { id: 'a11', activity: 'Coutts Partnership Dinner', type: 'Networking Event', date: '2026-04-02', status: 'Planned', firmName: 'Coutts', cost: 2200, location: 'The Connaught, London', prospectsGenerated: 0, attendeeCount: 0 },
  { id: 'a12', activity: 'ESG & Philanthropy Webinar', type: 'Webinar', date: '2026-04-10', status: 'Planned', firmName: '', cost: 350, location: 'Online', prospectsGenerated: 0, attendeeCount: 0 },
];

const quarterlyKPIs: QuarterlyKPIs[] = [
  {
    quarter: 'Q1 2025', meetings: 28, lunchAndLearns: 4, events: 3, newProspects: 12, conversions: 3,
    locationBreakdown: [
      { location: 'London', meetings: 18, lunchAndLearns: 3, events: 2, referrals: 3 },
      { location: 'Edinburgh', meetings: 3, lunchAndLearns: 0, events: 0, referrals: 1 },
      { location: 'Birmingham', meetings: 3, lunchAndLearns: 1, events: 1, referrals: 0 },
      { location: 'Manchester', meetings: 2, lunchAndLearns: 0, events: 0, referrals: 1 },
      { location: 'Leeds', meetings: 1, lunchAndLearns: 0, events: 0, referrals: 0 },
      { location: 'Glasgow', meetings: 1, lunchAndLearns: 0, events: 0, referrals: 0 },
    ],
    conversionRates: {
      meetingsToLunchAndLearns: 14.3, meetingsToReferrals: 17.9, lunchAndLearnsToClients: 25.0, overallMeetingsToClients: 10.7,
      conversionPaths: [
        { firm: 'Stonehage Fleming', path: ['Meeting', 'Lunch & Learn', 'Client'], duration: '3 months' },
        { firm: 'Withers LLP', path: ['Meeting', 'Referral', 'Client'], duration: '4 months' },
        { firm: 'Rathbones', path: ['Meeting', 'Lunch & Learn', 'Referral', 'Client'], duration: '5 months' },
      ],
    },
  },
  {
    quarter: 'Q2 2025', meetings: 35, lunchAndLearns: 5, events: 4, newProspects: 15, conversions: 4,
    locationBreakdown: [
      { location: 'London', meetings: 22, lunchAndLearns: 3, events: 2, referrals: 5 },
      { location: 'Edinburgh', meetings: 4, lunchAndLearns: 1, events: 1, referrals: 1 },
      { location: 'Birmingham', meetings: 3, lunchAndLearns: 0, events: 0, referrals: 1 },
      { location: 'Manchester', meetings: 3, lunchAndLearns: 1, events: 1, referrals: 0 },
      { location: 'Leeds', meetings: 2, lunchAndLearns: 0, events: 0, referrals: 0 },
      { location: 'Glasgow', meetings: 1, lunchAndLearns: 0, events: 0, referrals: 0 },
    ],
    conversionRates: {
      meetingsToLunchAndLearns: 14.3, meetingsToReferrals: 20.0, lunchAndLearnsToClients: 40.0, overallMeetingsToClients: 11.4,
      conversionPaths: [
        { firm: 'Goldman Sachs', path: ['Meeting', 'Referral', 'Client'], duration: '2 months' },
        { firm: 'JM Finn', path: ['Meeting', 'Lunch & Learn', 'Client'], duration: '3 months' },
        { firm: 'Cazenove Capital', path: ['Meeting', 'Lunch & Learn', 'Referral', 'Client'], duration: '4 months' },
        { firm: 'Schroders', path: ['Meeting', 'Referral', 'Client'], duration: '3 months' },
      ],
    },
  },
  {
    quarter: 'Q3 2025', meetings: 22, lunchAndLearns: 3, events: 2, newProspects: 8, conversions: 2,
    locationBreakdown: [
      { location: 'London', meetings: 14, lunchAndLearns: 2, events: 1, referrals: 3 },
      { location: 'Edinburgh', meetings: 2, lunchAndLearns: 0, events: 0, referrals: 0 },
      { location: 'Birmingham', meetings: 2, lunchAndLearns: 1, events: 1, referrals: 0 },
      { location: 'Manchester', meetings: 2, lunchAndLearns: 0, events: 0, referrals: 1 },
      { location: 'Leeds', meetings: 1, lunchAndLearns: 0, events: 0, referrals: 0 },
      { location: 'Glasgow', meetings: 1, lunchAndLearns: 0, events: 0, referrals: 0 },
    ],
    conversionRates: {
      meetingsToLunchAndLearns: 13.6, meetingsToReferrals: 18.2, lunchAndLearnsToClients: 33.3, overallMeetingsToClients: 9.1,
      conversionPaths: [
        { firm: 'Coutts', path: ['Meeting', 'Lunch & Learn', 'Client'], duration: '3 months' },
        { firm: 'Evelyn Partners', path: ['Meeting', 'Referral', 'Client'], duration: '2 months' },
      ],
    },
  },
  {
    quarter: 'Q4 2025', meetings: 31, lunchAndLearns: 6, events: 5, newProspects: 18, conversions: 5,
    locationBreakdown: [
      { location: 'London', meetings: 20, lunchAndLearns: 4, events: 3, referrals: 4 },
      { location: 'Edinburgh', meetings: 3, lunchAndLearns: 1, events: 1, referrals: 1 },
      { location: 'Birmingham', meetings: 3, lunchAndLearns: 0, events: 0, referrals: 0 },
      { location: 'Manchester', meetings: 2, lunchAndLearns: 1, events: 1, referrals: 1 },
      { location: 'Leeds', meetings: 2, lunchAndLearns: 0, events: 0, referrals: 0 },
      { location: 'Glasgow', meetings: 1, lunchAndLearns: 0, events: 0, referrals: 0 },
    ],
    conversionRates: {
      meetingsToLunchAndLearns: 19.4, meetingsToReferrals: 19.4, lunchAndLearnsToClients: 33.3, overallMeetingsToClients: 16.1,
      conversionPaths: [
        { firm: 'Evelyn Partners', path: ['Meeting', 'Lunch & Learn', 'Client'], duration: '2 months' },
        { firm: 'Rathbones', path: ['Meeting', 'Referral', 'Client'], duration: '3 months' },
        { firm: 'JM Finn', path: ['Meeting', 'Lunch & Learn', 'Referral', 'Client'], duration: '5 months' },
        { firm: 'Goldman Sachs', path: ['Meeting', 'Referral', 'Client'], duration: '2 months' },
        { firm: 'Brewin Dolphin', path: ['Meeting', 'Lunch & Learn', 'Client'], duration: '3 months' },
      ],
    },
  },
  {
    quarter: 'Q1 2026', meetings: 19, lunchAndLearns: 3, events: 2, newProspects: 13, conversions: 3,
    locationBreakdown: [
      { location: 'London', meetings: 12, lunchAndLearns: 2, events: 1, referrals: 3 },
      { location: 'Edinburgh', meetings: 2, lunchAndLearns: 0, events: 0, referrals: 0 },
      { location: 'Birmingham', meetings: 2, lunchAndLearns: 1, events: 1, referrals: 0 },
      { location: 'Manchester', meetings: 1, lunchAndLearns: 0, events: 0, referrals: 1 },
      { location: 'Leeds', meetings: 1, lunchAndLearns: 0, events: 0, referrals: 0 },
      { location: 'Glasgow', meetings: 1, lunchAndLearns: 0, events: 0, referrals: 0 },
    ],
    conversionRates: {
      meetingsToLunchAndLearns: 15.8, meetingsToReferrals: 21.1, lunchAndLearnsToClients: 33.3, overallMeetingsToClients: 15.8,
      conversionPaths: [
        { firm: 'Evelyn Partners', path: ['Meeting', 'Lunch & Learn', 'Referral', 'Client'], duration: '4 months' },
        { firm: 'Cazenove Capital', path: ['Meeting', 'Lunch & Learn', 'Client'], duration: '3 months' },
        { firm: 'Goldman Sachs', path: ['Meeting', 'Referral', 'Client'], duration: '2 months' },
      ],
    },
  },
];

// ── Helper Functions ──────────────────────────────────────────────────

export function getQuarter(dateStr: string): 'Q1' | 'Q2' | 'Q3' | 'Q4' {
  const month = new Date(dateStr).getMonth();
  if (month < 3) return 'Q1';
  if (month < 6) return 'Q2';
  if (month < 9) return 'Q3';
  return 'Q4';
}

export function getProspects(): Prospect[] { return prospects; }
export function getFirms(): Firm[] { return firms; }
export function getContacts(): Contact[] { return contacts; }
export function getClientAccounts(): ClientAccount[] { return clientAccounts; }
export function getAdminGrants(): AdminGrant[] { return adminGrants; }
export function getBDActivities(): BDActivity[] { return bdActivities; }
export function getQuarterlyKPIs(): QuarterlyKPIs[] { return quarterlyKPIs; }

export function getProspectsByStage(): Record<string, Prospect[]> {
  const stages: Record<string, Prospect[]> = {};
  for (const p of prospects) {
    if (!stages[p.stage]) stages[p.stage] = [];
    stages[p.stage].push(p);
  }
  return stages;
}

export function getDashboardStats(): DashboardStats {
  const activeAccounts = clientAccounts.filter(a => a.status === 'Active');
  const paidGrants = adminGrants.filter(g => g.stage === 'Paid');
  const approvedGrants = adminGrants.filter(g => g.stage === 'Approved');
  const activeFirms = firms.filter(f => f.status === 'Active');
  const nurturingFirms = firms.filter(f => f.status === 'Nurturing');
  const overdueFollowUps = prospects.filter(p => p.followUpStatus === 'Overdue');

  return {
    totalPipelineValue: prospects.reduce((sum, p) => sum + p.dafSize, 0),
    activeAccounts: activeAccounts.length,
    dafCount: activeAccounts.filter(a => a.accountType === 'DAF').length,
    cfCount: activeAccounts.filter(a => a.accountType === 'Collective Fund').length,
    grantsPipeline: adminGrants.filter(g => !['Paid', 'Declined'].includes(g.stage)).reduce((sum, g) => sum + g.amount, 0),
    grantsCount: adminGrants.filter(g => !['Paid', 'Declined'].includes(g.stage)).length,
    paidGrants: paidGrants.reduce((sum, g) => sum + g.amount, 0),
    approvedGrants: approvedGrants.reduce((sum, g) => sum + g.amount, 0),
    firmCount: firms.length,
    activeFirms: activeFirms.length,
    nurturingFirms: nurturingFirms.length,
    overdueFollowUps: overdueFollowUps.length,
  };
}

export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `£${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `£${(amount / 1000).toFixed(0)}K`;
  }
  return `£${amount.toLocaleString()}`;
}

export function formatCurrencyFull(amount: number): string {
  return `£${amount.toLocaleString('en-GB')}`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
