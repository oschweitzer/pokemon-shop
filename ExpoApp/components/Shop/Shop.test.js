import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import Shop from './Shop';
import configureStore from 'redux-mock-store';

describe('Shop component', () => {
  it('should render', () => {
    const mockStore = configureStore();
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(
        <Provider store={mockStore()}>
          <Shop />
        </Provider>,
        div,
      );
    });
  });
});
