import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import React from 'react';
import UserAccount from './UserAccount';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('UserAccount component', () => {
  it('should render', () => {
    const mockStore = configureStore();
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider
          store={mockStore({
            authReducer: {
              email: '',
              isLoggedIn: false,
            },
          })}
        >
          <BrowserRouter>
            <UserAccount />
          </BrowserRouter>
        </Provider>,
        div,
      );
    });
  });
});
