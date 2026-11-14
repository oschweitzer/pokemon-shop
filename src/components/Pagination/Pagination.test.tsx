import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('marks the current page and makes the others clickable', () => {
    render(<Pagination currentPage={3} pages={5} onChange={vi.fn()} />);
    expect(screen.getByText('3')).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('button', { name: 'Page 3' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  it('calls onChange with the clicked page', async () => {
    const onChange = vi.fn();
    render(<Pagination currentPage={1} pages={5} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Page 4' }));
    expect(onChange).toHaveBeenCalledExactlyOnceWith(4);
  });

  it('shows ellipses when there are many pages', () => {
    render(<Pagination currentPage={1} pages={100} onChange={vi.fn()} />);
    expect(screen.getByText('…')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 100' })).toBeInTheDocument();
  });

  it('renders no links without pages', () => {
    render(<Pagination currentPage={1} pages={0} onChange={vi.fn()} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
