import React, { Component } from 'react';
import './style.css';
import { Form } from 'react-bootstrap';
import * as api from '../api';

class CommentsForm extends Component {
  state = {
    body: ''
  };
  render() {
    const { body } = this.state;

    return (
      <Form onSubmit={this.handlePostNewComment}>
        <Form.Group className='commentInput'>
          <Form.Label />
          <Form.Control
            placeholder='Enter comment'
            value={body}
            type='text'
            onChange={this.handleBody}
            required
          />
        </Form.Group>
      </Form>
    );
  }

  handlePostNewComment = e => {
    e.preventDefault();
    const { article_id } = this.props;
    const obj = { username: 'grumpy19', body: this.state.body };

    api.postNewComment(article_id, obj).then(comment => {
      this.props.addComment(comment);
      this.clearInput();
    });
  };

  clearInput = () => {
    this.setState({
      body: ''
    });
  };

  handleBody = e => {
    this.setState({ body: e.target.value });
  };
}

export default CommentsForm;
