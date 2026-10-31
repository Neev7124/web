const SEVERITY_META = {
  high: {
    label: "High",
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-700 ring-red-200",
  },
  medium: {
    label: "Medium",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-800 ring-amber-200",
  },
  low: {
    label: "Low",
    dot: "bg-sky-500",
    badge: "bg-sky-50 text-sky-700 ring-sky-200",
  },
};

const UNKNOWN_SEVERITY_BADGE = "bg-zinc-100 text-zinc-600 ring-zinc-200";
const UNKNOWN_SEVERITY_DOT = "bg-zinc-400";

/** Capitalizes a snake_case or kebab-case label, e.g. "api_reference" → "Api reference". */
export function formatLabel(value) {
  if (typeof value !== "string" || !value.trim()) return "";
  const text = value.replace(/[_-]+/g, " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Unknown severities get neutral styling and their own label. */
export function getSeverityMeta(severity) {
  const key = typeof severity === "string" ? severity.toLowerCase() : "";
  if (SEVERITY_META[key]) return SEVERITY_META[key];

  return {
    label: formatLabel(severity) || "Unknown",
    dot: UNKNOWN_SEVERITY_DOT,
    badge: UNKNOWN_SEVERITY_BADGE,
  };
}

export function formatLine(line) {
  return Number.isInteger(line) && line > 0 ? `Line ${line}` : "Line unavailable";
}

export function formatLocation(file, line) {
  return `${file || "Unknown file"} · ${formatLine(line)}`;
}

/** Shows confidence as a percentage only when the value is a valid 0–1 number. */
export function formatConfidence(value) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 1) {
    return null;
  }
  return `${Math.round(value * 100)}%`;
}

export function formatCount(count, noun) {
  return `${count} ${count === 1 ? noun : `${noun}s`}`;
}

export function formatStatus(status) {
  return formatLabel(status) || "Unknown";
}

/** Stable key: the backend id when present, otherwise a composite fallback. */
export function getFindingKey(finding, index) {
  return finding.id ?? `${finding.docs_file}:${finding.docs_line}:${index}`;
}
