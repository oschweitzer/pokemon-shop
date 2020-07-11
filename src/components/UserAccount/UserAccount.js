import React, { Component } from 'react';
import { displayCart } from '../../actions/navBar.actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Section from '../../hoc/Section/Section';

class UserAccount extends Component {
  componentDidMount() {
    this.props.displayCart();
  }

  render() {
    return <div>Nothing here for now.</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    displayCart: () => dispatch(displayCart()),
  };
};

UserAccount.propTypes = {
  displayCart: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Section(UserAccount));
