import PropTypes from 'prop-types';
import React from 'react';

function BookShelfSelector(props) {
  const { currentShelf } = props;

  const handleSelectChange = event => {
    const { value } = event.target;

    props.updateToShelf(value);
  }

  return (
    <div className="book-shelf-changer">
      <select onChange={handleSelectChange} value={currentShelf || 'none'}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}


BookShelfSelector.propTypes = {
  currentShelf: PropTypes.string,
  updateToShelf: PropTypes.func.isRequired
}

export default BookShelfSelector;