export default function ProgressBar({ percent }) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)))
  return (
    <div className="mt-8">
      <p className="text-lg text-slate-800 mb-2">Progress</p>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-3 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-slate-900 rounded-full transition-all"
            style={{ width: `${clamped}%` }}
          />
        </div>
        <span className="text-sm text-slate-500 w-10 text-right">{clamped}%</span>
      </div>
    </div>
  )
}
