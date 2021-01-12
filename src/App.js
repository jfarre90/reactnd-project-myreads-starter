import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DisplayPage from './DisplayPage';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI';
import './App.css'

class BooksApp extends Component {
  state = {
    shelves: {}
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    BooksAPI.getAll()
      .then(myBooks => {
        this.initializeMyShelves(myBooks);
      })
      .catch(err => {
        console.error('### Error during getAll query. Error:', err);
      });
  }

  initializeMyShelves = books => {
    const initializedShelves = {};
    // I initialize the shelves this way to only show shelves with books in them
    books.forEach(book => {
      if (book.shelf) {
        initializedShelves[book.shelf] = initializedShelves[book.shelf] ?
          [...initializedShelves[book.shelf], book.id] :
          [book.id];
      }
    });

    this.setState({ shelves: initializedShelves });
  };

  updateBookToShelf = (bookId, shelf) => {
    BooksAPI.update({ id: bookId }, shelf)
      .then(updatedShelves => {
        this.setState({ shelves: updatedShelves });
      })
      .catch(err => {
        console.error('### Error during update query. Error:', err);
      });
  }

  render() {
    const { shelves } = this.state;

    return (
      <div className="app">
        <Switch>

          <Route path="/dashboard">
            <DisplayPage shelves={shelves} updateBookToShelf={this.updateBookToShelf} />
          </Route>

          <Route path="/search">
            <SearchPage updateBookToShelf={this.updateBookToShelf} />
          </Route>

          <Route path="/*">
            <Redirect to="/dashboard" />
          </Route>

        </Switch>
      </div>
    )
  }
}

export default BooksApp
