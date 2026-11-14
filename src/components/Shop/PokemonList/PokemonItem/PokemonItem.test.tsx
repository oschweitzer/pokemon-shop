import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import PokemonItem from './PokemonItem';

afterEach(() => {
  vi.useRealTimers();
});

describe('PokemonItem', () => {
  it('shows the sprite, the number and the capitalized name', () => {
    render(<PokemonItem id={25} name="pikachu" />);
    expect(screen.getByRole('img', { name: 'Pikachu' })).toHaveAttribute(
      'src',
      expect.stringMatching(/\/pokemon\/25\.png$/),
    );
    expect(screen.getByText('#25')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('is display only without onSelect', () => {
    render(<PokemonItem id={25} name="pikachu" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('shows a loader until the sprite is loaded', () => {
    render(<PokemonItem id={25} name="pikachu" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    fireEvent.load(screen.getByAltText('Pikachu'));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('stops showing the loader when the sprite fails to load', () => {
    render(<PokemonItem id={25} name="pikachu" />);
    fireEvent.error(screen.getByAltText('Pikachu'));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('calls onSelect on every click', async () => {
    const onSelect = vi.fn();
    render(<PokemonItem id={25} name="pikachu" onSelect={onSelect} />);
    const button = screen.getByRole('button', { name: 'Add Pikachu to cart' });
    await userEvent.click(button);
    await userEvent.click(button);
    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  it('plays the added animation for half a second', () => {
    vi.useFakeTimers();
    render(<PokemonItem id={25} name="pikachu" onSelect={vi.fn()} />);
    const button = screen.getByRole('button', { name: 'Add Pikachu to cart' });
    fireEvent.click(button);
    expect(button.className).toMatch(/AddedToCartAnimation/);
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(button.className).not.toMatch(/AddedToCartAnimation/);
  });
});
