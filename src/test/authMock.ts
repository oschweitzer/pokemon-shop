import { vi } from 'vitest';

/** Replacement for `lib/auth` in tests: no Firebase, everything resolves. */
export function createAuthMock(isAuthConfigured = true) {
  return {
    isAuthConfigured,
    authErrorMessage: (error: unknown) => (error instanceof Error ? error.message : 'error'),
    signIn: vi.fn(() => Promise.resolve()),
    signUp: vi.fn(() => Promise.resolve()),
    signOutUser: vi.fn(() => Promise.resolve()),
    resetPassword: vi.fn(() => Promise.resolve()),
    changePassword: vi.fn(() => Promise.resolve()),
    watchUser: vi.fn((callback: (email: string | null) => void) => {
      callback(null);
      return () => undefined;
    }),
  };
}
