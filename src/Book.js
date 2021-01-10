import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  render() {
    const { coverUrl, title, authors } = this.props;

    return (
      <div className="book">

        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${coverUrl})` }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
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
  coverUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array
}

export default Book;