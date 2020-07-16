import React, { Component } from 'react';
import { displayCart } from '../../actions/navBar.actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Section from '../../hoc/Section/Section';
import styles from './UserAccount.module.css';

class UserAccount extends Component {
  componentDidMount() {
    this.props.displayCart();
  }

  onUpdatePasswordClickHandler = () => {
    // display modal with new password
  };

  render() {
    let accountInfo = null;
    if (this.props.isLoggedIn) {
      accountInfo = (
        <div className={styles.UserAccount}>
          <span>Email: {this.props.userEmail}</span>
          <button onClick={this.onUpdatePasswordClickHandler}>
            Update password
          </button>
        </div>
      );
    }
    return accountInfo;
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Section(UserAccount));
