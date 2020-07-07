import React, {Component} from 'react';
import {PokemonList} from './PokemonList/PokemonList';
import styles from './Shop.module.css';
import {displayCart} from '../../actions/navBar.actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Shop extends Component {

  componentDidMount() {
    this.props.displayCart();
  }

  render() {
    return (
        <div className={styles.Shop}>
          <div>
            {/* Filter and search bar */}
          </div>
          <PokemonList />
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    displayCart: () => dispatch(displayCart())
  }
};

Shop.propTypes = {
  displayCart: PropTypes.func
}

export default connect(null, mapDispatchToProps)(Shop);
