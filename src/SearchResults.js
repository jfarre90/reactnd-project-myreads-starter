import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class SearchResults extends Component {
  render() {
    const { books, updateBookToShelf } = this.props;

    return (
      <div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.length > 0 ? books.map(book => (
              <li key={book.id}>
                <Book bookId={book.id} updateBookToShelf={updateBookToShelf}/>
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
  books: PropTypes.array.isRequired,
  updateBookToShelf: PropTypes.func.isRequired,
}

export default SearchResults;