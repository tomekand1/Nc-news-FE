import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './style.css';

class Login extends Component {
  state = {
    inputUser: '',
    userNotFound: ''
  };
  render() {
    const { inputUser, userNotFound } = this.state;
    return (
      <div>
        <Form className='loginForm'>
          <h4>Demo user: jessjelly</h4>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type='username'
              placeholder='Enter user name'
              onChange={this.handleChange}
              value={inputUser}
            />
            <Form.Text className='text-muted'>
              {userNotFound && <h6 style={{ color: 'red' }}>User not exist</h6>}
              We'll never share your details with anyone else.
            </Form.Text>
          </Form.Group>
          <Button onClick={this.handleSubmit} variant='primary' type='submit'>
            Login
          </Button>
        </Form>
      </div>
    );
  }
  clearInput = () => {
    this.setState({
      inputUser: '',
      userNotFound: true
    });
  };

  handleChange = e => {
    const inputUser = e.target.value;
    this.setState({ inputUser });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { users } = this.props;
    const { inputUser } = this.state;

    const checkUsername = users.find(user => {
      return user.username === inputUser;
    });

    checkUsername === undefined
      ? this.clearInput()
      : this.props.usernameToLog(checkUsername);
  };
}

export default Login;
