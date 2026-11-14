import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderApp } from '../../../test/render';
import Login from './Login';

vi.mock('../../../lib/auth', async () => {
  const { createAuthMock } = await import('../../../test/authMock');
  return createAuthMock(false);
});

describe('Login without Firebase configuration', () => {
  it('explains that accounts are disabled and cannot be submitted', () => {
    renderApp(<Login />);
    expect(screen.getByText('Accounts are disabled in this demo.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled();
  });
});
