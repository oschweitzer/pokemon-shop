import {ADD_POKEMON, ADD_QUANTITY, REMOVE_POKEMON, SUBTRACT_QUANTITY} from './constants';

export const addPokemon = (pokemon) => {
  return {
    type: ADD_POKEMON,
    pokemon
  };
};

export const removePokemon = (id) => {
  return {
    type: REMOVE_POKEMON,
    id
  };
};


export const addQuantity = (id) => {
  return {
    type: ADD_QUANTITY,
    id
  };
};

export const subtractQuantity = (id) => {
  return {
    type: SUBTRACT_QUANTITY,
    id
  };
};
