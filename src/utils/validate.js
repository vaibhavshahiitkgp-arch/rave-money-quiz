// Light validation only — catches obviously fake/malformed entries, not a
// true reachability check. See project brief: no OTP verification for v1.

export function isValidName(name) {
  return typeof name === "string" && name.trim().length >= 2;
}

// Accepts a plausible Indian mobile number: optional +91/91 prefix, then a
// 10-digit number starting 6-9. Strips spaces/hyphens before checking.
export function isValidIndianMobile(value) {
  if (typeof value !== "string") return false;
  const digitsOnly = value.replace(/[\s-]/g, "");
  return /^(?:\+?91)?[6-9]\d{9}$/.test(digitsOnly);
}

export function normalizeIndianMobile(value) {
  const digitsOnly = value.replace(/[\s-]/g, "").replace(/^\+?91/, "");
  return `91${digitsOnly}`;
}
