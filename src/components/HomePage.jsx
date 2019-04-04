import React, { Component } from 'react';
import * as api from '../api';
import TopicForm from './TopicForm';

import { Link } from '@reach/router';

class HomePage extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;

    return (
      <div>
        <TopicForm addTopic={this.addTopic} />
        <h6>There are {topics.length} topics on our page! </h6>
        <ul>
          {topics.map(topic => {
            return (
              <Link
                to={`/articles/${topic.slug}`}
                id={topic.slug}
                style={{ cursor: 'pointer' }}
              >
                <h4> Title: {topic.slug}</h4>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
  componentDidMount = () => {
    api.getTopics().then(topics => {
      this.setState({ topics: topics });
    });
  };
  addTopic = topicToAdd => {
    this.setState({ topics: [topicToAdd, ...this.state.topics] });
  };
}

export default HomePage;
