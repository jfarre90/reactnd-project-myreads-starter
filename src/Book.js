import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelfSelector from './BookShelfSelector';
import * as BooksAPI from './BooksAPI';

class Book extends Component {

  state = {
    bookId: '',
    coverUrl: '',
    title: '',
    authors: [],
    shelf: ''
  }

  componentDidMount() {
    BooksAPI.get(this.props.bookId)
      .then(book => {
        this.setState({
          bookId: book.id,
          shelf: book.shelf,
          //TODO - handle when there is no imaglinks or thumnail
          coverUrl: book.imageLinks.thumbnail,
          title: book.title,
          authors: book.authors
        })
      })
      .catch(err => {
        console.error(`### Error when fetching book with id ${this.props.bookId}, Error:`, err);
      })
  }

  updateToShelf = newShelf => {
    this.setState({ shelf: newShelf });
    this.props.updateBookToShelf(this.state.bookId, newShelf);
  }


  render() {
    const { coverUrl, title, authors, shelf } = this.state;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${coverUrl})` }}></div>
          <BookShelfSelector updateToShelf={this.updateToShelf} currentShelf={shelf} />
        </div>

        <div className="book-title">{title}</div>

        {authors && authors.map(author => (
          <div key={author} className="book-authors">{author}</div>
        ))}

      </div>
    );
  }

}

Book.propTypes = {
  bookId: PropTypes.string.isRequired,
  updateBookToShelf: PropTypes.func.isRequired
}

export default Book;