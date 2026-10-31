const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") || "http://localhost:8000";

const DEFAULT_TIMEOUT_MS = 10_000;
const ANALYZE_TIMEOUT_MS = 150_000; // analysis fetches a PR and runs the model

export class ApiError extends Error {
  /**
   * @param {string} message  Safe, user-facing message.
   * @param {object} options
   * @param {number|null} options.status
   * @param {"network"|"timeout"|"http"|"invalid"} options.kind
   */
  constructor(message, { status = null, kind = "http" } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.kind = kind;
  }
}

async function readJson(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** Turns FastAPI-style `detail` (string or validation array) into one readable message. */
function extractMessage(data, status) {
  const detail = data?.detail ?? data?.message;

  if (typeof detail === "string" && detail.trim()) return detail;

  if (Array.isArray(detail)) {
    const messages = detail.map((item) => item?.msg).filter(Boolean);
    if (messages.length > 0) return messages.join(" ");
  }

  if (status === 429) {
    return "GitHub rate limit reached. Wait a few minutes and try again.";
  }

  return `The request failed (status ${status}).`;
}

async function request(path, { method = "GET", body, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    if (err?.name === "AbortError") {
      throw new ApiError(
        "The request timed out. The analysis may still be running on the server.",
        { kind: "timeout" },
      );
    }
    throw new ApiError("Could not reach the DocGuard backend. Check that it is running.", {
      kind: "network",
    });
  } finally {
    clearTimeout(timer);
  }

  const data = await readJson(response);

  if (!response.ok) {
    throw new ApiError(extractMessage(data, response.status), {
      status: response.status,
      kind: "http",
    });
  }

  return data;
}

function normalizeAnalysis(data) {
  const isValid =
    data &&
    typeof data === "object" &&
    Array.isArray(data.findings) &&
    data.summary &&
    typeof data.summary === "object";

  if (!isValid) {
    throw new ApiError("The backend returned an unexpected analysis response.", {
      kind: "invalid",
    });
  }
  return data;
}

/** GET /health */
export function getHealth() {
  return request("/health");
}

/** GET /api/model-status */
export function getModelStatus() {
  return request("/api/model-status");
}

/** POST /api/analyze — payload: { repo_url, pr_number } */
export async function analyzePullRequest(payload) {
  const data = await request("/api/analyze", {
    method: "POST",
    body: payload,
    timeoutMs: ANALYZE_TIMEOUT_MS,
  });
  return normalizeAnalysis(data);
}
