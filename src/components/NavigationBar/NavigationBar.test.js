import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import NavigationBar from './NavigationBar';
import configureStore from 'redux-mock-store';

describe('NavigationBar component', () => {
  it('should render', () => {
    const mockStore = configureStore();
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider
          store={mockStore({
            navBarReducer: {
              displayCart: false,
            },
            authReducer: {
              email: '',
            },
          })}
        >
          <BrowserRouter>
            <NavigationBar />
          </BrowserRouter>
        </Provider>,
        div,
      );
    });
  });
});
