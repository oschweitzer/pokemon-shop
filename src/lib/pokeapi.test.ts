import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  animatedSpriteUrl,
  fetchPokemonPage,
  formatName,
  pokemonIdFromUrl,
  spriteUrl,
} from './pokeapi';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('pokemonIdFromUrl', () => {
  it('reads the id from a PokéAPI URL', () => {
    expect(pokemonIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25);
    expect(pokemonIdFromUrl('https://pokeapi.co/api/v2/pokemon/10001')).toBe(10001);
  });

  it('throws on any other URL', () => {
    expect(() => pokemonIdFromUrl('https://example.com/')).toThrow('Unexpected Pokémon URL');
  });
});

describe('formatName', () => {
  it('capitalizes the first letter', () => {
    expect(formatName('pikachu')).toBe('Pikachu');
    expect(formatName('')).toBe('');
  });
});

describe('sprites', () => {
  it('builds the sprite URLs', () => {
    expect(spriteUrl(25)).toMatch(/\/sprites\/pokemon\/25\.png$/);
    expect(animatedSpriteUrl(25)).toMatch(/\/sprites\/pokemon\/other\/showdown\/25\.gif$/);
  });
});

describe('fetchPokemonPage', () => {
  it('asks for the right offset and maps the results', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          count: 1302,
          results: [{ name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }],
        }),
    });
    vi.stubGlobal('fetch', fetchMock);
    const controller = new AbortController();

    const page = await fetchPokemonPage(3, 10, controller.signal);

    expect(fetchMock).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=20&limit=10', {
      signal: controller.signal,
    });
    expect(page).toEqual({ count: 1302, results: [{ id: 2, name: 'ivysaur' }] });
  });

  it('throws when the API answers with an error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    await expect(fetchPokemonPage(1, 10)).rejects.toThrow('PokéAPI answered 503');
  });
});
