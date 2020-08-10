import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import Home from './Home';
import configureStore from 'redux-mock-store';

describe('Home component', () => {
  it('should render', () => {
    const mockStore = configureStore();
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider store={mockStore()}>
          <Home />
        </Provider>,
        div,
      );
    });
  });
});
