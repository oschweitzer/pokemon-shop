import React from 'react';
import styles from './AuthBadge.module.css';
import PropTypes from 'prop-types';

const AuthBadge = (props) => {
  let authModule = (
    <span
      className={[styles.AuthButton, styles.AuthSpan].join(' ')}
      onClick={props.onSignUpClickHandler}
    >
      Sign in /Sign up
    </span>
  );

  if (props.user) {
    authModule = (
      <div className={styles.LoggedIn}>
        <span className={styles.AuthSpan}>
          <b>Logged in</b>
        </span>
        <span className={styles.AuthSpan}>{props.user}</span>
        <span
          className={[styles.AuthButton, styles.AuthSpan].join(' ')}
          onClick={props.onLogoutClickHandler}
        >
          Logout
        </span>
      </div>
    );
  }
  return authModule;
};

AuthBadge.propTypes = {
  user: PropTypes.string,
  onSignUpClickHandler: PropTypes.func,
  onLogoutClickHandler: PropTypes.func,
};

export default AuthBadge;
