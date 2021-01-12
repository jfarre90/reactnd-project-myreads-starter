import React, { Component } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class SearchPage extends Component {
  state = {
    booksFound: [],
    emptyInput: true
  };

  searchMatchingBooks = queryText => {
    BooksAPI.search(queryText.trim().toLowerCase())
      .then(booksFound => {
        if (booksFound.error) {
          this.setState({ booksFound: [], emptyInput: false })
        } else {
          this.setState({ booksFound, emptyInput: false });
        }
      })
      .catch(err => {
        console.error('### Error during search query. Error:', err);
      });
  }

  searchForBookMatchingText = queryText => {
    if (queryText.length > 0) {
      this.searchMatchingBooks(queryText.trim().toLowerCase());
    } else {
      this.setState({ booksFound: [], emptyInput: true });
    }
  }


  render() {
    const { updateBookToShelf } = this.props;
    const { booksFound, emptyInput } = this.state;

    return (
      <div className="search-books">
        <SearchInput searchBook={this.searchForBookMatchingText} />
        <SearchResults books={booksFound} updateBookToShelf={updateBookToShelf} emptyInput={emptyInput}/>
      </div>
    );
  }
}

SearchPage.propTypes = {
  updateBookToShelf: PropTypes.func.isRequired
}

export default SearchPage;