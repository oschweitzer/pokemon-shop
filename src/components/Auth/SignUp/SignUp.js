import React, { Component } from 'react';
import FormItem from '../../Form/FormItem/FormItem';
import CancelButton from '../../Buttons/CancelButton/CancelButton';
import ValidationFormSubmitButton from '../../Buttons/ValidationButton/ValidationFormSubmitButton';
import { activateModal, deactivateModal } from '../../../actions/modal.actions';
import { login } from '../../../actions/auth.actions';
import Modal from '../../Modal/Modal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { validateEmail, validatePassword } from '../../../utils/Utils';
import Form from '../../Form/Form';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    isEmailValid: false,
    isPasswordValid: false,
  };

  onSubmitHandler = async (event) => {
    event.preventDefault();
    if (
      validateEmail(this.state.email) &&
      validatePassword(this.state.password)
    ) {
      try {
        await this.props.firebase.doCreateUserWithEmailAndPassword(
          this.state.email,
          this.state.password,
        );
      } catch (err) {
        alert(err.message);
      }
      this.props.history.goBack();
    }
  };

  onEmailInputHandler = (value) => {
    this.setState({
      email: value,
      isEmailValid: validateEmail(value),
    });
  };

  onPasswordInputHandler = (value) => {
    this.setState({
      password: value,
      isPasswordValid: validatePassword(value),
    });
  };

  render() {
    return (
      <Modal>
        {(onCloseHandler) => (
          <Form onSubmit={this.onSubmitHandler}>
            <h3>Sign up</h3>
            <FormItem
              label={'Email'}
              itemType={'email'}
              onInputHandler={this.onEmailInputHandler}
              validation={true}
              value={this.state.email}
              isValueValid={this.state.isEmailValid}
            />
            <FormItem
              label={'Password'}
              itemType={'password'}
              onInputHandler={this.onPasswordInputHandler}
              validation={true}
              value={this.state.password}
              isValueValid={this.state.isPasswordValid}
            />
            <div className={'ActionsButtonsContainer'}>
              <CancelButton type={'button'} onClick={onCloseHandler}>
                Close
              </CancelButton>
              {this.state.isEmailValid && this.state.isPasswordValid ? (
                <ValidationFormSubmitButton value={'Sign up'} />
              ) : (
                <ValidationFormSubmitButton value={'Sign up'} disabled />
              )}
            </div>
          </Form>
        )}
      </Modal>
    );
  }
}

SignUp.propTypes = {
  firebase: PropTypes.object,
  login: PropTypes.func,
  history: PropTypes.object,
  activateModal: PropTypes.func,
  deactivateModal: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    activateModal: () => dispatch(activateModal()),
    deactivateModal: () => dispatch(deactivateModal()),
    login: (user) => dispatch(login(user)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(SignUp));
