export function serializeUsername(email: string): string {
  const base = email
    .split("@")[0]
    .toLowerCase()
    .replace(/\+/g, "")
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 20);

  if (!base) {
    return `user_${Date.now().toString().slice(-8)}`;
  }

  const timestamp = Date.now().toString().slice(-6); // last 6 digits

  return `${base}_${timestamp}`;
}
