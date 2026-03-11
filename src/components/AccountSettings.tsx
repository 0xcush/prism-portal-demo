import { useState } from 'react';
import { formatDate } from '../utils/format';

interface AccountSettingsProps {
  clientName: string;
  accountNumber: string;
  accountType: string;
  relationshipManager: string;
  onboardedDate: string;
  email?: string;
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-slate-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        className={`relative w-10 h-6 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 ${
          checked ? 'bg-navy-600' : 'bg-slate-200'
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

export default function AccountSettings({
  clientName,
  accountNumber,
  accountType,
  relationshipManager,
  onboardedDate,
  email,
}: AccountSettingsProps) {
  const rmEmail = email || `${relationshipManager.toLowerCase().replace(/\s+/g, '.')}@prismtrust.co.uk`;

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Profile</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Account Name</p>
              <p className="text-sm text-slate-700 font-medium">{clientName}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Account Number</p>
              <p className="text-sm text-slate-700 font-mono">{accountNumber}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Account Type</p>
              <p className="text-sm text-slate-700">{accountType}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Status</p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Member Since</p>
              <p className="text-sm text-slate-700">{formatDate(onboardedDate)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Notifications</h2>
        </div>
        <div className="px-6 divide-y divide-slate-100">
          <Toggle label="Grant status updates" defaultChecked={true} />
          <Toggle label="Statement availability" defaultChecked={true} />
          <Toggle label="Investment alerts" defaultChecked={true} />
          <Toggle label="Monthly summary email" defaultChecked={false} />
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Security</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Two-Factor Authentication</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
              <svg className="w-3.5 h-3.5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Enabled
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Last Login</span>
            <span className="text-sm text-slate-500">10 Mar 2026, 09:15 AM</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Password</span>
            <span className="text-sm text-slate-500">
              <span className="tracking-wider">{'••••••••'}</span>
              <span className="ml-2 text-xs text-slate-400">Last changed 45 days ago</span>
            </span>
          </div>
        </div>
      </div>

      {/* Relationship Manager */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Relationship Manager</h2>
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-800">{relationshipManager}</p>
          <p className="text-sm text-slate-500">{rmEmail}</p>
          <p className="text-sm text-slate-500">+44 20 7946 0958</p>
        </div>
        <button className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-navy-600 text-white text-sm font-medium hover:bg-navy-700 transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2">
          Schedule a Call
        </button>
      </div>

      {/* Connected Services */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Connected Services</h2>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Charity Commission API
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            HMRC Gift Aid
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 text-slate-500 border border-slate-200">
            Open Banking
            <span className="text-[10px] font-normal text-slate-400">Coming Soon</span>
          </span>
        </div>
      </div>
    </div>
  );
}
