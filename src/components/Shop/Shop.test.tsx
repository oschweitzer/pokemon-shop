import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { renderApp } from '../../test/render';
import { selectCartItems } from '../../store/cartSlice';
import Shop from './Shop';

const NAMES = ['bulbasaur', 'ivysaur', 'venusaur'];

function pokemonResponse(offset: number, limit: number) {
  return {
    ok: true,
    json: () =>
      Promise.resolve({
        count: 1302,
        results: Array.from({ length: Math.min(limit, 3) }, (_, index) => ({
          name: NAMES[index],
          url: `https://pokeapi.co/api/v2/pokemon/${(offset + index + 1).toString()}/`,
        })),
      }),
  };
}

const respond = (url: string): Promise<unknown> => {
  const params = new URL(url).searchParams;
  return Promise.resolve(
    pokemonResponse(Number(params.get('offset')), Number(params.get('limit'))),
  );
};

let fetchMock: Mock<(url: string) => Promise<unknown>>;

beforeEach(() => {
  fetchMock = vi.fn(respond);
  vi.stubGlobal('fetch', fetchMock);
});

describe('Shop', () => {
  it('lists the first page of Pokémon', async () => {
    renderApp(<Shop />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: 'Add Bulbasaur to cart' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Venusaur to cart' })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10',
      expect.anything(),
    );
    expect(screen.getByText('#2')).toBeInTheDocument();
  });

  it('adds a Pokémon to the cart, once per click', async () => {
    const { store } = renderApp(<Shop />);
    const button = await screen.findByRole('button', { name: 'Add Ivysaur to cart' });
    await userEvent.click(button);
    await userEvent.click(button);
    expect(selectCartItems(store.getState())).toEqual([{ id: 2, name: 'ivysaur', quantity: 2 }]);
  });

  it('loads another page', async () => {
    renderApp(<Shop />);
    await screen.findByRole('button', { name: 'Add Bulbasaur to cart' });
    await userEvent.click(screen.getByRole('button', { name: 'Page 3' }));
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?offset=20&limit=10',
        expect.anything(),
      );
    });
    expect(await screen.findByText('#21')).toBeInTheDocument();
  });

  it('goes back to the first page when the page size changes', async () => {
    renderApp(<Shop />);
    await screen.findByRole('button', { name: 'Add Bulbasaur to cart' });
    await userEvent.click(screen.getByRole('button', { name: 'Page 3' }));
    await screen.findByText('#21');
    await userEvent.selectOptions(screen.getByLabelText('Items per page'), '50');
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?offset=0&limit=50',
        expect.anything(),
      );
    });
  });

  it('shows an error with a retry button when the API fails', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 });
    renderApp(<Shop />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not load the Pokémon.');

    fetchMock.mockImplementation(respond);
    await userEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(
      await screen.findByRole('button', { name: 'Add Bulbasaur to cart' }),
    ).toBeInTheDocument();
  });
});
