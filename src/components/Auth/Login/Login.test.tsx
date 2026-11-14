import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ACCOUNT, HOME, SIGN_IN } from '../../../constants/routes';
import { signIn } from '../../../lib/auth';
import { renderApp } from '../../../test/render';
import Login from './Login';

vi.mock('../../../lib/auth', async () => {
  const { createAuthMock } = await import('../../../test/authMock');
  return createAuthMock();
});

const routes = (
  <Routes>
    <Route path={HOME} element={<p>Home page</p>} />
    <Route path={ACCOUNT} element={<p>Account page</p>} />
    <Route path={SIGN_IN} element={<Login />} />
  </Routes>
);

beforeEach(() => {
  vi.mocked(signIn).mockReset().mockResolvedValue(undefined);
});

describe('Login', () => {
  it('disables the button until both fields are filled', async () => {
    renderApp(routes, { route: SIGN_IN });
    const button = screen.getByRole('button', { name: 'Login' });
    expect(button).toBeDisabled();
    await userEvent.type(screen.getByLabelText('Email'), 'ash@pallet.town');
    expect(button).toBeDisabled();
    await userEvent.type(screen.getByLabelText('Password'), 'secret');
    expect(button).toBeEnabled();
  });

  it('signs in and goes home', async () => {
    renderApp(routes, { route: SIGN_IN });
    await userEvent.type(screen.getByLabelText('Email'), 'ash@pallet.town');
    await userEvent.type(screen.getByLabelText('Password'), 'secret');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(signIn).toHaveBeenCalledExactlyOnceWith('ash@pallet.town', 'secret');
    expect(await screen.findByText('Home page')).toBeInTheDocument();
  });

  it('goes back to the page that required the login', async () => {
    renderApp(routes, { route: { pathname: SIGN_IN, state: { from: ACCOUNT } } });
    await userEvent.type(screen.getByLabelText('Email'), 'ash@pallet.town');
    await userEvent.type(screen.getByLabelText('Password'), 'secret');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(await screen.findByText('Account page')).toBeInTheDocument();
  });

  it('shows the error and stays on the form when the sign in fails', async () => {
    vi.mocked(signIn).mockRejectedValue(new Error('Wrong email or password.'));
    renderApp(routes, { route: SIGN_IN });
    await userEvent.type(screen.getByLabelText('Email'), 'ash@pallet.town');
    await userEvent.type(screen.getByLabelText('Password'), 'nope');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Wrong email or password.');
    expect(screen.getByRole('button', { name: 'Login' })).toBeEnabled();
  });

  it('links to sign up and to the password reset', () => {
    renderApp(routes, { route: SIGN_IN });
    expect(screen.getByRole('link', { name: 'Sign up' })).toHaveAttribute('href', '/signup');
    expect(screen.getByRole('link', { name: 'Forgot password?' })).toHaveAttribute(
      'href',
      '/resetPassword',
    );
  });

  it('closes to the home page when there is nothing to go back to', async () => {
    renderApp(routes, { route: SIGN_IN });
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.getByText('Home page')).toBeInTheDocument();
  });
});
