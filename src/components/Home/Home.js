import React from 'react';
import pokeball from '../../assets/pokeball.png'
import styles from './Home.module.css';


const Home = () => {
  return (
      <div className={styles.Home}>
        <p className={styles.Description}>
          "Shop to pick your favorite pokemon, it's free and delivered to your home."
        </p>
        <img className={styles.Pokeball} alt={'Pokeball'} src={pokeball}/>
      </div>

  )
}

export default Home;
