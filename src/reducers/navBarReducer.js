import { DISPLAY_CART, HIDE_CART } from '../actions/constants';

const initialState = {
  displayCart: false,
};

const navBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_CART:
      return {
        displayCart: true,
      };
    case HIDE_CART:
      return {
        displayCart: false,
      };
    default:
      return state;
  }
};

export default navBarReducer;
