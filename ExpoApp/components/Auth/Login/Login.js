import React, { Component } from 'react';
import FormItem from '../../Form/FormItem/FormItem';
import styles from './Login.module.css';
import CancelButton from '../../Buttons/CancelButton/CancelButton';
import ValidationFormSubmitButton from '../../Buttons/ValidationButton/ValidationFormSubmitButton';
import PropTypes from 'prop-types';
import { activateModal, deactivateModal } from '../../../actions/modal.actions';
import { login } from '../../../actions/auth.actions';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Modal from '../../Modal/Modal';
import Form from '../../Form/Form';
import { RESET_PASSWORD, SIGN_UP } from '../../../constants/routes';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const authUser = await this.props.firebase.doSignInWithEmailAndPassword(
        this.state.email,
        this.state.password,
      );
      this.props.login(authUser.user.email);
    } catch (err) {
      alert(err.message);
    }
    this.props.history.goBack();
  };

  onEmailInputHandler = (value) => {
    this.setState({
      email: value,
    });
  };

  onPasswordInputHandler = (value) => {
    this.setState({
      password: value,
    });
  };

  render() {
    return (
      <Modal>
        {(onCloseHandler) => (
          <Form onSubmitHandler={this.onSubmitHandler}>
            <h3>Login</h3>
            <FormItem
              label={'Email'}
              itemType={'email'}
              onInputHandler={this.onEmailInputHandler}
            />
            <FormItem
              label={'Password'}
              itemType={'password'}
              onInputHandler={this.onPasswordInputHandler}
            />
            <span className={styles.SignUpText}>
              You do not have an account ? &nbsp;
              <Link exact={'true'} to={SIGN_UP}>
                Sign up
              </Link>
            </span>
            <span className={styles.SignUpText}>
              <Link exact={'true'} to={RESET_PASSWORD}>
                Forgot password ?
              </Link>
            </span>
            <div className={'ActionsButtonsContainer'}>
              <CancelButton type={'button'} onClick={onCloseHandler}>
                Close
              </CancelButton>
              {this.state.email && this.state.password ? (
                <ValidationFormSubmitButton value={'Login'} />
              ) : (
                <ValidationFormSubmitButton value={'Login'} disabled />
              )}
            </div>
          </Form>
        )}
      </Modal>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object,
  login: PropTypes.func,
  history: PropTypes.object,
  activateModal: PropTypes.func,
  deactivateModal: PropTypes.func,
  isModalActivated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
