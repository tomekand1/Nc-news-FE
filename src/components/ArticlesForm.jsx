import React, { Component } from 'react';
import { Form, Dropdown, Button } from 'react-bootstrap';
import * as api from '../api';

class ArticlesForm extends Component {
  state = {
    inputBody: '',
    inputTitle: '',
    topics: []
  };
  render() {
    const { inputBody, inputTitle, topics } = this.state;
    return (
      <Form>
        <h6>Add Article:</h6>
        <Dropdown>
          <select className='form-control' id='sel2'>
            <option> Select topic ...</option>
            {topics.map(topic => {
              return (
                <option value={topic.slug} id={topic.topic_id}>
                  {topic.slug}
                </option>
              );
            })}
          </select>
        </Dropdown>
        <Form.Group className='commentInput'>
          <Form.Label />
          <Form.Control
            onChange={e => this.handleChange(e, 'title')}
            placeholder='Enter Title'
            type='text'
            value={inputTitle}
          />
          <label />
          <textarea
            placeholder='article...'
            className='form-control'
            rows='3'
            onChange={e => this.handleChange(e, 'body')}
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

  handleChange = (e, inputText) => {
    const input = e.target.value;
    return inputText === 'body'
      ? this.setState({ inputBody: input })
      : this.setState({ inputTitle: input });
  };

  handleSubmitArticle = e => {
    e.preventDefault();
    const { inputBody, inputTitle } = this.state;
    const obj = {
      title: inputTitle,
      body: inputBody,
      topic: 'cooking',
      username: 'weegembump'
    };
    api.postArticles(obj).then(console.log);
  };

  componentDidMount = () => {
    api.getTopics().then(topics => {
      this.setState({ topics: topics });
    });
  };
}

export default ArticlesForm;

//'title', 'body', 'topic', 'username';
