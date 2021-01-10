import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import BookShelf from './BookShelf';
import DisplayPage from './DisplayPage';
import SearchPage from './SearchPage';
import './App.css'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        <Switch>

          <Route path="/dashboard">
            <DisplayPage />
          </Route>

          <Route path="/search">
            <SearchPage />
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
