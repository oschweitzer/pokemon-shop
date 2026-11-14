import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { cartReducer } from './cartSlice';

const rootReducer = combineReducers({ cart: cartReducer, auth: authReducer });

export type RootState = ReturnType<typeof rootReducer>;

export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({ reducer: rootReducer, preloadedState });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
