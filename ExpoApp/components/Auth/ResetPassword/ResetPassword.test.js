import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ResetPassword from './ResetPassword';
import configureStore from 'redux-mock-store';

describe('ResetPassword component', () => {
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
            <ResetPassword />
          </BrowserRouter>
        </Provider>,
        div,
      );
    });
  });
});
