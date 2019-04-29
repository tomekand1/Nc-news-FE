import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import * as api from '../api';
import './style.css';

class TopicForm extends Component {
  state = {
    inputBody: '',
    inputTitle: '',
    badRequest: false,
    noInput: false
  };

  render() {
    const { inputBody, inputTitle, badRequest, noInput } = this.state;
    return (
      <Form className='form'>
        {(badRequest || noInput) && (
          <p className='noInput'>Something is missing</p>
        )}
        <Form.Group className='topicInput'>
          <Form.Label />
          <Form.Control
            onChange={e => this.handleChange(e, 'inputTitle')}
            placeholder='Topic Title ...'
            type='text'
            value={inputTitle}
            required
          />
          <label />
          <textarea
            placeholder='Description ...'
            className='form-control'
            rows='3'
            onChange={e => this.handleChange(e, 'inputBody')}
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
    this.setState({ [inputText]: input });
  };

  handleSubmitTopic = e => {
    e.preventDefault();
    const { inputBody, inputTitle } = this.state;

    const topicData = {
      slug: inputTitle.toLocaleLowerCase(),
      description: inputBody
    };
    topicData.slug === '' || topicData.description === ''
      ? this.setState({ noInput: true })
      : api
          .postTopic(topicData)
          .then(article => {
            this.props.addTopic(article);
            this.setState({ badRequest: false, noInput: false });
            this.clearInput();
          })
          .catch(() => this.setState({ badRequest: true }));
  };
}

export default TopicForm;
