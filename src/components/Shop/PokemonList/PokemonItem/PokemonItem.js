import React, {Component} from 'react';
import styles from './PokemonItem.module.css';
import * as axios from 'axios';
import {connect} from 'react-redux';
import {addPokemon} from '../../../../actions/cart.actions';
import PropTypes from 'prop-types';

class PokemonItem extends Component {

  state = {
    pokedexNumber: 0,
    name: '',
    imageUrl: '',
    addAnimation: false
  }

  async componentDidMount() {
    const response = await axios.get(this.props.pokemonUrl);
    this.setState({
      pokedexNumber: response.data.id,
      name: `${response.data.name[0].toUpperCase()}${response.data.name.substring(1)}`,
      imageUrl: response.data.sprites.front_default
    });
  }

  pokemonSelectionHandler = () => {
    this.setState({
      addAnimation: true
    }, () => {
      // Trick to remove the animation class so it can be used again
      setTimeout(() => {
        this.setState({addAnimation: false}) },
          500
      );
    });
    this.props.onAddItem({id: this.state.pokedexNumber, name: this.state.name});
  }

  render() {
    let classes = this.state.addAnimation ? [styles.PokemonItem,
      styles.AddedToCartAnimation].join(' ') : styles.PokemonItem;
    return (
        <div className={classes} onClick={this.pokemonSelectionHandler}>
          <img alt={`Pokemon ${this.state.name}`} src={this.state.imageUrl} />
          <span className={styles.PokemonTextData}>#{this.state.pokedexNumber}</span>
          <span className={styles.PokemonTextData}>{this.state.name}</span>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddItem: (pokemon) => dispatch(addPokemon(pokemon))
  }
}

PokemonItem.propTypes = {
  pokemonUrl: PropTypes.string,
  onAddItem: PropTypes.func
}

export default connect(null, mapDispatchToProps)(PokemonItem);
