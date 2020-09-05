import React, { Component } from 'react';
import * as axios from 'axios';
import PokemonItem from './PokemonItem/PokemonItem';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, View } from 'react-native';
import Pagination from '../../Pagination/Pagination';
import { Divider } from 'react-native-elements';

class PokemonList extends Component {
  styles = StyleSheet.create({
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
    },

    list: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginLeft: 30,
      marginRight: 30,
    },
  });

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
      <View style={this.styles.mainContainer}>
        <ScrollView contentContainerStyle={this.styles.list}>
          {this.state.pokemon.map((pokemon) => (
            <PokemonItem key={pokemon.name} pokemonUrl={pokemon.url} />
          ))}
        </ScrollView>
        <Divider style={{ backgroundColor: 'black' }} />
        <Pagination
          pages={this.state.totalPages}
          currentPage={this.state.currentPage}
          changePage={this.onChangePageHandler}
        />
      </View>
    );
  }
}

PokemonList.propTypes = {
  maxItemsPerPage: PropTypes.number,
};

export default PokemonList;
