import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import './App.css';
import Articles from './components/Articles';
import HomePage from './components/HomePage';
import SingleArticle from './components/SingleArticle';
import { Nav } from 'react-bootstrap';
import * as api from './api';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import { navigate } from '@reach/router';
import Navigation from 'react-sticky-nav';
import BadUrl from './components/BadUrl';

class App extends Component {
  state = {
    users: [],
    logonUser: false,
    userAvatar: '',
    isSticky: true
  };
  render() {
    const { users, logonUser, userAvatar } = this.state;
    return (
      <div>
        <Navigation>
          <Nav className='nav'>
            <ul>
              <li>
                <Link className='linkNav' to='/'>
                  Home Page
                </Link>
              </li>
              <li>
                <Link className='linkNav' to='/articles'>
                  Articles
                </Link>
              </li>
              <li>
                {!logonUser && (
                  <Link className='linkNav' to='/login'>
                    Login
                  </Link>
                )}
              </li>
              <li>
                {logonUser && (
                  <Link className='linkNav' to='/' onClick={this.handleLogOut}>
                    Log Out
                  </Link>
                )}
              </li>
              {logonUser && (
                <li>
                  <li className='linkNav'>Welcome, {logonUser}</li>
                  <img
                    className='linkNav'
                    src={userAvatar.avatar_url}
                    width='60px'
                    height='40px'
                    alt='avatar'
                  />
                </li>
              )}
            </ul>

            {!logonUser && (
              <div className='isa_error'>
                <i className='fa fa-times-circle' />
                Login required for more options
              </div>
            )}
          </Nav>
        </Navigation>

        <Router>
          <HomePage logonUser={logonUser} path='/' />
          <SingleArticle logonUser={logonUser} path='/article/:article_id' />
          <Articles logonUser={logonUser} path='/articles' />
          <Articles logonUser={logonUser} path='/articles/:topic' />
          <Login
            usernameToLog={this.usernameToLog}
            users={users}
            path='/login'
          />
          <BadUrl path='/*' />
          <BadUrl path='/articles/*' />
        </Router>
      </div>
    );
  }
  componentDidMount = () => {
    api.getUsers().then(users => this.setState({ users }));
  };

  handleLogOut = () => {
    this.setState({ logonUser: false });
    navigate('/');
  };

  usernameToLog = logonUser => {
    this.setState({ logonUser: logonUser.username, userAvatar: logonUser });
    navigate('/');
  };
}

export default App;
