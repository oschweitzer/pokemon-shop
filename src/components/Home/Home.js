import React, { useEffect } from 'react';
import pokeball from '../../assets/pokeball.png';
import styles from './Home.module.css';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/all';
import { hideCart } from '../../actions/navBar.actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Section from '../../hoc/Section';

const Home = (props) => {
  useEffect(() => {
    props.hideCart();
  });

  return (
    <div className={styles.Home}>
      <p className={styles.Description}>
        <FaQuoteLeft /> Pick your favorite pokemon, add them to your cart and
        they will delivered to you, all free !!! <FaQuoteRight />
      </p>
      <img className={styles.Pokeball} alt={'Pokeball'} src={pokeball} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideCart: () => dispatch(hideCart()),
  };
};

Home.propTypes = {
  hideCart: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Section(Home));
