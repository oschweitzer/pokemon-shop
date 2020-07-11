import React, { Component } from 'react';
import PokemonList from './PokemonList/PokemonList';
import styles from './Shop.module.css';
import { displayCart } from '../../actions/navBar.actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Section from '../../hoc/Section/Section';

class Shop extends Component {
  state = {
    maxItemsPerPage: 10,
  };

  componentDidMount() {
    this.props.displayCart();
  }

  onItemsPerPageSelectionHandler = (event) => {
    event.persist();
    this.setState({
      maxItemsPerPage: event.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className={styles.FiltersBar}>
          {/* Filter and search bar */}
          <label htmlFor={'itemsPerPage'}>Items per page</label>
          <select
            name={'itemsPerPage'}
            value={this.state.maxItemsPerPage}
            onChange={this.onItemsPerPageSelectionHandler}
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <h2>Pokemon</h2>
        <PokemonList maxItemsPerPage={+this.state.maxItemsPerPage} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    displayCart: () => dispatch(displayCart()),
  };
};

Shop.propTypes = {
  displayCart: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Section(Shop));
