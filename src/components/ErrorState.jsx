import { AlertCircle, RotateCcw } from "lucide-react";

const TITLES = {
  network: "Backend unreachable",
  timeout: "Request timed out",
  invalid: "Unexpected response",
  http: "Analysis did not complete",
};

const HINTS = {
  network: "Start the backend, then check that VITE_API_BASE_URL in frontend/.env.local points to it.",
  timeout: "Your form values are preserved. You can retry the same request.",
  invalid: "The backend response did not match the expected format. Details are in the browser console.",
  http: "Check the repository URL and PR number, then try again.",
};

export default function ErrorState({ error, onRetry }) {
  const kind = error?.kind ?? "http";

  return (
    <div
      role="alert"
      className="flex flex-col gap-4 rounded-xl border border-red-200 bg-white p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6"
    >
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-900">{TITLES[kind] ?? TITLES.http}</p>
          <p className="mt-1 break-words text-sm text-zinc-700">
            {error?.message ?? "Something went wrong."}
          </p>
          <p className="mt-2 text-xs text-zinc-500">{HINTS[kind] ?? HINTS.http}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Retry
      </button>
    </div>
  );
}
