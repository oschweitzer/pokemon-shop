import React, { Component } from 'react';
import styles from './Form.module.css';
import PropTypes from 'prop-types';

class Form extends Component {
  render() {
    return (
      <form className={styles.Form} onSubmit={this.props.onSubmitHandler}>
        {this.props.children}
      </form>
    );
  }
}
Form.propTypes = {
  onSubmitHandler: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Form;
