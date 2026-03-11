// ── Types ──────────────────────────────────────────────────────────────

export interface Prospect {
  id: string;
  name: string;
  stage: 'Lead' | 'Initial Contact' | 'Questions Sent' | 'Fee Proposal' | 'Contract' | 'Onboarding' | 'Active Client' | 'Handed to RM';
  giftSize: number;
  fundType: 'DAF' | 'CF';
  ukUs: 'UK' | 'US' | 'Both';
  conversionProbability: 'High' | 'Medium' | 'Low';
  sourceActivity: string;
  followUpStatus: 'On Track' | 'Due' | 'Overdue';
  referredBy: string;
  referringFirm: string;
  relationshipManager: string;
  dateEnteredPipeline: string;
  lastContact: string;
  nextFollowUp: string;
  notes: string;
  daysInPipeline: number;
}

export interface Firm {
  id: string;
  name: string;
  type: 'Investment Manager' | 'Wealth Advisor' | 'Accountancy' | 'Law Firm' | 'Family Office' | 'Philanthropy Advisor';
  status: 'Active' | 'Nurturing' | 'Inactive';
  offices: string[];
  lastInteraction: string;
  relationshipStart: string;
  contactCount: number;
  referralCount: number;
  personalNotes: string;
  totalAUM: number;
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
}

