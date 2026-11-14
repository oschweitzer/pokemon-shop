import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import pokeball from '../../assets/pokeball.png';
import { animatedSpriteUrl } from '../../lib/pokeapi';
import Section from '../Section/Section';
import styles from './Home.module.css';

const PIKACHU = 25;

export default function Home() {
  return (
    <Section>
      <div className={styles.Home}>
        <img className={[styles.Pokeball, styles.Image].join(' ')} alt="Pokeball" src={pokeball} />
        <p className={styles.Description}>
          <FaQuoteLeft /> Pick your favorite Pokémon, add them to your cart and they will be
          delivered to you, all free!!! <FaQuoteRight />
        </p>
      </div>
      <img src={animatedSpriteUrl(PIKACHU)} alt="Pikachu" className={styles.Image} />
    </Section>
  );
}
