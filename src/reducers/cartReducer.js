import {ADD_POKEMON, ADD_QUANTITY, REMOVE_POKEMON, SUBTRACT_QUANTITY} from '../actions/constants';

const initialState = {
  items : [],
}

const cartReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_POKEMON:
      const newItems = [...state.items];
      newItems.push(action.pokemon);
      return {
        items: newItems,
      };
    case REMOVE_POKEMON:
      // TODO: remove pokemon from the list based on the provided id "action.id"
      break;
    case ADD_QUANTITY:
      // TODO: add 1 to the quantity on the pokemon based on the provided id "action.id"
      break;
    case SUBTRACT_QUANTITY:
      // TODO: subtract 1 to the quantity on the pokemon based on the provided id "action.id"
      break;
    default:
      return state;
  }
}

export default cartReducer;
