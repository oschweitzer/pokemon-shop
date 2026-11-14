import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { resetPassword } from '../../../lib/auth';
import { renderApp } from '../../../test/render';
import ResetPassword from './ResetPassword';

vi.mock('../../../lib/auth', async () => {
  const { createAuthMock } = await import('../../../test/authMock');
  return createAuthMock();
});

beforeEach(() => {
  vi.mocked(resetPassword).mockReset().mockResolvedValue(undefined);
});

describe('ResetPassword', () => {
  it('only allows a valid email', async () => {
    renderApp(<ResetPassword />);
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
    await userEvent.type(screen.getByLabelText('Email'), 'nope');
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
    await userEvent.type(screen.getByLabelText('Email'), '@pallet.town');
    expect(screen.getByRole('button', { name: 'Send' })).toBeEnabled();
  });

  it('sends the reset email and tells the user', async () => {
    renderApp(<ResetPassword />);
    await userEvent.type(screen.getByLabelText('Email'), 'ash@pallet.town');
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(resetPassword).toHaveBeenCalledExactlyOnceWith('ash@pallet.town');
    expect(await screen.findByText(/a reset link was sent/)).toBeInTheDocument();
  });

  it('shows the error when sending fails', async () => {
    vi.mocked(resetPassword).mockRejectedValue(new Error('Network error. Check your connection.'));
    renderApp(<ResetPassword />);
    await userEvent.type(screen.getByLabelText('Email'), 'ash@pallet.town');
    await userEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Network error');
    expect(screen.queryByText(/a reset link was sent/)).not.toBeInTheDocument();
  });
});
