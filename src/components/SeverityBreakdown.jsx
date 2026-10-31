import { getSeverityMeta } from "../utils/formatters";

const LEVELS = ["high", "medium", "low"];

export default function SeverityBreakdown({ counts }) {
  return (
    <dl className="grid grid-cols-3 gap-2">
      {LEVELS.map((level) => {
        const meta = getSeverityMeta(level);
        return (
          <div
            key={level}
            className="min-w-[88px] rounded-lg border border-zinc-200 px-4 py-2.5 text-center"
          >
            <dt className="flex items-center justify-center gap-1.5 text-xs text-zinc-500">
              <span className={`h-2 w-2 rounded-full ${meta.dot}`} aria-hidden="true" />
              {meta.label}
            </dt>
            <dd className="mt-0.5 text-lg font-semibold tabular-nums">{counts[level] ?? "—"}</dd>
          </div>
        );
      })}
    </dl>
  );
}
