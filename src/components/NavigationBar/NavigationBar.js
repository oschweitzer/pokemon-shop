import React, {Component} from 'react';
import styles from './NavigationBar.module.css';
import {NavLink} from 'react-router-dom';
import pokemonLogo from '../../assets/pokemon-logo.svg';

export class NavigationBar extends Component {
  render() {
    return (
        <nav className={styles.NavBar}>
          <img className={styles.Logo} alt={'Pokemon logo'} src={pokemonLogo}/>
          <ul>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/shop'}>Shop</NavLink></li>
            <li><NavLink to={'/account'}>My account</NavLink></li>
          </ul>
        </nav>
    )
  }
}
