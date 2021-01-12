import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BookShelf extends Component {
  render() {

    const { shelfTitle, updateBookToShelf, bookIds } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {bookIds.map(bookId => (
              <li key={bookId}>
                <Book bookId={bookId} updateBookToShelf={updateBookToShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  bookIds: PropTypes.array.isRequired,
  updateBookToShelf: PropTypes.func.isRequired
}

export default BookShelf;