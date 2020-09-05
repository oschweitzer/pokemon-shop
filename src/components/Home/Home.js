import React, { useEffect } from 'react';
import pokeball from '../../assets/pokeball.png';
import styles from './Home.module.css';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/all';
import { hideCart } from '../../actions/navBar.actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Section from '../../hoc/Section/Section';

const Home = (props) => {
  useEffect(() => {
    props.hideCart();
  });

  return (
    <React.Fragment>
      <div className={styles.Home}>
        <img
          className={[styles.Pokeball, styles.Image].join(' ')}
          alt={'Pokeball'}
          src={pokeball}
        />
        <p className={styles.Description}>
          <FaQuoteLeft /> Pick your favorite pokemon, add them to your cart and
          they will be delivered to you, all free !!! <FaQuoteRight />
        </p>
      </div>
      <img
        src={'https://i.imgur.com/E9EHO5l.gif'}
        alt={'Pikachu'}
        className={styles.Image}
      />
    </React.Fragment>
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

export default Section(connect(null, mapDispatchToProps)(Home));
