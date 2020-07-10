import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Pagination.module.css';
import Page from './Page/Page';

class Pagination extends Component {
  state = {
    currentPage: 1,
    pageWindow: 7,
  };

  componentDidMount() {
    this.setState({
      currentPage: this.props.currentPage,
    });
  }

  onPageClickHandler = (page) => {
    if (!(page < 1) && !(page > this.props.pages)) {
      this.props.changePage(page);
      this.setState({
        currentPage: page,
      });
    }
  };

  getRange = (start, end) => {
    return Array(end - start + 1)
      .fill(0)
      .map((v, i) => i + start);
  };

  pagination = (currentPage, pageCount, delta) => {
    const range = {
      start: currentPage - delta,
      end: currentPage + delta,
    };

    if (range.start - 1 === 1 || range.end + 1 === pageCount) {
      range.start += 1;
      range.end += 1;
    }

    let pages =
      currentPage > delta
        ? this.getRange(
            Math.min(range.start, pageCount - delta),
            Math.min(range.end, pageCount),
          )
        : this.getRange(1, Math.min(pageCount, delta + 1));

    const withDots = (value, pair) =>
      pages.length + 1 !== pageCount ? pair : [value];

    if (pages[0] !== 1) {
      pages = withDots(1, [1, '...']).concat(pages);
    }

    if (pages[pages.length - 1] < pageCount) {
      pages = pages.concat(withDots(pageCount, ['...', pageCount]));
    }

    return pages;
  };

  render() {
    const pages = [];
    const pagination = this.pagination(
      this.state.currentPage,
      this.props.pages,
      this.state.pageWindow % 2 === 0
        ? this.state.pageWindow / 2 + 1
        : Math.floor(this.state.pageWindow / 2),
    );
    pagination.map((page, index) => {
      if (this.state.currentPage === page) {
        pages.push(
          <Page
            key={index}
            shouldDisplay={true}
            isCurrentPage={true}
            isClickable={false}
          >
            {page}
          </Page>,
        );
      } else {
        if (page === '...') {
          pages.push(
            <Page key={index} shouldDisplay={true} isClickable={false}>
              {page}
            </Page>,
          );
        } else {
          pages.push(
            <Page
              key={index}
              onPageClickHandler={() => this.onPageClickHandler(page)}
              shouldDisplay={true}
            >
              {page}
            </Page>,
          );
        }
      }
      return null;
    });

    return (
      <div className={styles.Pagination}>
        <ul>{pages}</ul>
      </div>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  pages: PropTypes.number,
  changePage: PropTypes.func,
};

export default Pagination;
