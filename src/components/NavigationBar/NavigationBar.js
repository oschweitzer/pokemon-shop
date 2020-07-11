import React, { Component } from 'react';
import styles from './NavigationBar.module.css';
import { NavLink, withRouter } from 'react-router-dom';
import pokemonLogo from '../../assets/pokemon-logo.svg';
import Cart from '../Cart/Cart';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthBadge from '../AuthBadge/AuthBadge';
import { logout } from '../../actions/auth.actions';

class NavigationBar extends Component {
  onSignUpClickHandler = () => {
    this.props.history.push('/signin');
  };

  onLogoutClickHandler = async () => {
    try {
      await this.props.firebase.doSignOut();
      this.props.logout();
    } catch (err) {
      console.error(err);
    }
  };

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
          {this.props.user ? (
            <li>
              <NavLink
                exact
                to={'/account'}
                activeClassName={styles.NavBarItemActive}
              >
                My account
              </NavLink>
            </li>
          ) : null}
        </ul>
        <div className={styles.RightContainer}>
          <AuthBadge
            user={this.props.user}
            onSignUpClickHandler={this.onSignUpClickHandler}
            onLogoutClickHandler={this.onLogoutClickHandler}
          />
          {this.props.displayCart ? <Cart /> : null}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    displayCart: state.navBarReducer.displayCart,
    user: state.authReducer.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

NavigationBar.propTypes = {
  displayCart: PropTypes.bool,
  user: PropTypes.string,
  history: PropTypes.object,
  firebase: PropTypes.object,
  logout: PropTypes.func,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavigationBar),
);
