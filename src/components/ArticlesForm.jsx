import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class ArticlesForm extends Component {
  state = {
    inputBody: ''
  };
  render() {
    const { inputBody } = this.state;
    console.log(inputBody);
    return (
      <Form>
        <Form.Group className='commentInput'>
          <Form.Label />
          <Form.Control placeholder='Enter Title' type='text' />
          <label />
          <textarea
            placeholder='article...'
            className='form-control'
            rows='3'
            onChange={this.handleChange}
            value={inputBody}
          />
          <div>
            <button
              onClick={this.handleSubmitArticle}
              type='submit'
              className='btn btn-primary'
            >
              Submit
            </button>
          </div>
        </Form.Group>
      </Form>
    );
  }

  handleChange = e => {
    const inputBody = e.target.value;
    this.setState({ inputBody });
  };

  handleSubmitArticle = e => {
    e.preventDefault();
    console.log('he');
  };
}

export default ArticlesForm;

//'title', 'body', 'topic', 'username';
