import { useState, useEffect } from 'react';

interface RequestGrantProps {
  clientName: string;
}

const issueAreas = [
  'Healthcare',
  'Education',
  'Arts & Culture',
  'Environment',
  'Social Welfare',
  'International Development',
  'Animal Welfare',
  'Religious Activities',
  'Other',
];

export default function RequestGrant({ clientName }: RequestGrantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [charityLookup, setCharityLookup] = useState<'idle' | 'loading' | 'found'>('idle');
  const [form, setForm] = useState({
    charityName: '',
    charityNumber: '',
    amount: '',
    purpose: '',
    issueArea: '',
  });

  useEffect(() => {
    if (form.charityNumber.length >= 5) {
      setCharityLookup('loading');
      const timer = setTimeout(() => setCharityLookup('found'), 800);
      return () => clearTimeout(timer);
    } else {
      setCharityLookup('idle');
    }
  }, [form.charityNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.charityName.trim()) newErrors.charityName = 'Charity name is required';
    if (!form.charityNumber.trim()) newErrors.charityNumber = 'Registration number is required';
    if (!form.amount || Number(form.amount) <= 0) newErrors.amount = 'Enter a valid amount';
    if (!form.issueArea) newErrors.issueArea = 'Select an issue area';
    if (!form.purpose.trim()) newErrors.purpose = 'Purpose is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setForm({ charityName: '', charityNumber: '', amount: '', purpose: '', issueArea: '' });
    }, 2500);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Request a Grant</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Submit a new grant recommendation
          </p>
        </div>
      </div>

      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-navy-600 text-white text-sm font-medium hover:bg-navy-700 transition-colors shadow-sm"
        >
          <svg className="w-5 h-5 mr-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Grant Request
        </button>
      ) : (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => {
              if (!submitted) {
                setIsOpen(false);
              }
            }}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {submitted ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-500" aria-hidden="true" role="img" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    Grant Request Submitted
                  </h3>
                  <p className="text-sm text-slate-500">
                    Your relationship manager will review this request and follow up within 2 business days.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        New Grant Request
                      </h3>
                      <p className="text-sm text-slate-400 mt-0.5">{clientName}</p>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      aria-label="Close"
                      className="text-slate-400 hover:text-slate-600 transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 rounded"
                    >
                      <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Charity Name
                      </label>
                      <input
                        type="text"
                        value={form.charityName}
                        onChange={(e) => setForm({ ...form, charityName: e.target.value })}
                        className={`w-full rounded-lg border ${errors.charityName ? 'border-red-300 focus:ring-red-600/20 focus:border-red-600' : 'border-slate-200 focus:ring-navy-600/20 focus:border-navy-600'} px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="e.g. Save the Children UK"
                      />
                      {errors.charityName && (
                        <p className="text-xs text-red-500 mt-1">{errors.charityName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Charity Registration Number
                      </label>
                      <input
                        type="text"
                        value={form.charityNumber}
                        onChange={(e) => setForm({ ...form, charityNumber: e.target.value })}
                        className={`w-full rounded-lg border ${errors.charityNumber ? 'border-red-300 focus:ring-red-600/20 focus:border-red-600' : 'border-slate-200 focus:ring-navy-600/20 focus:border-navy-600'} px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="e.g. 213890"
                      />
                      {errors.charityNumber && (
                        <p className="text-xs text-red-500 mt-1">{errors.charityNumber}</p>
                      )}
                      {charityLookup === 'loading' && (
                        <div className="flex items-center gap-2 mt-1.5">
                          <svg className="w-4 h-4 text-navy-600 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                          </svg>
                          <span className="text-xs text-slate-500">Checking Charity Commission...</span>
                        </div>
                      )}
                      {charityLookup === 'found' && (
                        <div className="flex items-center gap-2 mt-1.5 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-100">
                          <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <div>
                            <p className="text-xs font-medium text-emerald-700">Charity Commission - Active</p>
                            <p className="text-[10px] text-emerald-600">Registered since 2001 &middot; Last filing: March 2026</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">
                          &pound;
                        </span>
                        <input
                          type="number"
                          min="1"
                          value={form.amount}
                          onChange={(e) => setForm({ ...form, amount: e.target.value })}
                          className={`w-full rounded-lg border ${errors.amount ? 'border-red-300 focus:ring-red-600/20 focus:border-red-600' : 'border-slate-200 focus:ring-navy-600/20 focus:border-navy-600'} pl-8 pr-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors`}
                          placeholder="25,000"
                        />
                      </div>
                      {errors.amount && (
                        <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Issue Area
                      </label>
                      <select
                        value={form.issueArea}
                        onChange={(e) => setForm({ ...form, issueArea: e.target.value })}
                        className={`w-full rounded-lg border ${errors.issueArea ? 'border-red-300 focus:ring-red-600/20 focus:border-red-600' : 'border-slate-200 focus:ring-navy-600/20 focus:border-navy-600'} px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 transition-colors appearance-none bg-white`}
                      >
                        <option value="">Select an issue area</option>
                        {issueAreas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                      {errors.issueArea && (
                        <p className="text-xs text-red-500 mt-1">{errors.issueArea}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Purpose of Grant
                      </label>
                      <textarea
                        rows={3}
                        value={form.purpose}
                        onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                        className={`w-full rounded-lg border ${errors.purpose ? 'border-red-300 focus:ring-red-600/20 focus:border-red-600' : 'border-slate-200 focus:ring-navy-600/20 focus:border-navy-600'} px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors resize-none`}
                        placeholder="Describe the intended use of funds..."
                      />
                      {errors.purpose && (
                        <p className="text-xs text-red-500 mt-1">{errors.purpose}</p>
                      )}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2.5 rounded-lg bg-navy-600 text-white text-sm font-medium hover:bg-navy-700 transition-colors shadow-sm"
                      >
                        Submit Request
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
