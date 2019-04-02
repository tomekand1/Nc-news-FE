import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import './App.css';
import Articles from './components/Articles';
import HomePage from './components/HomePage';
import SingleArticle from './components/SingleArticle';
import { Navbar, Nav } from "react-bootstrap"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar bg="light" expand="lg">

          <Navbar.Brand><Link to='/'> Home Page </Link></Navbar.Brand>
          <Nav.Link><Link to='/articles' > articles </Link></Nav.Link>

        </Navbar>
        <Router>
          <HomePage path='/' />
          <SingleArticle path='/article/:article_id' />
          <Articles path='/articles' />
        </Router>
      </div >
    );
  }
}

export default App;