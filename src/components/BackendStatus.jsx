import StatusPill from "./StatusPill";

const STATES = {
  checking: { value: "Checking…", tone: "neutral", pulse: true },
  online: { value: "Online", tone: "success" },
  offline: { value: "Unreachable", tone: "danger" },
};

export default function BackendStatus({ state }) {
  const config = STATES[state] ?? STATES.checking;

  return (
    <StatusPill
      label="Backend"
      value={config.value}
      detail={state === "offline" ? "Start the API server and check VITE_API_BASE_URL." : null}
      tone={config.tone}
      pulse={config.pulse}
    />
  );
}
