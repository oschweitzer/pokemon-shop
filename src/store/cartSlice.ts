import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ id: number; name: string }>) {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.items.find((candidate) => candidate.id === action.payload.id);
      if (item && Number.isFinite(action.payload.quantity)) {
        item.quantity = Math.max(1, Math.floor(action.payload.quantity));
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);
