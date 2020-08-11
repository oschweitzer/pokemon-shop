import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Modal from './Modal';
import configureStore from 'redux-mock-store';

describe('Modal component', () => {
  it('should render', () => {
    const mockStore = configureStore();
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider
        store={mockStore({
          modalReducer: {
            isModalActivated: false,
          },
        })}
      >
        <BrowserRouter>
          <Modal>
            {(onCloseHandler) => (
              <button onClick={onCloseHandler}>Cancel</button>
            )}
          </Modal>
        </BrowserRouter>
      </Provider>,
      div,
    );
  });
});
