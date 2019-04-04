import React, { Component } from 'react';
import './style.css';
import Comments from './Comments';
import { Jumbotron } from 'react-bootstrap';
import * as api from '../api';
import VoteButton from './VoteButton';

class SingleArticle extends Component {
  state = {
    article: null
  };

  render() {
    const { article } = this.state;
    const { article_id } = this.props;
    return (
      <div>
        <Jumbotron fluid>
          <h3>Article</h3>
          {article && (
            <div>
              <h3>{article.title}</h3>
              <p> {article.body}</p>
              <p>Author: {article.author}</p>
              <VoteButton
                article_id={article_id}
                articleVotes={article.votes}
              />
            </div>
          )}
        </Jumbotron>
        <div>
          <div>
            <h6>Add New Comment:</h6>
          </div>
          <Comments article_id={this.props.article_id} />
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    this.fetchArticle();
  };

  fetchArticle = () => {
    const { article_id } = this.props;
    api.getArticleById(article_id).then(article => {
      return this.setState({ article });
    });
  };
}

export default SingleArticle;
