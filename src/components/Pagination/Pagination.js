import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Pagination.module.css';
import Page from './Page/Page';

class Pagination extends Component {
  state = {
    currentPage: 1,
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

  render() {
    const pagesList = [];
    for (let page = 1; page <= this.props.pages; page++) {
      pagesList.push(page);
    }
    const isFirstPage = this.state.currentPage === 1;
    const isLastPage = this.state.currentPage === this.props.pages;
    const previousPage = isFirstPage
      ? null
      : pagesList[this.state.currentPage - 2];
    const nextPage = isLastPage ? null : pagesList[this.state.currentPage];
    const isIndexAtTheBeginning = previousPage === 1 || isFirstPage;
    const isIndexAtTheEnd = nextPage === this.props.pages || isLastPage;

    return (
      <div className={styles.Pagination}>
        <ul>
          <Page
            onPageClickHandler={() =>
              this.onPageClickHandler(this.state.currentPage - 1)
            }
            shouldDisplay={true}
          >
            {'<'}
          </Page>

          <Page
            onPageClickHandler={() => this.onPageClickHandler(1)}
            shouldDisplay={!isIndexAtTheBeginning}
          >
            1
          </Page>

          <Page
            isClickable={false}
            shouldDisplay={
              !isFirstPage && !(isIndexAtTheBeginning || previousPage - 1 === 1)
            }
          >
            ...
          </Page>

          <Page
            onPageClickHandler={() => this.onPageClickHandler(previousPage)}
            shouldDisplay={!isFirstPage}
          >
            {previousPage}
          </Page>

          <Page isClickable={false} isCurrentPage={true} shouldDisplay={true}>
            {this.state.currentPage}
          </Page>

          <Page
            onPageClickHandler={() => this.onPageClickHandler(nextPage)}
            shouldDisplay={!isLastPage}
          >
            {nextPage}
          </Page>

          <Page
            isClickable={false}
            shouldDisplay={
              !isLastPage &&
              !(isIndexAtTheEnd || nextPage + 1 === this.props.pages)
            }
          >
            ...
          </Page>

          <Page
            onPageClickHandler={() => this.onPageClickHandler(pagesList.length)}
            shouldDisplay={!isIndexAtTheEnd}
          >
            {pagesList.length}
          </Page>

          <Page
            onPageClickHandler={() =>
              this.onPageClickHandler(this.state.currentPage + 1)
            }
            shouldDisplay={true}
          >
            {'>'}
          </Page>
        </ul>
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
