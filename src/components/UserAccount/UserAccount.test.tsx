import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ACCOUNT, SIGN_IN } from '../../constants/routes';
import { changePassword } from '../../lib/auth';
import { renderApp } from '../../test/render';
import UserAccount from './UserAccount';

vi.mock('../../lib/auth', async () => {
  const { createAuthMock } = await import('../../test/authMock');
  return createAuthMock();
});

const routes = (
  <Routes>
    <Route path={ACCOUNT} element={<UserAccount />} />
    <Route path={SIGN_IN} element={<p>Sign in page</p>} />
  </Routes>
);
const signedIn = { auth: { email: 'ash@pallet.town', ready: true } };

beforeEach(() => {
  vi.mocked(changePassword).mockReset().mockResolvedValue(undefined);
});

describe('UserAccount', () => {
  it('waits until the sign in state is known', () => {
    renderApp(routes, { route: ACCOUNT });
    expect(screen.queryByText('Sign in page')).not.toBeInTheDocument();
    expect(screen.queryByText('Account parameters')).not.toBeInTheDocument();
  });

  it('redirects to the sign in page when nobody is signed in', () => {
    renderApp(routes, { route: ACCOUNT, state: { auth: { email: null, ready: true } } });
    expect(screen.getByText('Sign in page')).toBeInTheDocument();
  });

  it('shows the email of the user', () => {
    renderApp(routes, { route: ACCOUNT, state: signedIn });
    expect(screen.getByText(/ash@pallet\.town/)).toBeInTheDocument();
  });

  it('updates the password', async () => {
    renderApp(routes, { route: ACCOUNT, state: signedIn });
    await userEvent.click(screen.getByRole('button', { name: 'Update password' }));
    const update = screen.getByRole('button', { name: 'Update' });
    expect(update).toBeDisabled();
    await userEvent.type(screen.getByLabelText('New password'), 'Pikachu#25');
    await userEvent.click(update);
    expect(changePassword).toHaveBeenCalledExactlyOnceWith('Pikachu#25');
    expect(await screen.findByText('Password successfully updated.')).toBeInTheDocument();
    expect(screen.queryByLabelText('New password')).not.toBeInTheDocument();
  });

  it('shows the error when the update fails, and can be cancelled', async () => {
    vi.mocked(changePassword).mockRejectedValue(new Error('Sign in again before changing.'));
    renderApp(routes, { route: ACCOUNT, state: signedIn });
    await userEvent.click(screen.getByRole('button', { name: 'Update password' }));
    await userEvent.type(screen.getByLabelText('New password'), 'Pikachu#25');
    await userEvent.click(screen.getByRole('button', { name: 'Update' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Sign in again');
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByLabelText('New password')).not.toBeInTheDocument();
  });
});
