import React, { Component } from 'react';
import styles from './PokemonItem.module.css';
import * as axios from 'axios';
import { connect } from 'react-redux';
import { addItem } from '../../../../actions/cart.actions';
import PropTypes from 'prop-types';

class PokemonItem extends Component {
  state = {
    pokedexNumber: 0,
    name: '',
    imageUrl: '',
    addAnimation: false,
  };

  source = null;
  _isMounted = false;

  async componentDidMount() {
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    this._isMounted = true;
    try {
      const { data } = await axios.get(this.props.pokemonUrl, {
        canceltoken: this.source.token,
      });
      if (this._isMounted) {
        this.setState({
          pokedexNumber: data.id,
          name: `${data.name[0].toUpperCase()}${data.name.substring(1)}`,
          imageUrl: data.sprites.front_default,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  componentWillUnmount() {
    this.source.cancel('Component unmounted');
    this._isMounted = false;
  }

  pokemonSelectionHandler = () => {
    if (!this.props.disabled) {
      this.setState(
        {
          addAnimation: true,
        },
        () => {
          // Trick to remove the animation class so it can be used again
          setTimeout(() => {
            this.setState({ addAnimation: false });
          }, 500);
        },
      );
      this.props.onAddItem({
        id: this.state.pokedexNumber,
        name: this.state.name,
        url: this.props.pokemonUrl,
      });
    }
  };

  render() {
    const basicCssClasses = this.props.disabled
      ? styles.PokemonItem
      : [styles.PokemonItem, styles.PokemonItemHover].join(' ');
    const finalCssClasses = this.state.addAnimation
      ? [basicCssClasses, styles.AddedToCartAnimation].join(' ')
      : basicCssClasses;

    return (
      <div className={finalCssClasses} onClick={this.pokemonSelectionHandler}>
        <img alt={`Pokemon ${this.state.name}`} src={this.state.imageUrl} />
        <span className={styles.PokemonTextData}>
          #{this.state.pokedexNumber}
        </span>
        <span className={styles.PokemonTextData}>{this.state.name}</span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddItem: (pokemon) => dispatch(addItem(pokemon)),
  };
};

PokemonItem.propTypes = {
  pokemonUrl: PropTypes.string,
  onAddItem: PropTypes.func,
  disabled: PropTypes.bool,
};

export default connect(null, mapDispatchToProps)(PokemonItem);
