import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import * as api from '../api';
import './style.css';

class TopicForm extends Component {
  state = {
    inputBody: '',
    inputTitle: '',
    badRequest: false
  };

  render() {
    const { inputBody, inputTitle, badRequest } = this.state;
    return (
      <Form className='form'>
        {badRequest && <p>Something is missing</p>}
        <Form.Group className='topicInput'>
          <Form.Label />
          <Form.Control
            onChange={e => this.handleChange(e, 'title')}
            placeholder='Topic Title ...'
            type='text'
            value={inputTitle === null ? '' : inputTitle}
            required
          />
          <label />
          <textarea
            placeholder='Description ...'
            className='form-control'
            rows='3'
            onChange={e => this.handleChange(e, 'body')}
            value={inputBody}
            required
          />
          <div>
            <Form.Text className='text-muted'>
              Press submit to add new topic
            </Form.Text>
            <button
              onClick={this.handleSubmitTopic}
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

  clearInput() {
    this.setState({ inputBody: '', inputTitle: '' });
  }

  handleChange = (e, inputText) => {
    const input = e.target.value;
    inputText === 'body'
      ? this.setState({ inputBody: input })
      : this.setState({ inputTitle: input });
  };

  handleSubmitTopic = e => {
    e.preventDefault();
    const { inputBody, inputTitle } = this.state;

    const obj = {
      slug: inputTitle.toLocaleLowerCase(),
      description: inputBody
    };

    api
      .postTopic(obj)
      .then(article => {
        this.props.addTopic(article);
        this.setState({ badRequest: false });
        this.clearInput();
      })
      .catch(() => this.setState({ badRequest: true }));
  };
}

export default TopicForm;
