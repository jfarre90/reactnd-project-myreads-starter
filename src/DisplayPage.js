import React, { Component } from 'react';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { sentenceCase } from 'sentence-case';

class DisplayPage extends Component {

  render() {
    const { updateBookToShelf, shelves } = this.props;

    // get the different shelf ids
    const bookShelveIds = Object.keys(shelves);

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          {bookShelveIds.map(shelfId => {
            return (
              <BookShelf key={shelfId}
                bookIds={shelves[shelfId]}
                shelfTitle={sentenceCase(shelfId)}
                updateBookToShelf={updateBookToShelf}
                updateShelves={this.updateShelves}
              />
            );
          })}
        </div>

        <div className="open-search">
          <Link to="/search"><button>Add a book</button></Link>
        </div>
      </div>
    );
  }

}

DisplayPage.propTypes = {
  shelves: PropTypes.objectOf(PropTypes.array).isRequired,
  updateBookToShelf: PropTypes.func.isRequired
}

export default DisplayPage;