import React, { Component } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import { activateModal, deactivateModal } from '../../actions/modal.actions';
import { login } from '../../actions/auth.actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { HOME } from '../../constants/routes';

class Modal extends Component {
  componentDidMount() {
    if (!this.props.isModalActivated) {
      this.props.activateModal();
    }
  }

  onCloseHandler = () => {
    if (this.props.history.length > 2) {
      this.props.history.goBack();
    } else {
      this.props.history.push(HOME);
    }
  };

  render() {
    return (
      <div className={styles.Modal}>
        {this.props.children(this.onCloseHandler)}
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
  activateModal: PropTypes.func,
  deactivateModal: PropTypes.func,
  isModalActivated: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    isModalActivated: state.modalReducer.isModalActivated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    activateModal: () => dispatch(activateModal()),
    deactivateModal: () => dispatch(deactivateModal()),
    login: (user) => dispatch(login(user)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));
