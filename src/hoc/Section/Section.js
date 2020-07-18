import React, { Component } from 'react';
import styles from './Section.module.css';
import { deactivateModal } from '../../actions/modal.actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const Section = (WrappedComponent) => {
  class Section extends Component {
    componentDidMount() {
      this.props.deactivateModal();
    }

    render() {
      return (
        <div className={styles.Section}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      deactivateModal: () => dispatch(deactivateModal()),
    };
  };

  Section.displayName = `Section(${getDisplayName(WrappedComponent)})`;
  Section.propTypes = {
    deactivateModal: PropTypes.func,
  };

  return connect(null, mapDispatchToProps)(Section);
};

export default Section;
