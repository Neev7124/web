import { useCallback, useRef, useState } from "react";
import { analyzePullRequest } from "../services/api";

const IDLE = { status: "idle", result: null, error: null };

/**
 * Manages the POST /api/analyze lifecycle.
 * Blocks duplicate submissions and remembers the last payload for retry.
 */
export function useAnalysis() {
  const [state, setState] = useState(IDLE);
  const inFlight = useRef(false);
  const lastPayload = useRef(null);

  const submit = useCallback(async (payload) => {
    if (inFlight.current) return;

    inFlight.current = true;
    lastPayload.current = payload;
    setState({ status: "loading", result: null, error: null });

    try {
      const result = await analyzePullRequest(payload);
      setState({ status: "success", result, error: null });
    } catch (error) {
      console.error("[DocGuard] Analysis failed:", error);
      setState({ status: "error", result: null, error });
    } finally {
      inFlight.current = false;
    }
  }, []);

  const retry = useCallback(() => {
    if (lastPayload.current) submit(lastPayload.current);
  }, [submit]);

  return {
    ...state,
    isLoading: state.status === "loading",
    submit,
    retry,
  };
}
