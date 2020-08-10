import React from 'react';
import ReactDOM from 'react-dom';
import PokemonItem from './PokemonItem';
import { act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

describe('PokemonItem component', () => {
  it('should render', () => {
    const mockStore = configureStore();
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider store={mockStore()}>
          <BrowserRouter>
            <PokemonItem />
          </BrowserRouter>
        </Provider>,
        div,
      );
    });
  });
});
