import { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/format';

function useCountUp(target: number, duration: number = 600): number {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    let frame: number;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return current;
}

interface BalanceCardsProps {
  balances: {
    cash: number;
    investments: number;
    offshore?: number;
    total: number;
  };
  ytdReturn: number;
  accountType: 'DAF' | 'Collective Fund';
}

interface CardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent?: boolean;
  badge?: React.ReactNode;
}

function Card({ label, value, icon, accent, badge }: CardProps) {
  return (
    <div
      className={`relative rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md ${
        accent
          ? 'bg-navy-600 border-navy-500 text-white'
          : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-lg ${
            accent ? 'bg-navy-500' : 'bg-slate-50'
          }`}
        >
          {icon}
        </div>
        {badge}
      </div>
      <p
        className={`text-xs font-medium uppercase tracking-wider mb-1 ${
          accent ? 'text-navy-200' : 'text-slate-400'
        }`}
      >
        {label}
      </p>
      <p className={`text-2xl font-semibold ${accent ? 'text-white' : 'text-slate-800'}`}>
        {value}
      </p>
    </div>
  );
}

export default function BalanceCards({ balances, ytdReturn, accountType }: BalanceCardsProps) {
  const showOffshore = accountType === 'Collective Fund' && balances.offshore != null;
  const gridCols = showOffshore ? 'md:grid-cols-4' : 'md:grid-cols-3';

  const animatedCash = useCountUp(balances.cash);
  const animatedInvestments = useCountUp(balances.investments);
  const animatedOffshore = useCountUp(balances.offshore ?? 0);
  const animatedTotal = useCountUp(balances.total);

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-4`}>
      <Card
        label="Cash Balance"
        value={formatCurrency(animatedCash)}
        icon={
          <svg className="w-5 h-5 text-slate-400" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      <Card
        label="Investment Portfolio"
        value={formatCurrency(animatedInvestments)}
        icon={
          <svg className="w-5 h-5 text-slate-400" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        }
      />
      {showOffshore && (
        <Card
          label="Offshore Balance"
          value={formatCurrency(animatedOffshore)}
          icon={
            <svg className="w-5 h-5 text-slate-400" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      )}
      <Card
        label="Total Fund Value"
        value={formatCurrency(animatedTotal)}
        accent
        icon={
          <svg className="w-5 h-5 text-gold-400" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        }
        badge={
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-300">
            <svg className="w-3 h-3 mr-0.5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            +{ytdReturn}% YTD
          </span>
        }
      />
    </div>
  );
}
