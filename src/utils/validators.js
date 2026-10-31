// Public GitHub repository URL: https://github.com/owner/repository (optional trailing slash)
const REPO_PATTERN = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;

export function validateRepoUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return "Enter a repository URL.";
  if (!REPO_PATTERN.test(trimmed)) {
    return "Use the format https://github.com/owner/repository.";
  }
  return "";
}

export function validatePrNumber(value) {
  const trimmed = String(value).trim();
  if (!trimmed) return "Enter a pull request number.";
  if (!/^\d+$/.test(trimmed) || Number(trimmed) < 1) {
    return "Use a positive whole number.";
  }
  return "";
}

/** Returns only the fields that have errors. An empty object means valid. */
export function validateForm(values) {
  const errors = {};
  const repoError = validateRepoUrl(values.repoUrl);
  const prError = validatePrNumber(values.prNumber);

  if (repoError) errors.repoUrl = repoError;
  if (prError) errors.prNumber = prError;

  return errors;
}
