import { ArrowRight, Loader2 } from "lucide-react";

const INPUT_BASE =
  "mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-500";
const INPUT_VALID = "border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900/10";
const INPUT_INVALID = "border-red-300 focus:border-red-500 focus:ring-red-500/10";

export default function RepoPrForm({ values, errors, isSubmitting, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="analyze-heading"
      className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5">
        <h2 id="analyze-heading" className="text-base font-semibold tracking-tight">
          Analyze a pull request
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Enter a public GitHub repository and the pull request number.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
        <div>
          <label htmlFor="repoUrl" className="text-sm font-medium text-zinc-700">
            Repository URL
          </label>
          <input
            id="repoUrl"
            name="repoUrl"
            type="text"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            value={values.repoUrl}
            onChange={onChange}
            disabled={isSubmitting}
            placeholder="https://github.com/owner/repository"
            aria-invalid={Boolean(errors.repoUrl)}
            aria-describedby={errors.repoUrl ? "repoUrl-error" : undefined}
            className={`${INPUT_BASE} ${errors.repoUrl ? INPUT_INVALID : INPUT_VALID}`}
          />
          {errors.repoUrl && (
            <p id="repoUrl-error" className="mt-1.5 text-xs text-red-600">
              {errors.repoUrl}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="prNumber" className="text-sm font-medium text-zinc-700">
            PR number
          </label>
          <input
            id="prNumber"
            name="prNumber"
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            value={values.prNumber}
            onChange={onChange}
            disabled={isSubmitting}
            placeholder="42"
            aria-invalid={Boolean(errors.prNumber)}
            aria-describedby={errors.prNumber ? "prNumber-error" : undefined}
            className={`${INPUT_BASE} ${errors.prNumber ? INPUT_INVALID : INPUT_VALID}`}
          />
          {errors.prNumber && (
            <p id="prNumber-error" className="mt-1.5 text-xs text-red-600">
              {errors.prNumber}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Analyzing…
            </>
          ) : (
            <>
              Analyze PR
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
