import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import React from 'react';
import Page from './Page';

describe('Page component', () => {
  it('should render', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(<Page />, div);
    });
  });
});
