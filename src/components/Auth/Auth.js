import React, { Component } from 'react';
import Modal from '../../hoc/Modal/Modal';
import styles from './Auth.module.css';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { login } from '../../actions/auth.actions';
import { connect } from 'react-redux';
import { activateModal, deactivateModal } from '../../actions/modal.actions';
import { validateEmail, validatePassword } from '../../utils/Utils';
import FormItem from '../FormItem/FormItem';
import ValidationFormSubmitButton from '../Buttons/ValidationButton/ValidationFormSubmitButton';
import CancelButton from '../Buttons/CancelButton/CancelButton';

class Auth extends Component {
  state = {
    email: '',
    password: '',
    isEmailValid: false,
    isPasswordValid: false,
  };

  componentDidMount() {
    this.toggleModal();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isLoggedIn !== this.props.isLoggedIn ||
      prevProps.displayResetPasswordModal !==
        this.props.displayResetPasswordModal ||
      prevProps.isModalActivated !== this.props.isModalActivated
    ) {
      this.props.activateModal();
    }
  }

  componentWillUnmount() {
    this.props.deactivateModal();
  }

  toggleModal = () => {
    if (this.props.isModalActivated) {
      this.props.deactivateModal();
    } else {
      this.props.activateModal();
    }
  };

  onClose = () => {
    this.setState({
      email: '',
      password: '',
    });
    this.toggleModal();
    this.props.history.goBack();
  };

  onEmailInput = (value) => {
    this.setState({
      email: value,
      isEmailValid: validateEmail(value),
    });
  };

  onPasswordInput = (value) => {
    this.setState({
      password: value,
      isPasswordValid: validatePassword(value),
    });
  };

  validationHandler = async (event) => {
    event.preventDefault();
    if (
      this.props.displayResetPasswordModal &&
      validateEmail(this.state.email)
    ) {
      await this.resetPasswordHandler();
    } else {
      if (
        validateEmail(this.state.email) &&
        validatePassword(this.state.password)
      ) {
        await this.authenticationHandler();
      }
    }
  };

  resetPasswordHandler = async () => {
    try {
      await this.props.firebase.doPasswordReset(this.state.email);
      this.props.deactivateModal();
      this.props.history.goBack();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  authenticationHandler = async () => {
    if (this.props.isLoggedIn) {
      try {
        await this.props.firebase.doCreateUserWithEmailAndPassword(
          this.state.email,
          this.state.password,
        );
      } catch (err) {
        alert(err.message);
      }
    } else {
      try {
        const authUser = await this.props.firebase.doSignInWithEmailAndPassword(
          this.state.email,
          this.state.password,
        );
        this.props.login(authUser.user.email);
      } catch (err) {
        alert(err.message);
      }
    }
    this.toggleModal();
    this.props.history.goBack();
  };

  render() {
    const email = (
      <FormItem
        label={'Email'}
        itemType={'email'}
        onInputHandler={this.onEmailInput}
        value={this.state.email}
        isValueValid={this.state.isEmailValid}
      />
    );
    const signUpText = this.props.isSignUp ? null : (
      <React.Fragment>
        <span className={styles.SignUpText}>
          You do not have an account ? &nbsp;
          <Link exact={'true'} to={'/signup'}>
            Sign up
          </Link>
        </span>
        <span className={styles.SignUpText}>
          <Link exact={'true'} to={'/resetPassword'}>
            Forgot password ?
          </Link>
        </span>
      </React.Fragment>
    );

    const modal = this.props.displayResetPasswordModal ? (
      email
    ) : (
      <React.Fragment>
        {email}
        <FormItem
          label={'Password'}
          itemType={'password'}
          onInputHandler={this.onPasswordInput}
          value={this.state.password}
          isValueValid={this.state.isPasswordValid}
        />
        {signUpText}
      </React.Fragment>
    );

    return (
      <form className={styles.Auth} onSubmit={this.validationHandler}>
        <h3>{this.props.title}</h3>
        {modal}
        <div className={styles.Actions}>
          <CancelButton onClick={this.onClose}>Close</CancelButton>
          <ValidationFormSubmitButton value={this.props.validationButtonText} />
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
  isLoggedIn: PropTypes.bool,
  displayResetPasswordModal: PropTypes.bool,
  isModalActivated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    isModalActivated: state.modalReducer.isModalActivated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    activateModal: () => dispatch(activateModal()),
    deactivateModal: () => dispatch(deactivateModal()),
    login: (user) => dispatch(login(user)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Modal(Auth)),
);
