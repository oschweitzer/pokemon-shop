import React from 'react';
import pokeball from '../../assets/pokeball.png';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div>
      <img className={styles.Pokeball} alt={'Pokeball'} src={pokeball} />
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
