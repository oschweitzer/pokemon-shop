export function validateEmail(email: string): boolean {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(email);
}

/**
 * 8 to 15 characters with at least one lowercase letter, one uppercase letter,
 * one digit and one special character, and no whitespace.
 */
export function validatePassword(password: string): boolean {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password);
}
