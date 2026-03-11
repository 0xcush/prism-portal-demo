/**
 * Deterministic generators for supplementary donor data fields that don't
 * exist in Notion. Each function uses a simple seeded hash from the account
 * name so builds are consistent across runs.
 */

import type {
  AssetAllocation,
  Holding,
  PerformanceEntry,
  Statement,
  Transaction,
  ActivityEntry,
  IssueArea,
  Grant,
} from '../data/clients';

// ── Seed helpers ──────────────────────────────────────────────────────

export function seedHash(s: string): number {
  return s.split('').reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0);
}

export function seededRandom(seed: number): () => number {
  let state = Math.abs(seed) || 1;
  return () => {
    state = (state * 16807 + 0) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

// ── Asset Distribution ────────────────────────────────────────────────

export function synthesizeAssetDistribution(
  investmentBalance: number,
): AssetAllocation[] {
  const hash = seedHash(String(investmentBalance));
  const rng = seededRandom(hash);

  // Base percentages with slight variation
  const vary = (base: number) => base + (rng() - 0.5) * 6;
  const raw = [vary(45), vary(25), vary(20), vary(10)];
  const sum = raw.reduce((a, b) => a + b, 0);
  const pcts = raw.map((v) => Math.round((v / sum) * 100));

  // Fix rounding so they sum to 100
  const diff = 100 - pcts.reduce((a, b) => a + b, 0);
  pcts[0] += diff;

  return [
    { name: 'UK Equities', value: pcts[0], color: '#1e3a5f' },
    { name: 'Global Bonds', value: pcts[1], color: '#2563eb' },
    { name: 'ESG Impact', value: pcts[2], color: '#059669' },
    { name: 'Cash & Equivalents', value: pcts[3], color: '#d4a574' },
  ];
}

// ── Holdings ──────────────────────────────────────────────────────────

const FUND_CATALOG: { name: string; ticker: string }[] = [
  { name: 'Vanguard FTSE UK All Share Index', ticker: 'VUKE' },
  { name: 'iShares Core UK Gilts', ticker: 'IGLT' },
  { name: 'Impax Environmental Markets', ticker: 'IEM' },
  { name: 'Fundsmith Equity Fund', ticker: 'FDSM' },
  { name: 'Royal London Short Duration Gilt', ticker: 'RLSG' },
  { name: 'Trojan Ethical Fund', ticker: 'TRJE' },
  { name: 'Liontrust Sustainable Future', ticker: 'LISF' },
  { name: 'HSBC FTSE 250 Index', ticker: 'HMCX' },
];

export function synthesizeHoldings(
  investmentBalance: number,
  seed: string,
): Holding[] {
  const rng = seededRandom(seedHash(seed));

  // Determine 6-8 holdings
  const count = 6 + Math.floor(rng() * 3);
  const funds = FUND_CATALOG.slice(0, count);

  // Generate raw weights
  const rawWeights = funds.map(() => 5 + rng() * 30);
  const totalWeight = rawWeights.reduce((a, b) => a + b, 0);
  const weights = rawWeights.map((w) => w / totalWeight);

  return funds.map((fund, i) => {
    const value = Math.round(investmentBalance * weights[i]);
    const price = 50 + Math.round(rng() * 200 * 100) / 100;
    const units = Math.round((value / price) * 100) / 100;
    const change = Math.round((rng() * 6 - 2) * 100) / 100;
    const weight = Math.round(weights[i] * 10000) / 100;
    return { name: fund.name, ticker: fund.ticker, units, price, value, change, weight };
  });
}

// ── Monthly Performance ───────────────────────────────────────────────

export function synthesizeMonthlyPerformance(
  totalValue: number,
  ytdReturn: number,
): PerformanceEntry[] {
  const months = [
    'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025',
    'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025',
    'Dec 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026',
  ];

  const rng = seededRandom(seedHash(String(totalValue)));

  // Distribute ytdReturn (roughly Jan-Mar portion) across all 12 months as a growth curve
  const monthlyGrowth = ytdReturn / 100 / 12;
  const entries: PerformanceEntry[] = [];

  // Work backwards from current value
  let fundValue = totalValue;
  const values: number[] = [fundValue];

  for (let i = 0; i < 11; i++) {
    const variation = (rng() - 0.45) * 0.01;
    fundValue = fundValue / (1 + monthlyGrowth + variation);
    values.unshift(Math.round(fundValue));
  }

  // Benchmark slightly below
  for (let i = 0; i < months.length; i++) {
    const benchDelta = 0.97 + rng() * 0.04;
    entries.push({
      month: months[i],
      fundValue: values[i],
      benchmark: Math.round(values[i] * benchDelta),
    });
  }

  return entries;
}

// ── Statements ────────────────────────────────────────────────────────

export function synthesizeStatements(onboardedDate: string): Statement[] {
  const statements: Statement[] = [];
  const start = new Date(onboardedDate);
  const now = new Date('2026-03-11');

  // Quarterly statements
  const qMonths = [3, 6, 9, 12]; // end months of quarters
  const year0 = start.getFullYear();

  for (let year = year0; year <= 2026; year++) {
    for (const endMonth of qMonths) {
      const qEnd = new Date(year, endMonth, 0); // last day of that month
      if (qEnd <= start || qEnd > now) continue;
      const q = Math.ceil(endMonth / 3);
      statements.push({
        period: `Q${q} ${year}`,
        type: 'Quarterly',
        date: qEnd.toISOString().slice(0, 10),
        aiGenerated: true,
      });
    }
  }

  // Annual statements (tax year ends 5 April)
  for (let year = year0; year <= 2026; year++) {
    const annualDate = new Date(year, 3, 5); // 5 April
    if (annualDate <= start || annualDate > now) continue;
    statements.push({
      period: `${year - 1}/${year}`,
      type: 'Annual',
      date: annualDate.toISOString().slice(0, 10),
      aiGenerated: true,
    });
  }

  // Tax statements (same tax year boundary)
  for (let year = year0 + 1; year <= 2026; year++) {
    const taxDate = new Date(year, 3, 30); // 30 April (after tax year)
    if (taxDate <= start || taxDate > now) continue;
    statements.push({
      period: `Tax ${year - 1}/${year}`,
      type: 'Tax',
      date: taxDate.toISOString().slice(0, 10),
      aiGenerated: true,
    });
  }

  // Sort by date descending
  statements.sort((a, b) => b.date.localeCompare(a.date));
  return statements;
}

// ── Transactions ──────────────────────────────────────────────────────

export function synthesizeTransactions(
  grants: Grant[],
  balances: { cash: number; investments: number; total: number },
): Transaction[] {
  const txns: Transaction[] = [];
  const rng = seededRandom(seedHash(String(balances.total)));

  // Grant disbursements
  for (const g of grants.filter((gr) => gr.status === 'Paid')) {
    txns.push({
      date: g.datePaid || g.dateRequested,
      description: `Grant Disbursement - ${g.charity}`,
      reference: `GD-${g.id.replace(/[^0-9]/g, '').slice(0, 6) || String(seedHash(g.id)).slice(1, 7)}`,
      debit: g.amount,
      credit: null,
      balance: 0, // calculated below
      category: 'Grant',
    });
  }

  // Investment income entries (monthly-ish)
  const incomeMonths = [
    '2025-10-15', '2025-11-15', '2025-12-15',
    '2026-01-15', '2026-02-15', '2026-03-01',
  ];
  for (const d of incomeMonths) {
    const amt = Math.round(balances.investments * (0.004 + rng() * 0.002));
    txns.push({
      date: d,
      description: 'Investment Income',
      reference: `II-${d.replace(/-/g, '')}`,
      debit: null,
      credit: amt,
      balance: 0,
      category: 'Income',
    });
  }

  // Quarterly management fees
  for (const feeDate of ['2025-09-30', '2025-12-31', '2026-03-31']) {
    if (feeDate > '2026-03-11') continue;
    const fee = Math.round(balances.total * 0.00125);
    txns.push({
      date: feeDate,
      description: 'Quarterly Management Fee',
      reference: `MF-${feeDate.replace(/-/g, '')}`,
      debit: fee,
      credit: null,
      balance: 0,
      category: 'Fee',
    });
  }

  // Sort by date descending
  txns.sort((a, b) => b.date.localeCompare(a.date));

  // Calculate running balance (most recent first)
  let runBal = balances.cash;
  for (const t of txns) {
    t.balance = runBal;
    if (t.debit) runBal += t.debit; // going backwards: add debits back
    if (t.credit) runBal -= t.credit; // going backwards: subtract credits
  }

  return txns;
}

// ── Recent Activity ───────────────────────────────────────────────────

export function synthesizeRecentActivity(grants: Grant[]): ActivityEntry[] {
  const entries: ActivityEntry[] = [];

  // Grant-derived activities (most recent first)
  const sorted = [...grants].sort((a, b) => b.dateRequested.localeCompare(a.dateRequested));
  for (const g of sorted.slice(0, 3)) {
    if (g.status === 'Paid') {
      entries.push({
        type: 'disbursement',
        title: `Grant paid to ${g.charity}`,
        description: `${g.amount.toLocaleString('en-GB')} disbursed for ${g.issueArea}`,
        timestamp: g.datePaid || g.dateRequested,
        aiGenerated: true,
      });
    } else {
      entries.push({
        type: 'disbursement',
        title: `Grant ${g.status.toLowerCase()} - ${g.charity}`,
        description: `${g.amount.toLocaleString('en-GB')} ${g.issueArea} grant in ${g.status.toLowerCase()} stage`,
        timestamp: g.dateRequested,
        aiGenerated: true,
      });
    }
  }

  // Common fund activities
  entries.push({
    type: 'income',
    title: 'Quarterly dividend income credited',
    description: 'Investment income from UK equities and bond portfolio',
    timestamp: '2026-03-01',
    aiGenerated: true,
  });

  entries.push({
    type: 'compliance',
    title: 'Annual compliance review completed',
    description: 'KYC/AML checks refreshed, all documentation current',
    timestamp: '2026-02-15',
    aiGenerated: true,
  });

  entries.push({
    type: 'rebalance',
    title: 'Portfolio rebalanced to target allocation',
    description: 'Quarterly rebalance executed within mandate tolerances',
    timestamp: '2026-01-15',
    aiGenerated: true,
  });

  // Sort by timestamp descending, limit to 6
  entries.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  return entries.slice(0, 6);
}

// ── Issue Area Breakdown ──────────────────────────────────────────────

export function computeIssueAreaBreakdown(grants: Grant[]): IssueArea[] {
  const map = new Map<string, number>();
  let total = 0;

  for (const g of grants) {
    const area = g.issueArea || 'Other';
    map.set(area, (map.get(area) || 0) + g.amount);
    total += g.amount;
  }

  if (total === 0) return [];

  const breakdown: IssueArea[] = [];
  for (const [area, amount] of map.entries()) {
    breakdown.push({
      area,
      amount,
      percentage: Math.round((amount / total) * 10000) / 100,
    });
  }

  breakdown.sort((a, b) => b.amount - a.amount);
  return breakdown;
}
