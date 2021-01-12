import PropTypes from 'prop-types';
import React from 'react';
import Book from './Book';

function SearchResults(props) {
    const { books, updateBookToShelf, emptyInput } = props;

    return (
      <div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.length > 0 && !emptyInput ? books.map(book => (
              <li key={book.id}>
                <Book bookId={book.id} updateBookToShelf={updateBookToShelf}/>
              </li>
            )) : emptyInput ? (
                <h3>Start typing your search text...</h3>
              ) : (
                <h1>No books found</h1>
              )
            }
          </ol>
        </div>
      </div>
    );
}

SearchResults.propTypes = {
  books: PropTypes.array.isRequired,
  updateBookToShelf: PropTypes.func.isRequired,
  emptyInput: PropTypes.bool.isRequired
}

export default SearchResults;