export interface QuarterlyKPIs {
  quarter: string;
  meetings: number;
  lunchAndLearns: number;
  events: number;
  newProspects: number;
  conversions: number;
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
  { id: 'p1', name: 'Lord Ashford', stage: 'Fee Proposal', giftSize: 5200000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Lunch & Learn - Cazenove', followUpStatus: 'On Track', referredBy: 'Edward Langley', referringFirm: 'Cazenove Capital', relationshipManager: 'Victoria Langley', dateEnteredPipeline: '2025-11-15', lastContact: '2026-03-04', nextFollowUp: '2026-03-14', notes: 'Interested in environmental grants. Wants bespoke investment mandate.', daysInPipeline: 115 },
  { id: 'p2', name: 'Elizabeth Park-Wilson', stage: 'Contract', giftSize: 3800000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Referral - JM Finn', followUpStatus: 'On Track', referredBy: 'Thomas Barrington', referringFirm: 'JM Finn', relationshipManager: 'James Prescott', dateEnteredPipeline: '2025-12-01', lastContact: '2026-03-07', nextFollowUp: '2026-03-12', notes: 'Contract review with solicitor. Expects to sign next week.', daysInPipeline: 99 },
  { id: 'p3', name: 'Dr Alistair Waverly', stage: 'Questions Sent', giftSize: 1500000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'Medium', sourceActivity: 'Conference - STEP', followUpStatus: 'Due', referredBy: 'Self', referringFirm: '', relationshipManager: 'Rachel Whitfield', dateEnteredPipeline: '2026-01-10', lastContact: '2026-02-20', nextFollowUp: '2026-03-10', notes: 'Academic with family wealth. Interested in education grants.', daysInPipeline: 59 },
  { id: 'p4', name: 'The Kensington Trust', stage: 'Initial Contact', giftSize: 12000000, fundType: 'CF', ukUs: 'UK', conversionProbability: 'Medium', sourceActivity: 'Referral - Goldman Sachs', followUpStatus: 'On Track', referredBy: 'Patricia Gresham', referringFirm: 'Goldman Sachs', relationshipManager: 'Victoria Langley', dateEnteredPipeline: '2026-02-01', lastContact: '2026-03-06', nextFollowUp: '2026-03-18', notes: 'Multi-generational family trust. Exploring charitable vehicles.', daysInPipeline: 37 },
  { id: 'p5', name: 'Sir Geoffrey Hartwell', stage: 'Onboarding', giftSize: 7500000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Office Visit - Rathbones', followUpStatus: 'On Track', referredBy: 'Henry Ashmore', referringFirm: 'Rathbones', relationshipManager: 'Sophie Merrick', dateEnteredPipeline: '2025-09-20', lastContact: '2026-03-08', nextFollowUp: '2026-03-15', notes: 'KYC documentation being collected. First tranche expected April.', daysInPipeline: 171 },
  { id: 'p6', name: 'Eleanor Fairchild', stage: 'Lead', giftSize: 900000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'Low', sourceActivity: 'Webinar - Tax Planning', followUpStatus: 'Overdue', referredBy: 'Website', referringFirm: '', relationshipManager: 'Rachel Whitfield', dateEnteredPipeline: '2026-02-20', lastContact: '2026-02-22', nextFollowUp: '2026-03-05', notes: 'Downloaded white paper. No direct conversation yet.', daysInPipeline: 18 },
  { id: 'p7', name: 'Worthington Family Office', stage: 'Fee Proposal', giftSize: 8200000, fundType: 'CF', ukUs: 'Both', conversionProbability: 'High', sourceActivity: 'Referral - Evelyn Partners', followUpStatus: 'On Track', referredBy: 'Charlotte Pemberton', referringFirm: 'Evelyn Partners', relationshipManager: 'James Prescott', dateEnteredPipeline: '2025-10-05', lastContact: '2026-03-05', nextFollowUp: '2026-03-13', notes: 'Wants collective fund with ESG mandate. Fee proposal under review.', daysInPipeline: 156 },
  { id: 'p8', name: 'Catherine Beaumont', stage: 'Active Client', giftSize: 2100000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Referral - Schroders', followUpStatus: 'On Track', referredBy: 'Marcus Thornley', referringFirm: 'Schroders', relationshipManager: 'Victoria Langley', dateEnteredPipeline: '2025-06-12', lastContact: '2026-03-01', nextFollowUp: '2026-04-01', notes: 'First grant disbursement made in January. Very satisfied.', daysInPipeline: 271 },
  { id: 'p9', name: 'Rt Hon James Fairfax MP', stage: 'Questions Sent', giftSize: 650000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'Medium', sourceActivity: 'Networking Event', followUpStatus: 'Overdue', referredBy: 'Self', referringFirm: '', relationshipManager: 'Sophie Merrick', dateEnteredPipeline: '2026-01-20', lastContact: '2026-02-10', nextFollowUp: '2026-03-01', notes: 'Interested in arts and heritage. Needs privacy assurances.', daysInPipeline: 49 },
  { id: 'p10', name: 'Thornbridge Capital Partners', stage: 'Initial Contact', giftSize: 4500000, fundType: 'CF', ukUs: 'UK', conversionProbability: 'Medium', sourceActivity: 'Conference - Philanthropy Impact', followUpStatus: 'On Track', referredBy: 'Conference introduction', referringFirm: '', relationshipManager: 'James Prescott', dateEnteredPipeline: '2026-02-15', lastContact: '2026-03-03', nextFollowUp: '2026-03-17', notes: 'Corporate foundation exploring DAF alternative.', daysInPipeline: 23 },
  { id: 'p11', name: 'Lady Sophia Ashworth', stage: 'Handed to RM', giftSize: 1800000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Referral - Coutts', followUpStatus: 'On Track', referredBy: 'James Hartington', referringFirm: 'Coutts', relationshipManager: 'Rachel Whitfield', dateEnteredPipeline: '2025-08-05', lastContact: '2026-03-09', nextFollowUp: '2026-03-20', notes: 'Fully onboarded. RM managing ongoing relationship.', daysInPipeline: 217 },
  { id: 'p12', name: 'The Elmswood Foundation', stage: 'Lead', giftSize: 3000000, fundType: 'CF', ukUs: 'UK', conversionProbability: 'Low', sourceActivity: 'Email Campaign - Q1', followUpStatus: 'Due', referredBy: 'Marketing', referringFirm: '', relationshipManager: 'Victoria Langley', dateEnteredPipeline: '2026-03-01', lastContact: '2026-03-02', nextFollowUp: '2026-03-10', notes: 'Opened email. Clicked on DAF info page.', daysInPipeline: 9 },
  { id: 'p13', name: 'Robert Windham KC', stage: 'Fee Proposal', giftSize: 2400000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Referral - Withers LLP', followUpStatus: 'On Track', referredBy: 'Sarah Pemberton', referringFirm: 'Withers LLP', relationshipManager: 'Sophie Merrick', dateEnteredPipeline: '2025-11-28', lastContact: '2026-03-06', nextFollowUp: '2026-03-16', notes: 'Fee proposal accepted verbally. Drafting agreement.', daysInPipeline: 102 },
  { id: 'p14', name: 'Helena Cavendish-Hale', stage: 'Active Client', giftSize: 4200000, fundType: 'DAF', ukUs: 'Both', conversionProbability: 'High', sourceActivity: 'Referral - Goldman Sachs', followUpStatus: 'On Track', referredBy: 'Patricia Gresham', referringFirm: 'Goldman Sachs', relationshipManager: 'James Prescott', dateEnteredPipeline: '2025-04-10', lastContact: '2026-02-28', nextFollowUp: '2026-03-28', notes: 'US/UK dual giving. Second tranche received February.', daysInPipeline: 334 },
  { id: 'p15', name: 'Alderman Christopher Mercer', stage: 'Onboarding', giftSize: 1200000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Lunch & Learn - City of London', followUpStatus: 'Due', referredBy: 'Livery Company', referringFirm: '', relationshipManager: 'Rachel Whitfield', dateEnteredPipeline: '2025-12-15', lastContact: '2026-02-25', nextFollowUp: '2026-03-10', notes: 'Gift deed being executed. Completion expected mid-March.', daysInPipeline: 85 },
  { id: 'p16', name: 'Penrose Wealth Management', stage: 'Contract', giftSize: 6000000, fundType: 'CF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Office Visit - direct', followUpStatus: 'On Track', referredBy: 'Industry contact', referringFirm: '', relationshipManager: 'Victoria Langley', dateEnteredPipeline: '2025-10-20', lastContact: '2026-03-07', nextFollowUp: '2026-03-14', notes: 'Collective fund for their HNW clients. Legal review stage.', daysInPipeline: 141 },
  { id: 'p17', name: 'Beatrice Dunmore', stage: 'Lead', giftSize: 500000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'Low', sourceActivity: 'Website Enquiry', followUpStatus: 'On Track', referredBy: 'Website', referringFirm: '', relationshipManager: 'Sophie Merrick', dateEnteredPipeline: '2026-03-05', lastContact: '2026-03-06', nextFollowUp: '2026-03-19', notes: 'Initial enquiry form submitted. Basic info call scheduled.', daysInPipeline: 5 },
  { id: 'p18', name: 'Duke of Strathmere', stage: 'Questions Sent', giftSize: 15000000, fundType: 'CF', ukUs: 'UK', conversionProbability: 'Medium', sourceActivity: 'Referral - Cazenove Capital', followUpStatus: 'On Track', referredBy: 'Edward Langley', referringFirm: 'Cazenove Capital', relationshipManager: 'Victoria Langley', dateEnteredPipeline: '2026-01-05', lastContact: '2026-03-03', nextFollowUp: '2026-03-17', notes: 'Very large prospect. Wants multi-generational philanthropic vehicle.', daysInPipeline: 64 },
  { id: 'p19', name: 'Hartfield & Partners Trust', stage: 'Initial Contact', giftSize: 2800000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'Medium', sourceActivity: 'Conference - STEP', followUpStatus: 'Overdue', referredBy: 'STEP event', referringFirm: '', relationshipManager: 'James Prescott', dateEnteredPipeline: '2026-02-10', lastContact: '2026-02-15', nextFollowUp: '2026-03-03', notes: 'Exchanged cards at STEP. Sent intro email, no reply yet.', daysInPipeline: 28 },
  { id: 'p20', name: 'Professor Diana Ellsworth', stage: 'Active Client', giftSize: 980000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'High', sourceActivity: 'Referral - JM Finn', followUpStatus: 'On Track', referredBy: 'Thomas Barrington', referringFirm: 'JM Finn', relationshipManager: 'Rachel Whitfield', dateEnteredPipeline: '2025-05-20', lastContact: '2026-03-02', nextFollowUp: '2026-04-02', notes: 'Science and research focus. Annual review scheduled April.', daysInPipeline: 294 },
  { id: 'p21', name: 'The Millbrook Charitable Trust', stage: 'Fee Proposal', giftSize: 3400000, fundType: 'CF', ukUs: 'UK', conversionProbability: 'Medium', sourceActivity: 'Referral - Evelyn Partners', followUpStatus: 'Due', referredBy: 'Charlotte Pemberton', referringFirm: 'Evelyn Partners', relationshipManager: 'Sophie Merrick', dateEnteredPipeline: '2025-11-08', lastContact: '2026-02-27', nextFollowUp: '2026-03-10', notes: 'Comparing fees with competitor. Need to follow up on proposal.', daysInPipeline: 122 },
  { id: 'p22', name: 'Oliver Radcliffe', stage: 'Lead', giftSize: 750000, fundType: 'DAF', ukUs: 'UK', conversionProbability: 'Low', sourceActivity: 'Webinar - Philanthropy 101', followUpStatus: 'On Track', referredBy: 'Webinar', referringFirm: '', relationshipManager: 'Rachel Whitfield', dateEnteredPipeline: '2026-03-08', lastContact: '2026-03-08', nextFollowUp: '2026-03-22', notes: 'Young tech entrepreneur. Attended webinar, asked questions.', daysInPipeline: 2 },
];

const firms: Firm[] = [
  { id: 'f1', name: 'Goldman Sachs', type: 'Investment Manager', status: 'Active', offices: ['London', 'New York'], lastInteraction: '2026-03-06', relationshipStart: '2022-04-15', contactCount: 4, referralCount: 6, personalNotes: 'Key strategic partner. Patricia Gresham is primary contact.', totalAUM: 28500000 },
  { id: 'f2', name: 'Schroders', type: 'Investment Manager', status: 'Active', offices: ['London'], lastInteraction: '2026-03-01', relationshipStart: '2021-09-10', contactCount: 3, referralCount: 4, personalNotes: 'Strong relationship through Marcus Thornley. Annual charity lunch.', totalAUM: 15200000 },
  { id: 'f3', name: 'Evelyn Partners', type: 'Wealth Advisor', status: 'Active', offices: ['London', 'Birmingham', 'Manchester'], lastInteraction: '2026-03-05', relationshipStart: '2023-01-20', contactCount: 5, referralCount: 8, personalNotes: 'Most active referral source. Charlotte Pemberton championing internally.', totalAUM: 22300000 },
  { id: 'f4', name: 'Coutts', type: 'Wealth Advisor', status: 'Active', offices: ['London'], lastInteraction: '2026-03-09', relationshipStart: '2020-06-01', contactCount: 3, referralCount: 5, personalNotes: 'Longest standing partner. Royal warrant holder.', totalAUM: 19800000 },
  { id: 'f5', name: 'Cazenove Capital', type: 'Investment Manager', status: 'Active', offices: ['London'], lastInteraction: '2026-03-04', relationshipStart: '2023-06-15', contactCount: 2, referralCount: 3, personalNotes: 'Edward Langley refers UHNW clients. Quality over quantity.', totalAUM: 32100000 },
  { id: 'f6', name: 'JM Finn', type: 'Investment Manager', status: 'Active', offices: ['London', 'Bristol', 'Leeds'], lastInteraction: '2026-03-07', relationshipStart: '2022-11-01', contactCount: 4, referralCount: 5, personalNotes: 'Thomas Barrington keen to grow partnership. Regional offices useful.', totalAUM: 12400000 },
  { id: 'f7', name: 'Rathbones', type: 'Investment Manager', status: 'Active', offices: ['London', 'Edinburgh', 'Liverpool'], lastInteraction: '2026-03-08', relationshipStart: '2021-03-15', contactCount: 3, referralCount: 3, personalNotes: 'Henry Ashmore is key contact. Charity specialist team engaged.', totalAUM: 18700000 },
  { id: 'f8', name: 'Withers LLP', type: 'Law Firm', status: 'Active', offices: ['London', 'Geneva', 'Hong Kong'], lastInteraction: '2026-03-06', relationshipStart: '2022-08-01', contactCount: 3, referralCount: 4, personalNotes: 'Private client team refers HNW individuals. Sarah Pemberton is champion.', totalAUM: 0 },
  { id: 'f9', name: 'Deloitte Private', type: 'Accountancy', status: 'Nurturing', offices: ['London', 'Manchester'], lastInteraction: '2026-02-15', relationshipStart: '2024-05-10', contactCount: 2, referralCount: 1, personalNotes: 'Tax planning referrals. Need to schedule L&L with wider team.', totalAUM: 4200000 },
  { id: 'f10', name: 'BDO', type: 'Accountancy', status: 'Nurturing', offices: ['London'], lastInteraction: '2026-01-28', relationshipStart: '2024-09-01', contactCount: 2, referralCount: 0, personalNotes: 'Had initial meeting. Need to follow up with case studies.', totalAUM: 0 },
  { id: 'f11', name: 'Stonehage Fleming', type: 'Family Office', status: 'Active', offices: ['London', 'Jersey', 'Zurich'], lastInteraction: '2026-02-25', relationshipStart: '2023-03-01', contactCount: 3, referralCount: 2, personalNotes: 'Multi-family office. Interested in collective fund structures.', totalAUM: 8900000 },
  { id: 'f12', name: 'Philanthropy Impact', type: 'Philanthropy Advisor', status: 'Active', offices: ['London'], lastInteraction: '2026-03-03', relationshipStart: '2021-01-01', contactCount: 2, referralCount: 3, personalNotes: 'Industry body. Good for events and thought leadership.', totalAUM: 0 },
  { id: 'f13', name: 'Charles Russell Speechlys', type: 'Law Firm', status: 'Nurturing', offices: ['London', 'Cheltenham', 'Guildford'], lastInteraction: '2026-02-10', relationshipStart: '2024-11-01', contactCount: 1, referralCount: 0, personalNotes: 'Initial meeting positive. Follow up with charity team.', totalAUM: 0 },
  { id: 'f14', name: 'KPMG Private Enterprise', type: 'Accountancy', status: 'Inactive', offices: ['London'], lastInteraction: '2025-08-20', relationshipStart: '2024-02-01', contactCount: 1, referralCount: 0, personalNotes: 'Initial contact went cold. Revisit in Q3.', totalAUM: 0 },
  { id: 'f15', name: 'Sandaire', type: 'Family Office', status: 'Nurturing', offices: ['London', 'Edinburgh'], lastInteraction: '2026-02-18', relationshipStart: '2024-07-01', contactCount: 2, referralCount: 1, personalNotes: 'Multi-family office focused on impact investing.', totalAUM: 3500000 },
  { id: 'f16', name: 'Brewin Dolphin', type: 'Investment Manager', status: 'Active', offices: ['London', 'Oxford', 'Belfast'], lastInteraction: '2026-02-28', relationshipStart: '2023-09-15', contactCount: 3, referralCount: 2, personalNotes: 'Good relationship with charity team. Quarterly catch-ups.', totalAUM: 7600000 },
];

const contacts: Contact[] = [
  { id: 'c1', name: 'Patricia Gresham', category: 'Intermediary', email: 'p.gresham@example.com', phone: '+44 20 7946 3817', firmName: 'Goldman Sachs', source: 'Industry event', followUpStatus: 'On Track', lastContactDate: '2026-03-06', nextFollowUp: '2026-04-06', notes: 'Key referral source. Quarterly dinners.' },
  { id: 'c2', name: 'Marcus Thornley', category: 'Investment Manager', email: 'm.thornley@example.com', phone: '+44 20 7946 5294', firmName: 'Schroders', source: 'Direct outreach', followUpStatus: 'On Track', lastContactDate: '2026-03-01', nextFollowUp: '2026-03-28', notes: 'Charity specialist. Refers HNW clients with philanthropic interests.' },
  { id: 'c3', name: 'Charlotte Pemberton', category: 'Intermediary', email: 'c.pemberton@example.com', phone: '+44 20 7946 6138', firmName: 'Evelyn Partners', source: 'Conference', followUpStatus: 'On Track', lastContactDate: '2026-03-05', nextFollowUp: '2026-03-19', notes: 'Most prolific referrer. Internal champion.' },
  { id: 'c4', name: 'James Hartington', category: 'Intermediary', email: 'j.hartington@example.com', phone: '+44 20 7946 7421', firmName: 'Coutts', source: 'Existing relationship', followUpStatus: 'Due', lastContactDate: '2026-02-20', nextFollowUp: '2026-03-10', notes: 'Senior partner at Coutts philanthropy desk.' },
  { id: 'c5', name: 'Edward Langley', category: 'Investment Manager', email: 'e.langley@example.com', phone: '+44 20 7946 2053', firmName: 'Cazenove Capital', source: 'Direct', followUpStatus: 'On Track', lastContactDate: '2026-03-04', nextFollowUp: '2026-03-25', notes: 'UHNW referrals. Selective but high quality.' },
  { id: 'c6', name: 'Thomas Barrington', category: 'Investment Manager', email: 't.barrington@example.com', phone: '+44 20 7946 4762', firmName: 'JM Finn', source: 'Industry event', followUpStatus: 'Overdue', lastContactDate: '2026-02-10', nextFollowUp: '2026-03-03', notes: 'Keen to grow partnership. Needs updated materials.' },
  { id: 'c7', name: 'Henry Ashmore', category: 'Intermediary', email: 'h.ashmore@example.com', phone: '+44 20 7946 8305', firmName: 'Rathbones', source: 'Conference', followUpStatus: 'On Track', lastContactDate: '2026-03-08', nextFollowUp: '2026-03-29', notes: 'Charity team lead. Regional connections.' },
  { id: 'c8', name: 'Sarah Pemberton', category: 'Lawyer', email: 's.pemberton@example.com', phone: '+44 20 7946 1679', firmName: 'Withers LLP', source: 'STEP event', followUpStatus: 'On Track', lastContactDate: '2026-03-06', nextFollowUp: '2026-04-06', notes: 'Private client lawyer. Charity and philanthropy specialist.' },
  { id: 'c9', name: 'Lord Ashford', category: 'Potential Donor', email: 'l.ashford@example.com', phone: '+44 20 7946 9241', firmName: '', source: 'Lunch & Learn', followUpStatus: 'On Track', lastContactDate: '2026-03-04', nextFollowUp: '2026-03-14', notes: 'Environmental focus. Fee proposal stage.' },
  { id: 'c10', name: 'Elizabeth Park-Wilson', category: 'Potential Donor', email: 'e.parkwilson@example.com', phone: '+44 20 7946 3584', firmName: '', source: 'JM Finn referral', followUpStatus: 'On Track', lastContactDate: '2026-03-07', nextFollowUp: '2026-03-12', notes: 'Contract stage. Solicitor reviewing.' },
  { id: 'c11', name: 'Helena Cavendish-Hale', category: 'Donor', email: 'h.cavendishhale@example.com', phone: '+44 20 7946 6702', firmName: '', source: 'Goldman Sachs referral', followUpStatus: 'On Track', lastContactDate: '2026-02-28', nextFollowUp: '2026-03-28', notes: 'Active client. US/UK dual giving. Second tranche received.' },
  { id: 'c12', name: 'David Ashworth', category: 'Accountant', email: 'd.ashworth@example.com', phone: '+44 20 7946 4918', firmName: 'Deloitte Private', source: 'Tax event', followUpStatus: 'Overdue', lastContactDate: '2026-02-01', nextFollowUp: '2026-02-28', notes: 'Need to send case studies for tax planning clients.' },
  { id: 'c13', name: 'Fiona Campbell', category: 'Intermediary', email: 'f.campbell@example.com', phone: '+44 20 7946 7536', firmName: 'Stonehage Fleming', source: 'Family office network', followUpStatus: 'On Track', lastContactDate: '2026-02-25', nextFollowUp: '2026-03-25', notes: 'Interested in CF structures for their families.' },
  { id: 'c14', name: 'Catherine Beaumont', category: 'Donor', email: 'c.beaumont@example.com', phone: '+44 20 7946 2847', firmName: '', source: 'Schroders referral', followUpStatus: 'On Track', lastContactDate: '2026-03-01', nextFollowUp: '2026-04-01', notes: 'Active client. First grant disbursement made January.' },
  { id: 'c15', name: 'Professor Diana Ellsworth', category: 'Donor', email: 'd.ellsworth@example.com', phone: '+44 20 7946 0362', firmName: '', source: 'JM Finn referral', followUpStatus: 'On Track', lastContactDate: '2026-03-02', nextFollowUp: '2026-04-02', notes: 'Science and research focus. Annual review scheduled April.' },
  { id: 'c16', name: 'Peter Worthington', category: 'Potential Donor', email: 'p.worthington@example.com', phone: '+44 20 7946 5183', firmName: 'Worthington Family Office', source: 'Evelyn Partners referral', followUpStatus: 'On Track', lastContactDate: '2026-03-05', nextFollowUp: '2026-03-13', notes: 'Family office principal. CF with ESG mandate.' },
];

const clientAccounts: ClientAccount[] = [
  { id: 'ca1', name: 'Cavendish-Hale Foundation Fund', accountNumber: 'DAF-2025-0041', accountType: 'DAF', entity: 'PTGF', status: 'Active', cashBalance: 380000, investmentBalance: 3620000, offshoreBalance: 200000, totalValue: 4200000, ytdReturn: 7.2, relationshipManager: 'James Prescott', onboardedDate: '2025-05-15' },
  { id: 'ca2', name: 'Beaumont Charitable Fund', accountNumber: 'DAF-2025-0055', accountType: 'DAF', entity: 'PTGF', status: 'Active', cashBalance: 150000, investmentBalance: 1820000, offshoreBalance: 0, totalValue: 1970000, ytdReturn: 5.8, relationshipManager: 'Victoria Langley', onboardedDate: '2025-08-20' },
  { id: 'ca3', name: 'Ellsworth Research Fund', accountNumber: 'DAF-2025-0063', accountType: 'DAF', entity: 'PTGF', status: 'Active', cashBalance: 95000, investmentBalance: 845000, offshoreBalance: 0, totalValue: 940000, ytdReturn: 6.1, relationshipManager: 'Rachel Whitfield', onboardedDate: '2025-07-10' },
  { id: 'ca4', name: 'Ashworth Arts & Heritage Fund', accountNumber: 'DAF-2025-0071', accountType: 'DAF', entity: 'PTGF', status: 'Active', cashBalance: 220000, investmentBalance: 1480000, offshoreBalance: 0, totalValue: 1700000, ytdReturn: 4.9, relationshipManager: 'Rachel Whitfield', onboardedDate: '2025-10-01' },
  { id: 'ca5', name: 'Kensington Collective Fund', accountNumber: 'CF-2024-0012', accountType: 'Collective Fund', entity: 'TPCT', status: 'Active', cashBalance: 1200000, investmentBalance: 8500000, offshoreBalance: 2300000, totalValue: 12000000, ytdReturn: 8.4, relationshipManager: 'Victoria Langley', onboardedDate: '2024-03-01' },
  { id: 'ca6', name: 'Waverly Education Fund', accountNumber: 'DAF-2026-0003', accountType: 'DAF', entity: 'PTGF', status: 'Pending', cashBalance: 0, investmentBalance: 0, offshoreBalance: 0, totalValue: 0, ytdReturn: 0, relationshipManager: 'Rachel Whitfield', onboardedDate: '2026-02-28' },
  { id: 'ca7', name: 'Hartwell Environmental Trust', accountNumber: 'DAF-2026-0005', accountType: 'DAF', entity: 'PTGF', status: 'Pending', cashBalance: 0, investmentBalance: 0, offshoreBalance: 0, totalValue: 0, ytdReturn: 0, relationshipManager: 'Sophie Merrick', onboardedDate: '2026-03-01' },
  { id: 'ca8', name: 'Westminster Giving Fund', accountNumber: 'CF-2023-0008', accountType: 'Collective Fund', entity: 'TPCT', status: 'Active', cashBalance: 850000, investmentBalance: 6200000, offshoreBalance: 1450000, totalValue: 8500000, ytdReturn: 7.8, relationshipManager: 'James Prescott', onboardedDate: '2023-06-15' },
  { id: 'ca9', name: 'Mercer Livery Fund', accountNumber: 'DAF-2026-0007', accountType: 'DAF', entity: 'PTGF', status: 'Pending', cashBalance: 0, investmentBalance: 0, offshoreBalance: 0, totalValue: 0, ytdReturn: 0, relationshipManager: 'Rachel Whitfield', onboardedDate: '2026-03-05' },
  { id: 'ca10', name: 'Thornbury Impact Fund', accountNumber: 'CF-2024-0018', accountType: 'Collective Fund', entity: 'TPCT', status: 'Active', cashBalance: 420000, investmentBalance: 3100000, offshoreBalance: 680000, totalValue: 4200000, ytdReturn: 6.5, relationshipManager: 'Sophie Merrick', onboardedDate: '2024-09-01' },
  { id: 'ca11', name: 'Ashford Legacy Fund', accountNumber: 'DAF-2024-0029', accountType: 'DAF', entity: 'PAL', status: 'Active', cashBalance: 180000, investmentBalance: 2300000, offshoreBalance: 0, totalValue: 2480000, ytdReturn: 5.3, relationshipManager: 'Victoria Langley', onboardedDate: '2024-05-20' },
  { id: 'ca12', name: 'Penrose Wealth CF', accountNumber: 'CF-2025-0022', accountType: 'Collective Fund', entity: 'TPCT', status: 'Active', cashBalance: 600000, investmentBalance: 4800000, offshoreBalance: 900000, totalValue: 6300000, ytdReturn: 7.1, relationshipManager: 'Victoria Langley', onboardedDate: '2025-01-10' },
  { id: 'ca13', name: 'Brighton Community Fund', accountNumber: 'CF-2023-0005', accountType: 'Collective Fund', entity: 'Foundation', status: 'Closed', cashBalance: 0, investmentBalance: 0, offshoreBalance: 0, totalValue: 0, ytdReturn: 0, relationshipManager: 'James Prescott', onboardedDate: '2023-02-01' },
];

const adminGrants: AdminGrant[] = [
  { id: 'g1', grantName: 'Annual Support Grant', charity: 'NSPCC', charityNumber: '216401', amount: 250000, stage: 'Paid', issueArea: 'Children & Young People', priority: 'High', ddStatus: 'Complete', clientAccount: 'Cavendish-Hale Foundation Fund', requestedBy: 'Helena Cavendish-Hale', dateRequested: '2026-01-10', daysInStage: 0 },
  { id: 'g2', grantName: 'Restoration Fund', charity: 'Tate Foundation', charityNumber: '1085314', amount: 175000, stage: 'Approved', issueArea: 'Arts & Culture', priority: 'Medium', ddStatus: 'Complete', clientAccount: 'Ashworth Arts & Heritage Fund', requestedBy: 'Lady Sophia Ashworth', dateRequested: '2026-02-01', daysInStage: 14 },
  { id: 'g3', grantName: 'Research Programme Grant', charity: 'British Heart Foundation', charityNumber: '225971', amount: 500000, stage: 'In Review', issueArea: 'Health & Medical', priority: 'High', ddStatus: 'Complete', clientAccount: 'Westminster Giving Fund', requestedBy: 'Trust Committee', dateRequested: '2026-02-15', daysInStage: 23 },
  { id: 'g4', grantName: 'Conservation Programme', charity: 'WWF UK', charityNumber: '1081247', amount: 350000, stage: 'Paid', issueArea: 'Environment', priority: 'High', ddStatus: 'Complete', clientAccount: 'Cavendish-Hale Foundation Fund', requestedBy: 'Helena Cavendish-Hale', dateRequested: '2025-12-01', daysInStage: 0 },
  { id: 'g5', grantName: 'Performance Season Support', charity: 'Royal Opera House', charityNumber: '211775', amount: 120000, stage: 'Awaiting Bank Statement', issueArea: 'Arts & Culture', priority: 'Medium', ddStatus: 'In Progress', clientAccount: 'Ashworth Arts & Heritage Fund', requestedBy: 'Lady Sophia Ashworth', dateRequested: '2026-02-20', daysInStage: 18 },
  { id: 'g6', grantName: 'Scholarships Fund', charity: 'Eton College Foundation', charityNumber: '1139086', amount: 200000, stage: 'Approved', issueArea: 'Education', priority: 'Medium', ddStatus: 'Complete', clientAccount: 'Ellsworth Research Fund', requestedBy: 'Professor Diana Ellsworth', dateRequested: '2026-01-20', daysInStage: 21 },
  { id: 'g7', grantName: 'Emergency Relief Fund', charity: 'British Red Cross', charityNumber: '220949', amount: 100000, stage: 'Paid', issueArea: 'Humanitarian', priority: 'High', ddStatus: 'Complete', clientAccount: 'Beaumont Charitable Fund', requestedBy: 'Catherine Beaumont', dateRequested: '2026-01-05', daysInStage: 0 },
  { id: 'g8', grantName: 'Community Kitchen', charity: 'The Felix Project', charityNumber: '1168183', amount: 45000, stage: 'First Contact', issueArea: 'Poverty & Food', priority: 'Low', ddStatus: 'Pending', clientAccount: 'Thornbury Impact Fund', requestedBy: 'Fund Committee', dateRequested: '2026-03-01', daysInStage: 9 },
  { id: 'g9', grantName: 'Mental Health Programme', charity: 'Mind', charityNumber: '219830', amount: 280000, stage: 'In Review', issueArea: 'Health & Medical', priority: 'High', ddStatus: 'In Progress', clientAccount: 'Ashford Legacy Fund', requestedBy: 'Trust Manager', dateRequested: '2026-02-10', daysInStage: 28 },
  { id: 'g10', grantName: 'Literacy Programme', charity: 'National Literacy Trust', charityNumber: '1116260', amount: 85000, stage: 'Requested', issueArea: 'Education', priority: 'Medium', ddStatus: 'Not Started', clientAccount: 'Ellsworth Research Fund', requestedBy: 'Professor Diana Ellsworth', dateRequested: '2026-03-05', daysInStage: 5 },
  { id: 'g11', grantName: 'Ocean Conservation', charity: 'Marine Conservation Society', charityNumber: '1004005', amount: 150000, stage: 'Approved', issueArea: 'Environment', priority: 'Medium', ddStatus: 'Complete', clientAccount: 'Penrose Wealth CF', requestedBy: 'Fund Committee', dateRequested: '2026-01-25', daysInStage: 18 },
  { id: 'g12', grantName: 'Youth Orchestra Support', charity: 'National Youth Orchestra', charityNumber: '263878', amount: 60000, stage: 'Paid', issueArea: 'Arts & Culture', priority: 'Low', ddStatus: 'Complete', clientAccount: 'Ashworth Arts & Heritage Fund', requestedBy: 'Lady Sophia Ashworth', dateRequested: '2025-11-15', daysInStage: 0 },
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
  { quarter: 'Q1 2025', meetings: 28, lunchAndLearns: 4, events: 3, newProspects: 12, conversions: 3 },
  { quarter: 'Q2 2025', meetings: 35, lunchAndLearns: 5, events: 4, newProspects: 15, conversions: 4 },
  { quarter: 'Q3 2025', meetings: 22, lunchAndLearns: 3, events: 2, newProspects: 8, conversions: 2 },
  { quarter: 'Q4 2025', meetings: 31, lunchAndLearns: 6, events: 5, newProspects: 18, conversions: 5 },
  { quarter: 'Q1 2026', meetings: 19, lunchAndLearns: 3, events: 2, newProspects: 13, conversions: 3 },
];

// ── Helper Functions ──────────────────────────────────────────────────

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
    totalPipelineValue: prospects.reduce((sum, p) => sum + p.giftSize, 0),
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
