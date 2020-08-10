import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import CartView from './CartView';
import configureStore from 'redux-mock-store';

describe('CartView component', () => {
  it('should render', () => {
    const mockStore = configureStore();
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider
          store={mockStore({
            cartReducer: {
              items: [],
            },
          })}
        >
          <BrowserRouter>
            <CartView />
          </BrowserRouter>
        </Provider>,
        div,
      );
    });
  });
});
