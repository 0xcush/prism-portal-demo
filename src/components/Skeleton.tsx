export function SkeletonCard() {
  return (
    <div className="animate-pulse bg-slate-100 rounded-xl h-32 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-slate-200 rounded-lg" />
        <div className="w-16 h-5 bg-slate-200 rounded-full" />
      </div>
      <div className="w-20 h-3 bg-slate-200 rounded mb-2" />
      <div className="w-32 h-6 bg-slate-200 rounded" />
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="animate-pulse bg-slate-100 rounded-xl h-64 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="w-36 h-5 bg-slate-200 rounded" />
        <div className="flex gap-2">
          <div className="w-10 h-7 bg-slate-200 rounded-lg" />
          <div className="w-10 h-7 bg-slate-200 rounded-lg" />
          <div className="w-10 h-7 bg-slate-200 rounded-lg" />
        </div>
      </div>
      <div className="flex items-end gap-2 h-36">
        {[40, 55, 45, 60, 50, 70, 65, 75, 68, 80, 72, 85].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-slate-200 rounded-t"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="animate-pulse bg-slate-100 rounded-xl h-48 p-6">
      <div className="w-36 h-5 bg-slate-200 rounded mb-4" />
      <div className="space-y-3">
        <div className="flex gap-4">
          <div className="w-20 h-3 bg-slate-200 rounded" />
          <div className="flex-1 h-3 bg-slate-200 rounded" />
          <div className="w-16 h-3 bg-slate-200 rounded" />
          <div className="w-20 h-3 bg-slate-200 rounded" />
        </div>
        <div className="flex gap-4">
          <div className="w-20 h-3 bg-slate-200 rounded" />
          <div className="flex-1 h-3 bg-slate-200 rounded" />
          <div className="w-16 h-3 bg-slate-200 rounded" />
          <div className="w-20 h-3 bg-slate-200 rounded" />
        </div>
        <div className="flex gap-4">
          <div className="w-20 h-3 bg-slate-200 rounded" />
          <div className="flex-1 h-3 bg-slate-200 rounded" />
          <div className="w-16 h-3 bg-slate-200 rounded" />
          <div className="w-20 h-3 bg-slate-200 rounded" />
        </div>
        <div className="flex gap-4">
          <div className="w-20 h-3 bg-slate-200 rounded" />
          <div className="flex-1 h-3 bg-slate-200 rounded" />
          <div className="w-16 h-3 bg-slate-200 rounded" />
          <div className="w-20 h-3 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
}
