import PropTypes from 'prop-types';
import React, { Component } from 'react';

class BookShelfSelector extends Component {

  handleSelectChange = event => {
    const { value } = event.target;

    this.props.updateToShelf(value);
  }

  render() {
    const { currentShelf } = this.props;

    return (
      <div className="book-shelf-changer">
        <select onChange={this.handleSelectChange} value={currentShelf || 'none'}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

BookShelfSelector.propTypes = {
  currentShelf: PropTypes.string,
  updateToShelf: PropTypes.func.isRequired
}

export default BookShelfSelector;