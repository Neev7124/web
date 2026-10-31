import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center"
    >
      <Loader2 className="h-6 w-6 animate-spin text-zinc-500" aria-hidden="true" />
      <p className="text-sm font-medium text-zinc-900">Analyzing pull request…</p>
      <p className="max-w-sm text-sm text-zinc-500">
        Fetching changed files and checking documentation. Large pull requests can take a minute
        or two.
      </p>
    </div>
  );
}
