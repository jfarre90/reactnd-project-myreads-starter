import React, { Component } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class SearchPage extends Component {
  state = {
    booksFound: []
  };

  searchMatchingBooks = queryText => {
    BooksAPI.search(queryText.trim().toLowerCase())
      .then(booksFound => {
        if (booksFound.error) {
          this.setState({ booksFound: [] })
        } else {
          this.setState({ booksFound });
        }
      })
      .catch(err => {
        console.error('### Error during search query. Error:', err);
      });
  }

  searchForBookMatchingText = queryText => {
    this.searchMatchingBooks(queryText.trim().toLowerCase());
  }


  render() {
    const { updateBookToShelf } = this.props;
    const { booksFound } = this.state;

    return (
      <div className="search-books">
        <SearchInput searchBook={this.searchForBookMatchingText} />
        <SearchResults books={booksFound} updateBookToShelf={updateBookToShelf} />
      </div>
    );
  }
}

SearchPage.propTypes = {
  updateBookToShelf: PropTypes.func.isRequired
}

export default SearchPage;