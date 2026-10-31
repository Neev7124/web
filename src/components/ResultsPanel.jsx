import { CheckCircle2, MousePointerClick } from "lucide-react";
import { getFindingKey } from "../utils/formatters";
import AnalysisSummary from "./AnalysisSummary";
import ErrorState from "./ErrorState";
import EvidencePanel from "./EvidencePanel";
import FindingCard from "./FindingCard";
import LoadingState from "./LoadingState";

export default function ResultsPanel({ status, result, error, selectedKey, onSelect, onRetry }) {
  if (status === "loading") return <LoadingState />;
  if (status === "error") return <ErrorState error={error} onRetry={onRetry} />;
  if (status === "success" && result) {
    return <AnalysisResults result={result} selectedKey={selectedKey} onSelect={onSelect} />;
  }
  return <IdleState />;
}

function IdleState() {
  return (
    <div className="rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
      <p className="text-sm font-medium text-zinc-900">No analysis yet</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-zinc-500">
        Enter a public GitHub repository URL and a pull request number to check for outdated
        documentation.
      </p>
    </div>
  );
}

function AnalysisResults({ result, selectedKey, onSelect }) {
  const findings = result.findings;

  if (findings.length === 0) {
    return (
      <div className="space-y-5">
        <AnalysisSummary status={result.status} summary={result.summary} />
        <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-5 sm:p-6">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-zinc-900">
              No documentation drift detected by this analysis
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              This does not prove the documentation is complete or fully accurate.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const selectedIndex = findings.findIndex(
    (finding, index) => getFindingKey(finding, index) === selectedKey,
  );
  const selected = selectedIndex >= 0 ? findings[selectedIndex] : null;

  return (
    <div className="space-y-5">
      <AnalysisSummary status={result.status} summary={result.summary} />

      <div className="grid gap-5 lg:grid-cols-5">
        <ul aria-label="Findings" className="space-y-3 lg:col-span-3">
          {findings.map((finding, index) => {
            const key = getFindingKey(finding, index);
            return (
              <li key={key}>
                <FindingCard
                  finding={finding}
                  selected={key === selectedKey}
                  onSelect={() => onSelect(key)}
                />
              </li>
            );
          })}
        </ul>

        <div className="lg:col-span-2">
          {selected ? (
            <EvidencePanel finding={selected} onClose={() => onSelect(null)} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center lg:sticky lg:top-6">
              <MousePointerClick className="h-5 w-5 text-zinc-400" aria-hidden="true" />
              <p className="text-sm text-zinc-500">Select a finding to inspect its evidence.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
