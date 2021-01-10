import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchInput extends Component {
  state = {
    bookSearch: ''
  };

  componentDidMount() {
    this.inputTimer = null;
  }

  setInputTimer = textSearch => {
    // clearing previous search timeout
    clearTimeout(this.inputTimer);

    // setting new timeout after search text change, the query will be triggered if user does not write anything else in the next 500ms
    this.inputTimer = setTimeout(() => {
      this.props.searchBook(textSearch)
    }, 500);
  };

  handleBookSearchChange = event => {
    const { value } = event.target;

    this.setState({ bookSearch: value });

    this.setInputTimer(value);
  }

  render() {
    return (
      <div className="search-books-bar">
        <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
        <input type="text" name="bookSearch" value={this.state.bookSearch} placeholder="Search by title or author" onChange={this.handleBookSearchChange} />
      </div>
    );
  }
}

SearchInput.propTypes = {
  searchBook: PropTypes.func.isRequired
}

export default SearchInput;