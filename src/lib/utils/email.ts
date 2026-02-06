export function isValidEmail(email: string) {
  // Pragmatic client-side validation (server-side will still validate).
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

