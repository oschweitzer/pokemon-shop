import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HOME, SIGN_UP } from '../../../constants/routes';
import { signUp } from '../../../lib/auth';
import { renderApp } from '../../../test/render';
import SignUp from './SignUp';

vi.mock('../../../lib/auth', async () => {
  const { createAuthMock } = await import('../../../test/authMock');
  return createAuthMock();
});

const routes = (
  <Routes>
    <Route path={HOME} element={<p>Home page</p>} />
    <Route path={SIGN_UP} element={<SignUp />} />
  </Routes>
);

beforeEach(() => {
  vi.mocked(signUp).mockReset().mockResolvedValue(undefined);
});

describe('SignUp', () => {
  it('validates the email and the password as the user types', async () => {
    renderApp(routes, { route: SIGN_UP });
    const submit = screen.getByRole('button', { name: 'Sign up' });
    expect(submit).toBeDisabled();

    await userEvent.type(screen.getByLabelText('Email'), 'ash');
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText('Email'), '@pallet.town');
    expect(screen.getByText('Valid email')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Password'), 'weak');
    expect(screen.getByText('Invalid password')).toBeInTheDocument();
    expect(submit).toBeDisabled();
    await userEvent.clear(screen.getByLabelText('Password'));
    await userEvent.type(screen.getByLabelText('Password'), 'Pikachu#25');
    expect(screen.getByText('Valid password')).toBeInTheDocument();
    expect(submit).toBeEnabled();
  });

  it('creates the account and goes home', async () => {
    renderApp(routes, { route: SIGN_UP });
    await userEvent.type(screen.getByLabelText('Email'), 'ash@pallet.town');
    await userEvent.type(screen.getByLabelText('Password'), 'Pikachu#25');
    await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));
    expect(signUp).toHaveBeenCalledExactlyOnceWith('ash@pallet.town', 'Pikachu#25');
    expect(await screen.findByText('Home page')).toBeInTheDocument();
  });

  it('shows the error when the account cannot be created', async () => {
    vi.mocked(signUp).mockRejectedValue(new Error('An account already exists with this email.'));
    renderApp(routes, { route: SIGN_UP });
    await userEvent.type(screen.getByLabelText('Email'), 'ash@pallet.town');
    await userEvent.type(screen.getByLabelText('Password'), 'Pikachu#25');
    await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('already exists');
  });
});
