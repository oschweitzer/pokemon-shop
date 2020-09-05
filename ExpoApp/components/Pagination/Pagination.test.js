import { act } from '@testing-library/react';
import ReactDOM from 'react-dom';
import React from 'react';
import Pagination from './Pagination';

describe('Pagination component', () => {
  it('should render', () => {
    const div = document.createElement('div');
    act(() => {
      ReactDOM.render(<Pagination pages={5} currentPage={2} />, div);
    });
  });
});
