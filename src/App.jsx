import { useState } from "react";
import AppHeader from "./components/AppHeader";
import BackendStatus from "./components/BackendStatus";
import ModelStatus from "./components/ModelStatus";
import RepoPrForm from "./components/RepoPrForm";
import ResultsPanel from "./components/ResultsPanel";
import { useAnalysis } from "./hooks/useAnalysis";
import { useBackendStatus } from "./hooks/useBackendStatus";
import { validateForm } from "./utils/validators";

const INITIAL_FORM = { repoUrl: "", prNumber: "" };

export default function App() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [selectedKey, setSelectedKey] = useState(null);

  const { backend, model } = useBackendStatus();
  const analysis = useAnalysis();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (analysis.isLoading) return;

    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSelectedKey(null);
    analysis.submit({
      repo_url: form.repoUrl.trim(),
      pr_number: Number(form.prNumber.trim()),
    });
  };

  const handleRetry = () => {
    setSelectedKey(null);
    analysis.retry();
  };

  return (
    <div className="min-h-screen">
      <AppHeader />

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        <section aria-label="System status" className="grid gap-3 sm:grid-cols-2">
          <BackendStatus state={backend} />
          <ModelStatus model={model} />
        </section>

        <RepoPrForm
          values={form}
          errors={errors}
          isSubmitting={analysis.isLoading}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        <ResultsPanel
          status={analysis.status}
          result={analysis.result}
          error={analysis.error}
          selectedKey={selectedKey}
          onSelect={setSelectedKey}
          onRetry={handleRetry}
        />
      </main>

      <footer className="mx-auto max-w-5xl px-4 pb-10 text-xs leading-relaxed text-zinc-500 sm:px-6">
        MVP scope: supported languages and file types are determined by the backend implementation.
        DocGuard reports potential drift for review and does not modify repositories.
      </footer>
    </div>
  );
}
