import React, { Component } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import * as api from '../api';
import './style.css';

class ArticlesForm extends Component {
  state = {
    inputBody: '',
    inputTitle: '',
    inputTopic: '',
    topics: [],
    noInput: false
  };
  render() {
    const { inputBody, inputTitle, topics, noInput } = this.state;

    return (
      <Form className='form'>
        <h6>Add Article:</h6>
        {noInput && <p className='noInput'>Something is missing</p>}
        <Dropdown>
          <select
            onChange={e => this.handleChange(e, 'topic')}
            className='form-control'
            id='sel2'
          >
            <option>Select topic ...</option>
            {topics.map(topic => {
              return (
                <option
                  key={topic.slug}
                  onClick={e => this.handleChange(e, 'topic')}
                  value={topic.slug}
                  id={topic.topic_id}
                >
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
            required
          />
          <label />
          <textarea
            placeholder='article...'
            className='form-control'
            rows='3'
            onChange={e => this.handleChange(e, 'body')}
            value={inputBody}
            required
          />
          <div>
            <Form.Text className='text-muted'>
              Press submit to add new article
            </Form.Text>
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
    if (inputText === 'body') {
      this.setState({ inputBody: input });
    } else if (inputText === 'title') {
      this.setState({ inputTitle: input });
    } else {
      this.setState({ inputTopic: input });
    }
  };

  handleSubmitArticle = e => {
    e.preventDefault();
    const { inputBody, inputTitle, inputTopic } = this.state;
    const { logonUser } = this.props;
    const articleInput = {
      title: inputTitle,
      body: inputBody,
      topic: inputTopic,
      username: logonUser
    };

    articleInput.topic === '' ||
    articleInput.body === '' ||
    articleInput.title === ''
      ? this.setState({ noInput: true })
      : api.postArticles(articleInput).then(article => {
          this.props.addArticle(article);
          this.setState({ noInput: false });
          this.clearInput();
        });
  };

  clearInput = () => {
    this.setState({
      inputBody: '',
      inputTitle: '',
      inputTopic: ''
    });
  };

  componentDidMount = () => {
    api.getTopics().then(topics => {
      this.setState({ topics: topics });
    });
  };
}

export default ArticlesForm;
