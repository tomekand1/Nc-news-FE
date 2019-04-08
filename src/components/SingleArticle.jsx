import React, { Component } from 'react';
import './style.css';
import Comments from './Comments';
import * as api from '../api';
import VoteButton from './VoteButton';

class SingleArticle extends Component {
  state = {
    article: null
  };

  render() {
    const { article } = this.state;
    const { article_id, logonUser } = this.props;

    return (
      <div>
        <div className='jumbotron'>
          <h3>Article</h3>
          {article && (
            <div>
              <h3>{article.title}</h3>
              <p> {article.body}</p>
              <p>Author: {article.author}</p>
              <VoteButton
                logonUser={logonUser}
                article_id={article_id}
                articleVotes={article.votes}
              />
            </div>
          )}
        </div>
        <div>
          <div>{logonUser && <h6>Add New Comment:</h6>}</div>
          <Comments logonUser={logonUser} article_id={this.props.article_id} />
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
