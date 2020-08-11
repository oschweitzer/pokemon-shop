import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PokemonItem from '../../Shop/PokemonList/PokemonItem/PokemonItem';
import styles from './CartView.module.css';
import { displayCart } from '../../../actions/navBar.actions';
import {
  removeAllItems,
  removeItem,
  updateQuantity,
} from '../../../actions/cart.actions';
import { FaTrashAlt } from 'react-icons/all';
import { withRouter } from 'react-router-dom';
import Section from '../../../hoc/Section/Section';
import ValidationFormSubmitButton from '../../Buttons/ValidationButton/ValidationFormSubmitButton';
import { ORDER_RECAP } from '../../../constants/routes';

class CartView extends Component {
  componentDidMount() {
    this.props.displayCart();
  }

  onQuantityChangeHandler = (itemId, value) => {
    this.props.updateQuantity(itemId, value);
  };

  onRemoveItemHandler = (itemId) => {
    this.props.removeItem(itemId);
  };

  onSubmitHandler = () => {
    this.props.history.push(ORDER_RECAP);
  };

  render() {
    let cartView = <h2>Your cart is empty</h2>;
    if (this.props.pokemon.length > 0) {
      cartView = (
        <React.Fragment>
          <h2>Your cart</h2>
          <div className={styles.Items}>
            {this.props.pokemon.map((pokemon) => {
              return (
                <div key={pokemon.id} className={styles.Item}>
                  <PokemonItem pokemonUrl={pokemon.url} disabled={true} />
                  <div className={styles.ItemQuantity}>
                    <label htmlFor={`quantity_${pokemon.id}`}>Quantity: </label>
                    <input
                      className={styles.QuantityInput}
                      id={`quantity_${pokemon.id}`}
                      type={'number'}
                      min={1}
                      value={pokemon.quantity}
                      onChange={(event) =>
                        this.onQuantityChangeHandler(
                          pokemon.id,
                          event.target.value,
                        )
                      }
                    />
                    <button
                      className={styles.RemoveItemButton}
                      onClick={() => this.onRemoveItemHandler(pokemon.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <form onSubmit={this.onSubmitHandler}>
            <ValidationFormSubmitButton value={'Order'} />
          </form>
        </React.Fragment>
      );
    }
    return cartView;
  }
}

const mapStateToProps = (state) => {
  return {
    pokemon: state.cartReducer.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayCart: () => dispatch(displayCart()),
    updateQuantity: (id, value) => dispatch(updateQuantity(id, value)),
    removeItem: (id) => dispatch(removeItem(id)),
    removeAllItems: () => dispatch(removeAllItems()),
  };
};

CartView.propTypes = {
  pokemon: PropTypes.array,
  displayCart: PropTypes.func,
  updateQuantity: PropTypes.func,
  removeItem: PropTypes.func,
  removeAllItems: PropTypes.func,
  history: PropTypes.object,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Section(CartView)),
);
