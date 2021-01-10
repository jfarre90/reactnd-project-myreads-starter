import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class SearchResults extends Component {
  render() {
    const { books } = this.props;

    return (
      <div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.length > 0 ? books.map(book => (
              <li key={book.id}>
                <Book coverUrl={book.imageLinks.thumbnail} title={book.title} authors={book.authors} />
              </li>
            )) : (
                <h1>No books found</h1>
              )

            }
          </ol>
        </div>
      </div>
    );
  }

}

SearchResults.propTypes = {
  books: PropTypes.array.isRequired
}

export default SearchResults;