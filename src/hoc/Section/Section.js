import React, { Component } from 'react';
import styles from './Section.module.css';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const Section = (WrappedComponent) => {
  class Section extends Component {
    render() {
      return (
        <div className={styles.Section}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }
  Section.displayName = `Section(${getDisplayName(WrappedComponent)})`;
  return Section;
};

export default Section;
