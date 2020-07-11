import React, { Component } from 'react';
import Modal from '../../hoc/Modal/Modal';
import styles from './Auth.module.css';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { login } from '../../actions/auth.actions';
import { connect } from 'react-redux';
import { activateModal, deactivateModal } from '../../actions/modal.actions';

class Auth extends Component {
  state = {
    email: '',
    password: '',
    isSignUp: false,
  };

  componentDidMount() {
    this.props.activateModal();
    if (this.props.isSignUp) {
      this.setState({
        isSignUp: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isSignUp !== this.props.isSignUp) {
      this.props.activateModal();
      this.setState({
        isSignUp: this.props.isSignUp,
      });
    }
  }

  componentWillUnmount() {
    this.props.deactivateModal();
  }

  onClose = () => {
    this.setState({
      email: '',
      password: '',
    });
    this.props.deactivateModal();
    this.props.history.goBack();
  };

  onEmailInput = (value) => {
    if (!this.validateEmail(value)) {
      console.error('Wrong email');
    }
    this.setState({
      email: value,
    });
  };

  onPasswordInput = (value) => {
    if (!this.validatePassword(value)) {
      console.error('Wrong password');
    }
    this.setState({
      password: value,
    });
  };

  validateEmail = (email) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  validatePassword = (password) => {
    /*
    To check a password between 8 to 15 characters
     which contain at least one lowercase letter,
     one uppercase letter,
     one numeric digit,
     and one special character
     */
    return password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
    );
  };

  validationHandler = async (event) => {
    event.preventDefault();
    if (
      this.validateEmail(this.state.email) &&
      this.validatePassword(this.state.password)
    ) {
      if (this.state.isSignUp) {
        try {
          await this.props.firebase.doCreateUserWithEmailAndPassword(
            this.state.email,
            this.state.password,
          );
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          const {
            user,
          } = await this.props.firebase.doSignInWithEmailAndPassword(
            this.state.email,
            this.state.password,
          );
          this.props.login(user);
        } catch (err) {
          console.error(err);
        }
      }
      this.props.deactivateModal();
      this.props.history.goBack();
    } else {
      console.error('Wrong credentials');
    }
  };

  render() {
    let signUpText = null;
    if (!this.state.isSignUp) {
      signUpText = (
        <span className={styles.SignUpText}>
          You don't have an account ? &nbsp;
          <Link exact={'true'} to={'/signup'}>
            Sign up
          </Link>
        </span>
      );
    }

    return (
      <form className={styles.Auth} onSubmit={this.validationHandler}>
        <h3>{this.props.title}</h3>
        <div className={styles.FormItem}>
          <label htmlFor={'email'}>Email</label>
          <input
            id={'email'}
            type={'email'}
            onInput={(event) => this.onEmailInput(event.target.value)}
          />
        </div>
        <div className={styles.FormItem}>
          <label htmlFor={'password'}>Password</label>
          <input
            id={'password'}
            type={'password'}
            onInput={(event) => this.onPasswordInput(event.target.value)}
          />
        </div>
        {signUpText}
        <div className={styles.Actions}>
          <button onClick={this.onClose} className={styles.CloseButton}>
            Close
          </button>
          <input
            type={'submit'}
            className={styles.ValidationButton}
            value={this.props.validationButtonText}
          />
        </div>
      </form>
    );
  }
}

Auth.propTypes = {
  history: PropTypes.object,
  deactivateModal: PropTypes.func,
  activateModal: PropTypes.func,
  login: PropTypes.func,
  validationButtonText: PropTypes.string,
  title: PropTypes.string,
  isSignUp: PropTypes.bool,
  firebase: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    activateModal: () => dispatch(activateModal()),
    deactivateModal: () => dispatch(deactivateModal()),
    login: (user) => dispatch(login(user)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Modal(Auth)));
