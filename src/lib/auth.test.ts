import { FirebaseError } from 'firebase/app';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const sdk = vi.hoisted(() => ({
  initializeApp: vi.fn(() => ({ name: 'app' })),
  getAuth: vi.fn(() => ({ currentUser: null as { email: string } | null })),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  updatePassword: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));

vi.mock('firebase/app', async (importOriginal) => ({
  ...(await importOriginal<typeof import('firebase/app')>()),
  initializeApp: sdk.initializeApp,
}));
vi.mock('firebase/auth', () => ({
  getAuth: sdk.getAuth,
  createUserWithEmailAndPassword: sdk.createUserWithEmailAndPassword,
  signInWithEmailAndPassword: sdk.signInWithEmailAndPassword,
  signOut: sdk.signOut,
  sendPasswordResetEmail: sdk.sendPasswordResetEmail,
  updatePassword: sdk.updatePassword,
  onAuthStateChanged: sdk.onAuthStateChanged,
}));

const ENV = {
  VITE_FIREBASE_API_KEY: 'key',
  VITE_FIREBASE_AUTH_DOMAIN: 'demo.firebaseapp.com',
  VITE_FIREBASE_PROJECT_ID: 'demo',
  VITE_FIREBASE_APP_ID: '1:1:web:1',
};

async function loadAuth(configured: boolean) {
  vi.resetModules();
  for (const [name, value] of Object.entries(ENV)) {
    vi.stubEnv(name, configured ? value : '');
  }
  return import('./auth');
}

beforeEach(() => {
  vi.unstubAllEnvs();
  Object.values(sdk).forEach((mock) => {
    mock.mockClear();
  });
});

describe('without Firebase configuration', () => {
  it('is not configured', async () => {
    expect((await loadAuth(false)).isAuthConfigured).toBe(false);
  });

  it('refuses to talk to Firebase', async () => {
    const auth = await loadAuth(false);
    await expect(auth.signIn('a@b.co', 'x')).rejects.toThrow('Firebase is not configured');
    expect(sdk.initializeApp).not.toHaveBeenCalled();
  });

  it('reports nobody signed in', async () => {
    const auth = await loadAuth(false);
    const callback = vi.fn();
    const unsubscribe = auth.watchUser(callback);
    expect(callback).toHaveBeenCalledExactlyOnceWith(null);
    unsubscribe();
    expect(sdk.onAuthStateChanged).not.toHaveBeenCalled();
  });
});

describe('with Firebase configuration', () => {
  it('initializes Firebase once, with the environment values', async () => {
    const auth = await loadAuth(true);
    expect(auth.isAuthConfigured).toBe(true);
    await auth.signIn('ash@pallet.town', 'secret');
    await auth.signOutUser();
    expect(sdk.initializeApp).toHaveBeenCalledExactlyOnceWith({
      apiKey: 'key',
      authDomain: 'demo.firebaseapp.com',
      projectId: 'demo',
      appId: '1:1:web:1',
    });
  });

  it('calls the Firebase functions', async () => {
    const auth = await loadAuth(true);
    await auth.signUp('ash@pallet.town', 'pw');
    await auth.signIn('ash@pallet.town', 'pw');
    await auth.resetPassword('ash@pallet.town');
    expect(sdk.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      'ash@pallet.town',
      'pw',
    );
    expect(sdk.signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      'ash@pallet.town',
      'pw',
    );
    expect(sdk.sendPasswordResetEmail).toHaveBeenCalledWith(expect.anything(), 'ash@pallet.town');
  });

  it('changes the password of the current user', async () => {
    const user = { email: 'ash@pallet.town' };
    sdk.getAuth.mockReturnValueOnce({ currentUser: user });
    const auth = await loadAuth(true);
    await auth.changePassword('new');
    expect(sdk.updatePassword).toHaveBeenCalledExactlyOnceWith(user, 'new');
  });

  it('refuses to change the password when nobody is signed in', async () => {
    const auth = await loadAuth(true);
    await expect(auth.changePassword('new')).rejects.toThrow('You are not signed in.');
  });

  it('forwards the email of the signed-in user', async () => {
    sdk.onAuthStateChanged.mockImplementation(
      (_auth: unknown, next: (user: { email: string | null } | null) => void) => {
        next({ email: 'ash@pallet.town' });
        next(null);
        return () => undefined;
      },
    );
    const auth = await loadAuth(true);
    const callback = vi.fn();
    auth.watchUser(callback);
    expect(callback.mock.calls).toEqual([['ash@pallet.town'], [null]]);
  });
});

describe('authErrorMessage', () => {
  it('translates known Firebase errors', async () => {
    const { authErrorMessage } = await loadAuth(true);
    expect(authErrorMessage(new FirebaseError('auth/invalid-credential', 'raw'))).toBe(
      'Wrong email or password.',
    );
    expect(authErrorMessage(new FirebaseError('auth/email-already-in-use', 'raw'))).toMatch(
      /already exists/,
    );
  });

  it('hides unknown Firebase errors', async () => {
    const { authErrorMessage } = await loadAuth(true);
    expect(authErrorMessage(new FirebaseError('auth/internal-error', 'secret detail'))).toBe(
      'Something went wrong. Please try again.',
    );
  });

  it('passes other errors through', async () => {
    const { authErrorMessage } = await loadAuth(true);
    expect(authErrorMessage(new Error('boom'))).toBe('boom');
    expect(authErrorMessage('weird')).toBe('Something went wrong. Please try again.');
  });
});
