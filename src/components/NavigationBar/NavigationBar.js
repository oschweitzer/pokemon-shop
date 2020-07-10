import React, { Component } from 'react';
import styles from './NavigationBar.module.css';
import { NavLink } from 'react-router-dom';
import pokemonLogo from '../../assets/pokemon-logo.svg';
import Cart from '../Cart/Cart';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NavigationBar extends Component {
  render() {
    return (
      <nav className={styles.NavBar}>
        <img className={styles.Logo} alt={'Pokemon logo'} src={pokemonLogo} />
        <ul>
          <li>
            <NavLink exact to={'/'} activeClassName={styles.NavBarItemActive}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to={'/shop'}
              activeClassName={styles.NavBarItemActive}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to={'/account'}
              activeClassName={styles.NavBarItemActive}
            >
              My account
            </NavLink>
          </li>
        </ul>
        {this.props.displayCart ? <Cart /> : null}
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    displayCart: state.navBarReducer.displayCart,
  };
};

NavigationBar.propTypes = {
  displayCart: PropTypes.bool,
};

export default connect(mapStateToProps)(NavigationBar);
