interface AIBadgeProps {
  variant: 'verified' | 'ai';
  label?: string;
  tooltip?: string;
}

export default function AIBadge({ variant, label, tooltip }: AIBadgeProps) {
  if (variant === 'verified') {
    return (
      <span
        className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center gap-1"
        title={tooltip}
      >
        <svg className="w-3.5 h-3.5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        {label || 'Verified'}
      </span>
    );
  }

  return (
    <span
      className="bg-gold-50 text-gold-700 px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center gap-1"
      title={tooltip}
    >
      <svg className="w-3.5 h-3.5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
        />
      </svg>
      {label || 'AI'}
    </span>
  );
}
