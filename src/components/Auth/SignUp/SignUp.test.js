import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import SignUp from './SignUp';
import configureStore from 'redux-mock-store';

describe('SignUp component', () => {
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
            <SignUp />
          </BrowserRouter>
        </Provider>,
        div,
      );
    });
  });
});
