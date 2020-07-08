import {ADD_ITEM, REMOVE_ALL_ITEMS, REMOVE_ITEM, UPDATE_QUANTITY} from './constants';

export const addItem = (pokemon) => {
  return {
    type: ADD_ITEM,
    pokemon
  };
};

export const removeItem = (id) => {
  return {
    type: REMOVE_ITEM,
    id
  };
};


export const updateQuantity = (id, value) => {
  return {
    type: UPDATE_QUANTITY,
    id,
    value
  };
};

export const removeAllItems = () => {
  return {
    type: REMOVE_ALL_ITEMS
  }
}
