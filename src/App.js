import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DisplayPage from './DisplayPage';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI';
import './App.css'

class BooksApp extends Component {

  /*
    the shelves state will have the below format:
      shelves: {
        currentlyReading: [book1, book2, ...],
        wantToRead: [...]
      }
  */
  state = {
    shelves: {}
  }


  // getAvailableShelves = () => {
  //   return ['currentlyReading', 'wantToRead', 'read'];
  // }

  initializeMyShelves = books => {
    // I initialize the shelves this way in case that in the future we want to add more shelves.
    const initializedShelves = {};

    books.forEach(book => {
      if (book.shelf) {
        initializedShelves[book.shelf] = initializedShelves[book.shelf] ?
          [...initializedShelves[book.shelf], book.id] :
          [book.id];
      }
    });

    this.setState({ shelves: initializedShelves });
  };

  fetchMyBooks = () => {
    BooksAPI.getAll()
      .then(myBooks => {
        this.initializeMyShelves(myBooks);
      })
      .catch(err => {
        console.error('### Error during getAll query. Error:', err);
      });
  }

  componentDidMount() {
    this.fetchMyBooks();
  }

  updateBookToShelf = (bookId, newShelf, previousShelf) => {
    BooksAPI.update({ id: bookId }, newShelf)
      .then(res => {
        this.setState((currentState) => {
          const currentShelves = currentState.shelves;

          const newShelves = { ...currentShelves }

          if (newShelf !== 'none') {
            newShelves[newShelf]= [...currentShelves[newShelf], bookId];
          }

          if (previousShelf) {
            newShelves[previousShelf] = currentShelves[previousShelf].filter(bookIdInShelf => bookIdInShelf !== bookId);
          }

          return {
            shelves: newShelves
          }
        })
      })
      .catch(err => {
        console.error('### Error during update query. Error:', err);
      })
  }

  render() {
    return (
      <div className="app">
        <Switch>

          <Route path="/dashboard">
            <DisplayPage shelves={this.state.shelves} updateBookToShelf={this.updateBookToShelf} />
          </Route>

          <Route path="/search">
            <SearchPage shelves={this.state.shelves} />
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
