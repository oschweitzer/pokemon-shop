import React, { Component } from 'react';
import { TiShoppingCart } from 'react-icons/all';
import styles from './Cart.module.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Cart extends Component {
  onCartClickHandler = () => {
    this.props.history.push('/cart');
  };

  render() {
    return (
      <div className={styles.Cart} onClick={this.onCartClickHandler}>
        <div className={styles.CartBox}>
          <span className="w3-badge w3-red margin-left">
            {this.props.numberOfArticles}
          </span>
          <TiShoppingCart />
          <span>Cart</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    numberOfArticles: state.cartReducer.total,
  };
};

Cart.propTypes = {
  numberOfArticles: PropTypes.number,
  history: PropTypes.object,
};

export default withRouter(connect(mapStateToProps)(Cart));
