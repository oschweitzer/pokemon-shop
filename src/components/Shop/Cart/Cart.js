import React, {Component} from 'react';
import {TiShoppingCart} from 'react-icons/all';
import styles from './Cart.module.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Cart extends Component {
  render() {
    return (
        <div className={styles.Cart}>
          <div className={styles.CartBox}>
            <span className="w3-badge w3-red margin-left">{this.props.numberOfArticles}</span>
            <TiShoppingCart />
            <span>Cart</span>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    numberOfArticles: state.cartReducer.items.length
  };
};

Cart.propTypes = {
  numberOfArticles: PropTypes.number
}

export default connect(mapStateToProps)(Cart);
