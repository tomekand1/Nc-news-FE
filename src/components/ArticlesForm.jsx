import React, { Component } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import * as api from '../api';
import './style.css';

class ArticlesForm extends Component {
  state = {
    inputBody: '',
    inputTitle: '',
    inputTopic: '',
    selectTopic: false,
    topics: []
  };
  render() {
    const { inputBody, inputTitle, topics, selectTopic } = this.state;

    return (
      <Form className='form'>
        <h6>Add Article:</h6>
        <Dropdown>
          {selectTopic && <h3>Topic not Selected</h3>}
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
    console.log(logonUser);
    const obj = {
      title: inputTitle,
      body: inputBody,
      topic: inputTopic,
      username: logonUser
    };

    obj.topic === ''
      ? this.setState({ selectTopic: true })
      : api.postArticles(obj).then(article => {
          this.props.addArticle(article);
          this.setState({ selectTopic: false });
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
