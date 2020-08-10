import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Cart from './Cart';
import configureStore from 'redux-mock-store';

describe('Cart component', () => {
  it('should render', () => {
    const mockStore = configureStore();
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider
          store={mockStore({
            cartReducer: {
              total: 10,
            },
          })}
        >
          <BrowserRouter>
            <Cart />
          </BrowserRouter>
        </Provider>,
        div,
      );
    });
  });
});
