import { ChevronRight } from "lucide-react";
import { formatConfidence, formatLabel, formatLocation } from "../utils/formatters";
import SeverityBadge from "./SeverityBadge";

export default function FindingCard({ finding, selected, onSelect }) {
  const confidence = formatConfidence(finding.confidence);

  return (
    <article
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      className={`group cursor-pointer rounded-xl border bg-white p-4 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 ${
        selected ? "border-zinc-900 shadow-sm" : "border-zinc-200 hover:border-zinc-300"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <SeverityBadge severity={finding.severity} />
          <span className="text-xs font-medium text-zinc-500">
            {formatLabel(finding.type) || "Finding"}
          </span>
        </div>
        {confidence && (
          <span className="text-xs tabular-nums text-zinc-500">Confidence {confidence}</span>
        )}
      </div>

      <dl className="mt-3 grid grid-cols-[3.5rem_1fr] gap-x-3 gap-y-1.5 text-sm">
        <dt className="text-zinc-500">Docs</dt>
        <dd className="min-w-0 break-all font-mono text-xs text-zinc-800">
          {formatLocation(finding.docs_file, finding.docs_line)}
        </dd>

        <dt className="text-zinc-500">Code</dt>
        <dd className="min-w-0 break-all font-mono text-xs text-zinc-800">
          {formatLocation(finding.code_file, finding.code_line)}
        </dd>
      </dl>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-600">
        {finding.explanation || "No explanation provided."}
      </p>

      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-zinc-900">
        View evidence
        <ChevronRight
          className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </article>
  );
}
