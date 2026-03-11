import { useEffect, useCallback, type ReactNode } from 'react';

interface SlidePanelProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  width?: string;
}

export default function SlidePanel({ open, onClose, title, subtitle, children, width = 'max-w-2xl' }: SlidePanelProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, handleEscape]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`relative ${width} w-full h-full bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-slide-in`}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Detail panel'}
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-slate-200 px-6 py-5 flex items-start justify-between">
          <div className="min-w-0 pr-4">
            {title && <h2 className="text-xl font-semibold text-slate-800 truncate">{title}</h2>}
            {subtitle && <p className="text-sm text-slate-400 mt-1 truncate">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
            aria-label="Close panel"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
