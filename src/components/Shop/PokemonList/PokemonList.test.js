import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import React from 'react';
import PokemonList from './PokemonList';

describe('PokemonList component', () => {
  it('should render', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(<PokemonList />, div);
    });
  });
});
