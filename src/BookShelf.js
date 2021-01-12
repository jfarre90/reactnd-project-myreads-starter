import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class BookShelf extends Component {
  state = {
    books: []
  };

  // fetchAllBooks = () => {
  //   BooksAPI.getAll()
  //     .then(allBooks => {
  //       this.setState({ booksFound: allBooks });
  //     })
  //     .catch(err => {
  //       console.error('### Error during getAll query. Error:', err);
  //     });
  // }

  componentDidMount() {
    BooksAPI.getAll()
      .then(allBooks => {
        this.setState({ books: allBooks.filter(myBook => myBook.shelf === this.props.shelfId) });
      })
      .catch(err => {
        console.error('### Error during getAll query. Error:', err);
      });
  }

  render() {

    const { shelfTitle, books, updateBookToShelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(bookId => (
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
  shelfId: PropTypes.string.isRequired,
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.array,
  updateBookToShelf: PropTypes.func.isRequired
}

export default BookShelf;