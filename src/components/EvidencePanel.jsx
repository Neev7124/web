import { Code2, FileText, X } from "lucide-react";
import { formatConfidence, formatLabel, formatLocation } from "../utils/formatters";
import SeverityBadge from "./SeverityBadge";

export default function EvidencePanel({ finding, onClose }) {
  const confidence = formatConfidence(finding.confidence);

  return (
    <section
      aria-label="Finding evidence"
      className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm lg:sticky lg:top-6"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <SeverityBadge severity={finding.severity} />
          <h3 className="text-sm font-semibold">{formatLabel(finding.type) || "Finding"}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close evidence"
          className="shrink-0 rounded-md p-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </header>

      <div className="mt-5 space-y-6">
        <EvidenceBlock
          icon={FileText}
          title="Documentation"
          location={formatLocation(finding.docs_file, finding.docs_line)}
          valueLabel="Documented value"
          value={finding.documented_value}
        />

        <EvidenceBlock
          icon={Code2}
          title="Code"
          location={formatLocation(finding.code_file, finding.code_line)}
          valueLabel="Actual value"
          value={finding.actual_value}
        />

        <TextBlock title="Explanation" text={finding.explanation} />

        <TextBlock
          title="Suggested correction"
          text={finding.suggestion}
          note="Review before applying. DocGuard does not change files automatically."
        />
      </div>

      {confidence && (
        <p className="mt-6 border-t border-zinc-100 pt-4 text-xs text-zinc-500">
          Model confidence: {confidence}
        </p>
      )}
    </section>
  );
}

function EvidenceBlock({ icon: Icon, title, location, valueLabel, value }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {title}
      </div>
      <p className="mt-1.5 break-all font-mono text-xs text-zinc-700">{location}</p>
      <p className="mt-3 text-xs text-zinc-500">{valueLabel}</p>
      <pre className="mt-1 overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-zinc-50 p-3 font-mono text-sm text-zinc-900 ring-1 ring-inset ring-zinc-200">
        {value || "Not provided"}
      </pre>
    </div>
  );
}

function TextBlock({ title, text, note }) {
  return (
    <div>
      <h4 className="text-xs font-medium uppercase tracking-wide text-zinc-500">{title}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-700">{text || "Not provided."}</p>
      {note && <p className="mt-2 text-xs text-zinc-500">{note}</p>}
    </div>
  );
}
