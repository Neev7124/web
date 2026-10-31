const TONE_DOT = {
  success: "bg-emerald-500",
  danger: "bg-red-500",
  warning: "bg-amber-500",
  neutral: "bg-zinc-400",
};

export default function StatusPill({ label, value, detail, tone = "neutral", pulse = false }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3">
      <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
        {pulse && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-300 opacity-75" />
        )}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${TONE_DOT[tone]}`} />
      </span>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
        <p className="text-sm font-medium text-zinc-900">{value}</p>
        {detail && <p className="truncate text-xs text-zinc-500">{detail}</p>}
      </div>
    </div>
  );
}
