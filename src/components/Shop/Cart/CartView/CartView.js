import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PokemonItem from '../../PokemonList/PokemonItem/PokemonItem';
import styles from './CartView.module.css';
import {displayCart} from '../../../../actions/navBar.actions';
import {removeAllItems, removeItem, updateQuantity} from '../../../../actions/cart.actions';
import {FaTrashAlt} from 'react-icons/all';
import {withRouter} from 'react-router-dom';

class CartView extends Component {

  componentDidMount() {
    this.props.displayCart();
  }

  onQuantityChangeHandler = (itemId, value) => {
    this.props.updateQuantity(itemId, value);
  }

  onRemoveItemHandler = (itemId) => {
    this.props.removeItem(itemId);
  }

  onSubmitHandler = () => {
    this.props.removeAllItems();
    this.props.history.push('/');
  }

  render() {
    let cartView = <h2>Your cart is empty</h2>;
    if (this.props.pokemons.length > 0) {
      cartView = (
        <React.Fragment>
          <h2>Your cart</h2>
          <div className={styles.Items}>
            {
              this.props.pokemons.map(pokemon => {
                return (
                  <div key={pokemon.id} className={styles.Item}>
                    <PokemonItem pokemonUrl={pokemon.url} disabled={true} />
                    <div className={styles.ItemQuantity}>
                      <label htmlFor={'quantity'}>Quantity: </label>
                      <input
                        className={styles.QuantityInput}
                        name={'quantity'}
                        type={'number'}
                        min={1}
                        value={pokemon.quantity}
                        onChange={(event) => this.onQuantityChangeHandler(pokemon.id, event.target.value)}
                      />
                      <button className={styles.RemoveItemButton} onClick={() => this.onRemoveItemHandler(pokemon.id)}><FaTrashAlt /></button>
                    </div>
                  </div>);
              })
            }
          </div>
          <form>
            <button className={styles.SubmitButton} type={'submit'} onClick={this.onSubmitHandler}>Order</button>
          </form>

        </React.Fragment>
      );
    }
    return (
      <div className={styles.CartView}>
        {cartView}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pokemons: state.cartReducer.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    displayCart: () => dispatch(displayCart()),
    updateQuantity: (id, value) => dispatch(updateQuantity(id, value)),
    removeItem: (id) => dispatch(removeItem(id)),
    removeAllItems: () => dispatch(removeAllItems())
  };
};

CartView.propTypes = {
  pokemons: PropTypes.array,
  displayCart: PropTypes.func,
  updateQuantity: PropTypes.func,
  removeItem: PropTypes.func,
  removeAllItems: PropTypes.func,
  history: PropTypes.object
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartView));
