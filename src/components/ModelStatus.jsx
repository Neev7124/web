import StatusPill from "./StatusPill";

const STATES = {
  checking: { value: "Checking…", tone: "neutral", pulse: true },
  available: { value: "Available", tone: "success" },
  unavailable: { value: "Unavailable", tone: "warning" },
  unknown: { value: "Unknown", tone: "neutral" },
};

export default function ModelStatus({ model }) {
  const config = STATES[model.state] ?? STATES.unknown;
  const modelName = [model.provider, model.model].filter(Boolean).join(" · ");

  const detail =
    model.state === "unavailable"
      ? "AI-assisted analysis may not run. Findings can be limited."
      : modelName || model.message || null;

  return (
    <div title={model.message || undefined}>
      <StatusPill
        label="AI model"
        value={config.value}
        detail={detail}
        tone={config.tone}
        pulse={config.pulse}
      />
    </div>
  );
}
