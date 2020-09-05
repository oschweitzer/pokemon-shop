import React, { Component } from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';
import PokemonList from './PokemonList/PokemonList';

class Shop extends Component {
  styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },

    filtersBar: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    select: {
      borderRadius: 5,
      width: 80,
      marginLeft: 2,
      backgroundColor: 'white',
    },
  });

  state = {
    maxItemsPerPage: 10,
  };

  componentDidMount() {
    // this.props.displayCart();
  }

  onItemsPerPageSelectionHandler = (value) => {
    // event.persist();
    this.setState({
      maxItemsPerPage: value,
    });
  };

  render() {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.filtersBar}>
          <Text>Items per page</Text>
          <Picker
            selectedValue={this.state.maxItemsPerPage}
            onValueChange={this.onItemsPerPageSelectionHandler}
            style={this.styles.select}
          >
            <Picker.Item label={'10'} value={10} />
            <Picker.Item label={'50'} value={50} />
            <Picker.Item label={'100'} value={100} />
          </Picker>
        </View>
        <Text>Pokemon</Text>
        <PokemonList maxItemsPerPage={+this.state.maxItemsPerPage} />
      </View>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     displayCart: () => dispatch(displayCart()),
//   };
// };
//
// Shop.propTypes = {
//   displayCart: PropTypes.func,
// };

// export default connect(null, mapDispatchToProps)(Shop);

export default Shop;
