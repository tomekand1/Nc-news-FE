import React, { Component } from 'react';
import * as api from '../api';
import TopicForm from './TopicForm';
import './style.css';
import { navigate } from '@reach/router';

class HomePage extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;
    const { logonUser } = this.props;
    return (
      <div>
        {logonUser && (
          <div>
            <h5 style={{ margin: '2em' }}>Add new Topic</h5>
            <TopicForm addTopic={this.addTopic} />
          </div>
        )}
        <h6 style={{ margin: '2em' }}>Topics: {topics.length} </h6>
        <ul className='topicList'>
          {topics.map(topic => {
            return (
              <div
                className='topicView'
                onClick={e => this.handleClick(e, topic.slug)}
                key={topic.slug}
              >
                <h4> {topic.description}</h4>
                <h6> About: {topic.slug}</h6>
              </div>
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

  handleClick = (e, topicWhere) => {
    e.preventDefault();
    navigate(`/articles/${topicWhere}`);
  };

  addTopic = topicToAdd => {
    this.setState({ topics: [topicToAdd, ...this.state.topics] });
  };
}

export default HomePage;
