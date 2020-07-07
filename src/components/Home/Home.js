import React from 'react';
import pokeball from '../../assets/pokeball.png'
import styles from './Home.module.css';
import {FaQuoteLeft, FaQuoteRight} from 'react-icons/all';


const Home = () => {
  return (
      <div className={styles.Home}>
        <span className={styles.Description}>
          <FaQuoteLeft/> Pick your favorite pokemon, add them to your cart and they will delivered to you, all free !!! <FaQuoteRight/>
        </span>
        <img className={styles.Pokeball} alt={'Pokeball'} src={pokeball}/>
      </div>

  )
}

export default Home;
