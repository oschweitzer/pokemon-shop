import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import React from 'react';
import Loading from './Loading';

describe('Loading component', () => {
  it('should render', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(<Loading />, div);
    });
  });
});
