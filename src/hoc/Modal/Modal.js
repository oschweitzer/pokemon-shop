import React, { Component } from 'react';
import styles from './Modal.module.css';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const Modal = (WrappedComponent) => {
  class Modal extends Component {
    state = {
      show: true,
    };

    render() {
      if (!this.state.show) {
        return null;
      }
      return (
        <div className={styles.Modal}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }
  Modal.displayName = `Section(${getDisplayName(WrappedComponent)})`;
  return Modal;
};

export default Modal;
