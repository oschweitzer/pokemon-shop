import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { removeAllItems } from '../../actions/cart.actions';
import styles from './Order.module.css';
import { withRouter } from 'react-router-dom';
import { FcPrint } from 'react-icons/all';
import Section from '../../hoc/Section/Section';
import ValidationFormSubmitButton from '../Buttons/ValidationButton/ValidationFormSubmitButton';

const Order = (props) => {
  const onValidationHandler = () => {
    props.removeAllItems();
    props.history.push('/');
  };

  useEffect(() => {
    if (props.pokemon.length === 0) {
      props.history.push('/');
    }
  });

  let recap = null;
  if (props.pokemon.length > 0) {
    recap = (
      <React.Fragment>
        <h2>Recap</h2>
        <table className={styles.RecapTable}>
          <thead>
            <tr>
              <th>Pokemon name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {props.pokemon.map((pokemon) => (
              <tr key={pokemon.id}>
                <td>{pokemon.name}</td>
                <td>{pokemon.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={onValidationHandler} className={styles.Actions}>
          <button className={styles.PrintButton} onClick={window.print}>
            <FcPrint />
          </button>
          <ValidationFormSubmitButton value={'OK'} />
        </form>
      </React.Fragment>
    );
  }
  return recap;
};

const mapStateToProps = (state) => {
  return {
    pokemon: state.cartReducer.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeAllItems: () => dispatch(removeAllItems()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Section(Order)),
);
