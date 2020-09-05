import React, { Component } from 'react';
import * as axios from 'axios';
import { connect } from 'react-redux';
import { addItem } from '../../../../actions/cart.actions';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

class PokemonItem extends Component {
  styles = StyleSheet.create({
    flexContainer: {
      display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
      flexDirection: 'row',
    },

    pokemonItem: {
      margin: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: 'transparent',
      paddingBottom: 5,
    },

    image: {
      height: 60,
      width: 60,
    },
  });

  state = {
    pokedexNumber: 0,
    name: '',
    imageUrl: 'http://pngimg.com/uploads/pokeball/pokeball_PNG2.png',
    addAnimation: false,
    loading: true,
  };

  source = null;
  _isMounted = false;

  async componentDidMount() {
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    this._isMounted = true;
    try {
      await this.getPokemonData();
    } catch (err) {
      console.error(err.message);
    }
  }

  async getPokemonData() {
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

  onImageLoad = () => {
    this.setState({ loading: false });
  };

  render() {
    // const basicCssClasses = this.props.disabled
    //   ? styles.PokemonItem
    //   : [styles.PokemonItem, styles.PokemonItemHover].join(' ');
    // const cssClassesWithAnimation = this.state.addAnimation
    //   ? [basicCssClasses, styles.AddedToCartAnimation].join(' ')
    //   : basicCssClasses;
    // const loading = this.state.loading ? <Loading /> : null;
    // const finalCssClasses = this.state.loading
    //   ? styles.Hide
    //   : cssClassesWithAnimation;

    return (
      <View style={this.styles.flexContainer}>
        <View style={this.styles.pokemonItem}>
          {/*{loading}*/}
          <TouchableOpacity onPress={this.pokemonSelectionHandler}>
            <View>
              <Image
                style={this.styles.image}
                onLoad={this.onImageLoad}
                source={{ uri: this.state.imageUrl }}
              />
              <Text>
                #{this.state.pokedexNumber} {this.state.name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
