import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { act } from '@testing-library/react';
import configureStore from 'redux-mock-store';

describe('App component', () => {
  it('should render', () => {
    const mockStore = configureStore();
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider
          store={mockStore({
            modalReducer: {
              isModalActivated: false,
            },
            navBarReducer: {
              displayCart: false,
            },
            authReducer: {
              email: '',
            },
          })}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>,
        div,
      );
    });
  });
});
