import { useCallback, useEffect, useRef, useState } from "react";
import { getHealth, getModelStatus } from "../services/api";

const CHECKING_MODEL = { state: "checking", provider: null, model: null, message: "" };
const UNKNOWN_MODEL = {
  state: "unknown",
  provider: null,
  model: null,
  message: "Could not read model status.",
};

function toModelState(data) {
  if (!data || typeof data.available !== "boolean") return UNKNOWN_MODEL;
  return {
    state: data.available ? "available" : "unavailable",
    provider: data.provider ?? null,
    model: data.model ?? null,
    message: data.message ?? "",
  };
}

/**
 * Checks backend health and Ollama/Qwen model status once on load.
 * No polling; call `refresh` to check again.
 */
export function useBackendStatus() {
  const [backend, setBackend] = useState("checking"); // checking | online | offline
  const [model, setModel] = useState(CHECKING_MODEL);
  const latestRequest = useRef(0);

  const refresh = useCallback(async () => {
    const requestId = ++latestRequest.current;
    setBackend("checking");
    setModel(CHECKING_MODEL);

    const [health, status] = await Promise.allSettled([getHealth(), getModelStatus()]);
    if (requestId !== latestRequest.current) return; // a newer check superseded this one

    const isOnline = health.status === "fulfilled" && health.value?.status === "ok";
    setBackend(isOnline ? "online" : "offline");
    setModel(status.status === "fulfilled" ? toModelState(status.value) : UNKNOWN_MODEL);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { backend, model, refresh };
}
