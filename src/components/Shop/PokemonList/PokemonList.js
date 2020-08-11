import React, { Component } from 'react';
import * as axios from 'axios';
import PokemonItem from './PokemonItem/PokemonItem';
import styles from './PokemonList.module.css';
import Pagination from '../../Pagination/Pagination';
import PropTypes from 'prop-types';

class PokemonList extends Component {
  state = {
    pokemon: [],
    totalPages: 0,
    offset: 0,
    currentPage: 1,
  };

  source = null;
  _isMounted = false;

  getPokemon = async (currentPage) => {
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    const offset = (currentPage - 1) * this.props.maxItemsPerPage;
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${this.props.maxItemsPerPage}`,
        {
          canceltoken: this.source.token,
        },
      );
      if (this._isMounted) {
        this.setState({
          pokemon: response.data.results,
          offset,
          currentPage,
          totalPages: Math.ceil(
            response.data.count / this.props.maxItemsPerPage,
          ),
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  async componentDidMount() {
    this._isMounted = true;
    await this.getPokemon(this.state.currentPage);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.maxItemsPerPage !== this.props.maxItemsPerPage) {
      await this.getPokemon(this.state.currentPage);
    }
  }

  componentWillUnmount() {
    this.source.cancel('Component unmounted');
    this._isMounted = false;
  }

  onChangePageHandler = async (currentPage) => {
    await this.getPokemon(currentPage);
  };

  render() {
    return (
      <div className={styles.MainContainer}>
        <div className={styles.List}>
          {this.state.pokemon.map((pokemon) => (
            <PokemonItem key={pokemon.name} pokemonUrl={pokemon.url} />
          ))}
        </div>
        <Pagination
          pages={this.state.totalPages}
          currentPage={this.state.currentPage}
          changePage={this.onChangePageHandler}
        />
      </div>
    );
  }
}

PokemonList.propTypes = {
  maxItemsPerPage: PropTypes.number,
};

export default PokemonList;
