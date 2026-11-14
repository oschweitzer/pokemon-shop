import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { signOutUser, watchUser } from './lib/auth';
import { renderApp } from './test/render';
import App from './App';

vi.mock('./lib/auth', async () => {
  const { createAuthMock } = await import('./test/authMock');
  return createAuthMock();
});

function signInAs(email: string | null) {
  vi.mocked(watchUser).mockImplementation((callback) => {
    callback(email);
    return () => undefined;
  });
}

beforeEach(() => {
  signInAs(null);
  vi.mocked(signOutUser).mockReset().mockResolvedValue(undefined);
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ count: 1, results: [] }),
      }),
    ),
  );
});

describe('App', () => {
  it('shows the home page without the cart', () => {
    renderApp(<App />);
    expect(screen.getByText(/Pick your favorite Pokémon/)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Cart/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'My account' })).not.toBeInTheDocument();
  });

  it('navigates to the shop, where the cart shows the number of Pokémon', async () => {
    renderApp(<App />, { state: { cart: { items: [{ id: 25, name: 'pikachu', quantity: 3 }] } } });
    await userEvent.click(screen.getByRole('link', { name: 'Shop' }));
    expect(await screen.findByRole('heading', { name: 'Pokémon' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Cart, 3 items' })).toBeInTheDocument();
  });

  it('opens the login modal and dims the page', async () => {
    renderApp(<App />);
    await userEvent.click(screen.getByRole('button', { name: 'Sign in / Sign up' }));
    expect(await screen.findByRole('dialog', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('main').className).toMatch(/Modal/);
  });

  it('shows the signed-in user, and the account link', () => {
    signInAs('ash@pallet.town');
    renderApp(<App />);
    expect(screen.getByText('ash@pallet.town')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'My account' })).toBeInTheDocument();
  });

  it('logs out and goes home', async () => {
    signInAs('ash@pallet.town');
    renderApp(<App />, { route: '/cart' });
    await userEvent.click(screen.getByRole('button', { name: 'Logout' }));
    expect(signOutUser).toHaveBeenCalledOnce();
    expect(await screen.findByText(/Pick your favorite Pokémon/)).toBeInTheDocument();
  });

  it('falls back to the home page on an unknown route', () => {
    renderApp(<App />, { route: '/nope' });
    expect(screen.getByText(/Pick your favorite Pokémon/)).toBeInTheDocument();
  });
});
