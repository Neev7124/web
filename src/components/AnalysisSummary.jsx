import { formatCount, formatStatus } from "../utils/formatters";
import SeverityBreakdown from "./SeverityBreakdown";

export default function AnalysisSummary({ status, summary }) {
  return (
    <section
      aria-labelledby="summary-heading"
      className="flex flex-wrap items-center justify-between gap-5 rounded-xl border border-zinc-200 bg-white p-5 sm:p-6"
    >
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          Status: {formatStatus(status)}
        </p>
        <h2 id="summary-heading" className="mt-1 text-2xl font-semibold tracking-tight">
          {formatCount(summary.total_findings ?? 0, "finding")}
        </h2>
      </div>

      <SeverityBreakdown counts={summary} />
    </section>
  );
}
