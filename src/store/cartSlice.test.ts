import { describe, expect, it } from 'vitest';
import { makeStore } from './index';
import {
  addItem,
  clearCart,
  removeItem,
  selectCartCount,
  selectCartItems,
  updateQuantity,
} from './cartSlice';

const PIKACHU = { id: 25, name: 'pikachu' };
const MEW = { id: 151, name: 'mew' };

describe('cart', () => {
  it('starts empty', () => {
    const store = makeStore();
    expect(selectCartItems(store.getState())).toEqual([]);
    expect(selectCartCount(store.getState())).toBe(0);
  });

  it('adds a Pokémon with a quantity of 1', () => {
    const store = makeStore();
    store.dispatch(addItem(PIKACHU));
    expect(selectCartItems(store.getState())).toEqual([{ ...PIKACHU, quantity: 1 }]);
  });

  it('increments the quantity when the Pokémon is already there', () => {
    const store = makeStore();
    store.dispatch(addItem(PIKACHU));
    store.dispatch(addItem(PIKACHU));
    store.dispatch(addItem(MEW));
    expect(selectCartItems(store.getState())).toEqual([
      { ...PIKACHU, quantity: 2 },
      { ...MEW, quantity: 1 },
    ]);
    expect(selectCartCount(store.getState())).toBe(3);
  });

  it('removes a Pokémon whatever its quantity', () => {
    const store = makeStore();
    store.dispatch(addItem(PIKACHU));
    store.dispatch(addItem(PIKACHU));
    store.dispatch(addItem(MEW));
    store.dispatch(removeItem(PIKACHU.id));
    expect(selectCartItems(store.getState())).toEqual([{ ...MEW, quantity: 1 }]);
    expect(selectCartCount(store.getState())).toBe(1);
  });

  it('updates a quantity and keeps it a whole number of at least 1', () => {
    const store = makeStore();
    store.dispatch(addItem(PIKACHU));
    store.dispatch(updateQuantity({ id: PIKACHU.id, quantity: 4 }));
    expect(selectCartCount(store.getState())).toBe(4);
    store.dispatch(updateQuantity({ id: PIKACHU.id, quantity: 2.9 }));
    expect(selectCartCount(store.getState())).toBe(2);
    store.dispatch(updateQuantity({ id: PIKACHU.id, quantity: 0 }));
    expect(selectCartCount(store.getState())).toBe(1);
    store.dispatch(updateQuantity({ id: PIKACHU.id, quantity: -3 }));
    expect(selectCartCount(store.getState())).toBe(1);
    store.dispatch(updateQuantity({ id: PIKACHU.id, quantity: Number.NaN }));
    expect(selectCartCount(store.getState())).toBe(1);
  });

  it('ignores an update for a Pokémon that is not in the cart', () => {
    const store = makeStore();
    store.dispatch(updateQuantity({ id: MEW.id, quantity: 3 }));
    expect(selectCartItems(store.getState())).toEqual([]);
  });

  it('clears the cart', () => {
    const store = makeStore();
    store.dispatch(addItem(PIKACHU));
    store.dispatch(addItem(MEW));
    store.dispatch(clearCart());
    expect(selectCartItems(store.getState())).toEqual([]);
  });
});
