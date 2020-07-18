import React, { Component } from 'react';
import { displayCart } from '../../actions/navBar.actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Section from '../../hoc/Section/Section';
import styles from './UserAccount.module.css';
import FormItem from '../Form/FormItem/FormItem';
import { validatePassword } from '../../utils/Utils';
import CancelButton from '../Buttons/CancelButton/CancelButton';
import ValidationFormSubmitButton from '../Buttons/ValidationButton/ValidationFormSubmitButton';
import ValidationButton from '../Buttons/ValidationButton/ValidationButton';
import { withRouter } from 'react-router-dom';
import { SIGN_IN } from '../../constants/routes';

class UserAccount extends Component {
  state = {
    displayPasswordInput: false,
    newPassword: '',
    isPasswordValid: false,
  };

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.displayCart();
    } else {
      this.props.history.push(SIGN_IN);
    }
  }

  onUpdatePasswordClickHandler = () => {
    this.setState({
      displayPasswordInput: true,
    });
  };

  onPasswordInput = (value) => {
    this.setState({
      newPassword: value,
      isPasswordValid: validatePassword(value),
    });
  };

  onPasswordUpdatingHandler = async (event) => {
    event.preventDefault();
    if (this.state.isPasswordValid && this.state.newPassword) {
      try {
        await this.props.firebase.doPasswordUpdate(this.state.newPassword);
        this.setState({
          displayPasswordInput: false,
          newPassword: '',
          isPasswordValid: false,
        });
        alert('Password successfully updated');
      } catch (err) {
        alert(err);
      }
    }
  };

  onPasswordUpdateCancelHandler = () => {
    this.setState({
      displayPasswordInput: false,
    });
  };

  render() {
    const updatePassword = this.state.displayPasswordInput ? (
      <form
        onSubmit={this.onPasswordUpdatingHandler}
        className={styles.UpdatePasswordForm}
      >
        <FormItem
          label={'New password'}
          itemType={'password'}
          onInputHandler={this.onPasswordInput}
          value={this.state.newPassword}
          isValueValid={this.state.isPasswordValid}
        />
        <div className={styles.Actions}>
          <CancelButton onClick={this.onPasswordUpdateCancelHandler}>
            Cancel
          </CancelButton>
          <ValidationFormSubmitButton value={'Update'} />
        </div>
      </form>
    ) : null;

    return this.props.isLoggedIn ? (
      <React.Fragment>
        <h2>Account parameters</h2>
        <div className={styles.UserAccount}>
          <span>
            <b>Email</b>: {this.props.userEmail}
          </span>
          {!this.state.displayPasswordInput ? (
            <span>
              <b>Password</b>:&nbsp;
              <ValidationButton onClick={this.onUpdatePasswordClickHandler}>
                Update password
              </ValidationButton>
            </span>
          ) : null}
          {updatePassword}
        </div>
      </React.Fragment>
    ) : null;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    displayCart: () => dispatch(displayCart()),
  };
};

const mapStateToProps = (state) => {
  return {
    userEmail: state.authReducer.email,
    isLoggedIn: state.authReducer.isLoggedIn,
  };
};

UserAccount.propTypes = {
  displayCart: PropTypes.func,
  userEmail: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  firebase: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Section(UserAccount)),
);
