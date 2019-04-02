import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import './App.css';
import Articles from './components/Articles';
import HomePage from './components/HomePage';
import SingleArticle from './components/SingleArticle';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <nav>
          <Link to='/'>Home Page</Link>
          <Link to='/articles'>articles</Link>
        </nav>
        <Router>
          <HomePage path='/' />
          <SingleArticle path='/article/:article_id' />
          <Articles path='/articles' />
        </Router>
      </div>
    );
  }
}

export default App;
