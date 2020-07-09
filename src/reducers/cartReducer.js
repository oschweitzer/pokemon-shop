import {
  ADD_ITEM,
  REMOVE_ALL_ITEMS,
  REMOVE_ITEM,
  UPDATE_QUANTITY,
} from '../actions/constants';

const initialState = {
  items: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const newItems = [...state.items];
      let pokemon = action.pokemon;
      const index = newItems.findIndex((element) => element.id === pokemon.id);
      if (index !== -1) {
        newItems[index].quantity++;
      } else {
        pokemon.quantity = 1;
        newItems.push(pokemon);
      }
      return {
        items: newItems,
        total: state.total + 1,
      };
    }
    case REMOVE_ITEM: {
      const newItems = [...state.items];
      const index = newItems.findIndex((element) => element.id === action.id);
      const removedElementQuantity = newItems[index].quantity;
      newItems.splice(index, 1);
      return {
        items: newItems,
        total: state.total - removedElementQuantity,
      };
    }
    case UPDATE_QUANTITY: {
      const newItems = [...state.items];
      const index = newItems.findIndex((element) => element.id === action.id);
      if (index === -1) {
        return state;
      }
      const newTotal = state.total + (action.value - newItems[index].quantity);
      newItems[index].quantity = action.value;
      return {
        items: newItems,
        total: newTotal,
      };
    }
    case REMOVE_ALL_ITEMS: {
      return {
        items: [],
        total: 0,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
