import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import React from 'react';
import Form from './Form';

describe('Form component', () => {
  it('should render', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(<Form />, div);
    });
  });
});
