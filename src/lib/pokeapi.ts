const API_URL = 'https://pokeapi.co/api/v2';
const SPRITES_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export interface PokemonSummary {
  id: number;
  name: string;
}

export interface PokemonPage {
  /** Number of Pokémon in the whole Pokédex. */
  count: number;
  results: PokemonSummary[];
}

interface PokeApiListResponse {
  count: number;
  results: { name: string; url: string }[];
}

/** `https://pokeapi.co/api/v2/pokemon/25/` gives `25`. */
export function pokemonIdFromUrl(url: string): number {
  const match = /\/pokemon\/(\d+)\/?$/.exec(url);
  if (!match?.[1]) {
    throw new Error(`Unexpected Pokémon URL: ${url}`);
  }
  return Number(match[1]);
}

/** `mr-mime` gives `Mr-mime`. */
export function formatName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function spriteUrl(id: number): string {
  return `${SPRITES_URL}/${id}.png`;
}

export function animatedSpriteUrl(id: number): string {
  return `${SPRITES_URL}/other/showdown/${id}.gif`;
}

/** One page of the Pokédex, 1-based. */
export async function fetchPokemonPage(
  page: number,
  pageSize: number,
  signal?: AbortSignal,
): Promise<PokemonPage> {
  const offset = (page - 1) * pageSize;
  const response = await fetch(`${API_URL}/pokemon?offset=${offset}&limit=${pageSize}`, { signal });
  if (!response.ok) {
    throw new Error(`PokéAPI answered ${response.status}`);
  }
  const data = (await response.json()) as PokeApiListResponse;
  return {
    count: data.count,
    results: data.results.map(({ name, url }) => ({ id: pokemonIdFromUrl(url), name })),
  };
}
