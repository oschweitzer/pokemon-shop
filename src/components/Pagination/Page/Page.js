import React, { Component } from 'react';
import styles from './Page.module.css';
import PropTypes from 'prop-types';

class Page extends Component {
  state = {
    isClickable: true,
    isCurrentPage: false,
  };

  updateState = (isClickable, isCurrentPage) => {
    this.setState({
      isClickable: isClickable ?? true,
      isCurrentPage: isCurrentPage || false,
    });
  };

  componentDidMount() {
    this.updateState(this.props.isClickable, this.props.isCurrentPage);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isClickable !== this.props.isClickable ||
      prevProps.isCurrentPage !== this.props.isCurrentPage
    ) {
      this.updateState(this.props.isClickable, this.props.isCurrentPage);
    }
  }

  render() {
    const classes = [
      styles.Page,
      this.props.classes,
      !this.state.isClickable ? styles.UnClickable : '',
      this.state.isCurrentPage ? styles.CurrentPage : '',
    ].join(' ');
    let pageComponent = (
      <li onClick={this.props.onPageClickHandler} className={classes}>
        {this.props.children}
      </li>
    );
    if (!this.state.isClickable) {
      pageComponent = <li className={classes}>{this.props.children}</li>;
    }
    return this.props.shouldDisplay ? pageComponent : null;
  }
}

Page.propTypes = {
  shouldDisplay: PropTypes.bool,
  onPageClickHandler: PropTypes.func,
  classes: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  isClickable: PropTypes.bool,
  isCurrentPage: PropTypes.bool,
};

export default Page;
