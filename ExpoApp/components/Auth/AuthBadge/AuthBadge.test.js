import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import React from 'react';
import AuthBadge from './AuthBadge';

describe('AuthBadge component', () => {
  it('should render', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(<AuthBadge />, div);
    });
  });
});
