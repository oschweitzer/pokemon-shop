import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { HOME, ORDER_RECAP } from '../../constants/routes';
import { selectCartItems } from '../../store/cartSlice';
import { renderApp } from '../../test/render';
import Order from './Order';

const routes = (
  <Routes>
    <Route path={HOME} element={<p>Home page</p>} />
    <Route path={ORDER_RECAP} element={<Order />} />
  </Routes>
);

describe('Order', () => {
  it('redirects home when the cart is empty', () => {
    renderApp(routes, { route: ORDER_RECAP });
    expect(screen.getByText('Home page')).toBeInTheDocument();
  });

  it('shows the recap', () => {
    renderApp(routes, {
      route: ORDER_RECAP,
      state: { cart: { items: [{ id: 25, name: 'Pikachu', quantity: 3 }] } },
    });
    expect(screen.getByRole('row', { name: 'Pikachu 3' })).toBeInTheDocument();
  });

  it('prints the order', async () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined);
    renderApp(routes, {
      route: ORDER_RECAP,
      state: { cart: { items: [{ id: 25, name: 'Pikachu', quantity: 3 }] } },
    });
    await userEvent.click(screen.getByRole('button', { name: 'Print order' }));
    expect(print).toHaveBeenCalledOnce();
  });

  it('empties the cart and goes home when validated', async () => {
    const { store } = renderApp(routes, {
      route: ORDER_RECAP,
      state: { cart: { items: [{ id: 25, name: 'Pikachu', quantity: 3 }] } },
    });
    await userEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(selectCartItems(store.getState())).toEqual([]);
    expect(screen.getByText('Home page')).toBeInTheDocument();
  });
});
