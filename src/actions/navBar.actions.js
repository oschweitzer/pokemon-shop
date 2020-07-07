import {DISPLAY_CART, HIDE_CART} from './constants';

export const displayCart = () => {
  return {
    type: DISPLAY_CART
  };
};

export const hideCart = () => {
  return {
    type: HIDE_CART
  };
};

