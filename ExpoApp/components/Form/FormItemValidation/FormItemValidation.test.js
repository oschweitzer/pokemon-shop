import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import React from 'react';
import FormItemValidation from './FormItemValidation';

describe('FormItemValidation component', () => {
  it('should render', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(<FormItemValidation />, div);
    });
  });
});
