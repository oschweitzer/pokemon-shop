import { useEffect, useRef, useState } from 'react';
import { formatName, spriteUrl } from '../../../../lib/pokeapi';
import Loading from '../../../Loading/Loading';
import styles from './PokemonItem.module.css';

interface PokemonItemProps {
  id: number;
  name: string;
  /** Called when the Pokémon is picked. Without it the item is display only. */
  onSelect?: () => void;
}

const ANIMATION_MS = 500;

export default function PokemonItem({ id, name, onSelect }: PokemonItemProps) {
  const [loading, setLoading] = useState(true);
  const [pulse, setPulse] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const displayName = formatName(name);

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
    },
    [],
  );

  const select = () => {
    onSelect?.();
    setPulse(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setPulse(false);
    }, ANIMATION_MS);
  };

  const content = (
    <>
      <img
        alt={displayName}
        src={spriteUrl(id)}
        onLoad={() => {
          setLoading(false);
        }}
        onError={() => {
          setLoading(false);
        }}
      />
      <span className={styles.PokemonTextData}>#{id}</span>
      <span className={styles.PokemonTextData}>{displayName}</span>
    </>
  );

  return (
    <div className={styles.FlexContainer}>
      {loading && (
        <div className={styles.PokemonItem}>
          <Loading />
        </div>
      )}
      {onSelect ? (
        <button
          type="button"
          className={[
            styles.PokemonItem,
            styles.PokemonItemHover,
            styles.Selectable,
            pulse ? styles.AddedToCartAnimation : '',
            loading ? styles.Hide : '',
          ].join(' ')}
          aria-label={`Add ${displayName} to cart`}
          onClick={select}
        >
          {content}
        </button>
      ) : (
        <div className={[styles.PokemonItem, loading ? styles.Hide : ''].join(' ')}>{content}</div>
      )}
    </div>
  );
}
