import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';
import { CART, ORDER_RECAP } from '../../../constants/routes';
import { selectCartItems } from '../../../store/cartSlice';
import { renderApp } from '../../../test/render';
import CartView from './CartView';

const state = {
  cart: {
    items: [
      { id: 25, name: 'pikachu', quantity: 2 },
      { id: 151, name: 'mew', quantity: 1 },
    ],
  },
};

describe('CartView', () => {
  it('says when the cart is empty', () => {
    renderApp(<CartView />);
    expect(screen.getByRole('heading', { name: 'Your cart is empty' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Order' })).not.toBeInTheDocument();
  });

  it('lists the Pokémon with their quantity', () => {
    renderApp(<CartView />, { state });
    expect(screen.getByRole('heading', { name: 'Your cart' })).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Mew')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Quantity:')[0]).toHaveValue(2);
  });

  it('changes a quantity', () => {
    const { store } = renderApp(<CartView />, { state });
    fireEvent.change(screen.getAllByLabelText('Quantity:')[0]!, { target: { value: '5' } });
    expect(selectCartItems(store.getState())[0]?.quantity).toBe(5);
  });

  it('removes a Pokémon', async () => {
    const { store } = renderApp(<CartView />, { state });
    await userEvent.click(screen.getByRole('button', { name: 'Remove pikachu from cart' }));
    expect(selectCartItems(store.getState())).toEqual([{ id: 151, name: 'mew', quantity: 1 }]);
  });

  it('goes to the order recap', async () => {
    renderApp(
      <Routes>
        <Route path={CART} element={<CartView />} />
        <Route path={ORDER_RECAP} element={<p>Recap page</p>} />
      </Routes>,
      { route: CART, state },
    );
    await userEvent.click(screen.getByRole('button', { name: 'Order' }));
    expect(screen.getByText('Recap page')).toBeInTheDocument();
  });
});
