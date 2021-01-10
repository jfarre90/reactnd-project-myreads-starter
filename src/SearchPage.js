import React, { Component } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class SearchPage extends Component {
  state = {
    booksFound: []
  };

  componentDidMount() {
    this.fetchAllBooks();
  }

  fetchAllBooks = () => {
    BooksAPI.getAll()
      .then(allBooks => {
        this.setState({ booksFound: allBooks });
      })
      .catch(err => {
        console.error('### Error during getAll query. Error:', err);
      });
  }

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
    if (queryText.length > 0) {
      this.searchMatchingBooks(queryText.trim().toLowerCase());
    } else {
      this.fetchAllBooks();
    }
  }


  render() {
    return (
      <div className="search-books">
        <SearchInput searchBook={this.searchForBookMatchingText} />
        <SearchResults books={this.state.booksFound} />
      </div>
    );
  }

}

// TODO: Define the required props
// SearchPage.propTypes = {
//     books: PropTypes.array.isRequired
// }

export default SearchPage;