import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import React from 'react';
import FormItem from './FormItem';

describe('FormItem component', () => {
  it('should render', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(<FormItem />, div);
    });
  });
});
