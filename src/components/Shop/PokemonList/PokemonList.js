import React, {Component} from 'react';
import * as axios from 'axios';
import PokemonItem from './PokemonItem/PokemonItem';
import styles from './PokemonList.module.css';

export class PokemonList extends Component {

  state = {
    pokemons: []
  };

  async componentDidMount() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    this.setState({pokemons: response.data.results});
  }

  render() {
    return (
        <div className={styles.List}>
          {
            this.state.pokemons.map(pokemon =>
              <PokemonItem key={pokemon.name} pokemonUrl={pokemon.url} />
          )}
        </div>
    )
  }
}
