import { FirebaseError, initializeApp } from 'firebase/app';
import {
  type Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from 'firebase/auth';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/** False when the Firebase variables are missing: the shop then works without accounts. */
export const isAuthConfigured = Object.values(config).every(Boolean);

let auth: Auth | undefined;

function getAuthInstance(): Auth {
  if (!isAuthConfigured) {
    throw new Error('Accounts are disabled: Firebase is not configured.');
  }
  auth ??= getAuth(initializeApp(config));
  return auth;
}

const MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'Wrong email or password.',
  'auth/user-not-found': 'Wrong email or password.',
  'auth/wrong-password': 'Wrong email or password.',
  'auth/email-already-in-use': 'An account already exists with this email.',
  'auth/weak-password': 'This password is too weak.',
  'auth/too-many-requests': 'Too many attempts. Try again later.',
  'auth/requires-recent-login': 'Sign in again before changing your password.',
  'auth/network-request-failed': 'Network error. Check your connection.',
};

/** A message that is safe and useful to show to the user. */
export function authErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    return MESSAGES[error.code] ?? 'Something went wrong. Please try again.';
  }
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
}

export async function signUp(email: string, password: string): Promise<void> {
  await createUserWithEmailAndPassword(getAuthInstance(), email, password);
}

export async function signIn(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(getAuthInstance(), email, password);
}

export async function signOutUser(): Promise<void> {
  await signOut(getAuthInstance());
}

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(getAuthInstance(), email);
}

export async function changePassword(password: string): Promise<void> {
  const user = getAuthInstance().currentUser;
  if (!user) {
    throw new Error('You are not signed in.');
  }
  await updatePassword(user, password);
}

/** Calls `callback` with the email of the signed-in user, or `null`. Returns the unsubscribe function. */
export function watchUser(callback: (email: string | null) => void): () => void {
  if (!isAuthConfigured) {
    callback(null);
    return () => undefined;
  }
  return onAuthStateChanged(getAuthInstance(), (user) => {
    callback(user?.email ?? null);
  });
}
