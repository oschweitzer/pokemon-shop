import React, { Component } from 'react';
import FormItem from '../../FormItem/FormItem';
import { validateEmail } from '../../../utils/Utils';
import PropTypes from 'prop-types';
import { activateModal, deactivateModal } from '../../../actions/modal.actions';
import { login } from '../../../actions/auth.actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from '../../Modal/Modal';
import CancelButton from '../../Buttons/CancelButton/CancelButton';
import ValidationFormSubmitButton from '../../Buttons/ValidationButton/ValidationFormSubmitButton';
import Form from '../../Form/Form';

class ResetPassword extends Component {
  state = {
    email: '',
    isEmailValid: false,
  };

  onSubmitHandler = async (event) => {
    event.preventDefault();
    if (validateEmail(this.state.email)) {
      try {
        await this.props.firebase.doPasswordReset(this.state.email);
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

  render() {
    return (
      <Modal>
        {(onCloseHandler) => (
          <Form onSubmit={this.onSubmitHandler}>
            <h3>Reset password</h3>
            <FormItem
              label={'Email'}
              itemType={'email'}
              onInputHandler={this.onEmailInputHandler}
              value={this.state.email}
              isValueValid={this.state.isEmailValid}
            />
            <div className={'ActionsButtonsContainer'}>
              <CancelButton type={'button'} onClick={onCloseHandler}>
                Close
              </CancelButton>
              {this.state.isEmailValid ? (
                <ValidationFormSubmitButton value={'Send'} />
              ) : (
                <ValidationFormSubmitButton value={'Send'} disabled />
              )}
            </div>
          </Form>
        )}
      </Modal>
    );
  }
}

ResetPassword.propTypes = {
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

export default withRouter(connect(null, mapDispatchToProps)(ResetPassword));
