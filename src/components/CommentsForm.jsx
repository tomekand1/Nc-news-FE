import React, { Component } from 'react';
import Axios from 'axios';
import './style.css';
import { Form } from 'react-bootstrap';

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
          />
        </Form.Group>
      </Form>
    );
  }

  handlePostNewComment = e => {
    e.preventDefault();
    const { article_id } = this.props;
    const url = `https://nc-news-server.herokuapp.com/api/articles/${article_id}/comments`;

    const obj = { username: 'grumpy19', body: this.state.body };

    Axios.post(url, obj).then(res => {
      this.props.addComment(res.data.comment);
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
