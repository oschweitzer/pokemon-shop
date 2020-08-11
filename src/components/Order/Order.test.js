import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Order from './Order';
import configureStore from 'redux-mock-store';

describe('Order component', () => {
  it('should render', () => {
    const mockStore = configureStore();
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider
        store={mockStore({
          cartReducer: {
            items: [],
          },
        })}
      >
        <BrowserRouter>
          <Order />
        </BrowserRouter>
      </Provider>,
      div,
    );
  });
});
