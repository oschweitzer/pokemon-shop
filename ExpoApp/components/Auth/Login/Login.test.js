import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { act } from '@testing-library/react';
import Login from './Login';
import configureStore from 'redux-mock-store';

describe('Login component', () => {
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
          })}
        >
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </Provider>,
        div,
      );
    });
  });
});
