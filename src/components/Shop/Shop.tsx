import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchPokemonPage } from '../../lib/pokeapi';
import { useAppDispatch } from '../../store/hooks';
import { addItem } from '../../store/cartSlice';
import Button from '../Button/Button';
import Loading from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';
import Section from '../Section/Section';
import PokemonItem from './PokemonList/PokemonItem/PokemonItem';
import listStyles from './PokemonList/PokemonList.module.css';
import styles from './Shop.module.css';

const PAGE_SIZES = [10, 50, 100];

export default function Shop() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0] ?? 10);

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['pokemon', page, pageSize],
    queryFn: ({ signal }) => fetchPokemonPage(page, pageSize, signal),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });

  const pages = data ? Math.ceil(data.count / pageSize) : 0;

  return (
    <Section>
      <div className={styles.FiltersBar}>
        <label htmlFor="itemsPerPage">Items per page</label>
        <select
          id="itemsPerPage"
          value={pageSize}
          onChange={(event) => {
            setPageSize(Number(event.target.value));
            setPage(1);
          }}
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <h2>Pokémon</h2>
      {isPending && <Loading />}
      {isError && !data && (
        <div role="alert">
          <p>Could not load the Pokémon.</p>
          <Button
            onClick={() => {
              void refetch();
            }}
          >
            Retry
          </Button>
        </div>
      )}
      {data && (
        <div className={listStyles.MainContainer}>
          <ul className={listStyles.List}>
            {data.results.map((pokemon) => (
              <li key={pokemon.id}>
                <PokemonItem
                  id={pokemon.id}
                  name={pokemon.name}
                  onSelect={() => dispatch(addItem(pokemon))}
                />
              </li>
            ))}
          </ul>
          <Pagination currentPage={page} pages={pages} onChange={setPage} />
        </div>
      )}
    </Section>
  );
}
