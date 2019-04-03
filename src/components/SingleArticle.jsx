import React, { Component } from 'react';
import './style.css';
import Axios from 'axios';
import Comments from './Comments';
import { Jumbotron, Button } from 'react-bootstrap';
import * as api from '../api';

class SingleArticle extends Component {
  state = {
    article: null,
    votes: 0
  };

  render() {
    const { article, votes } = this.state;
    return (
      <div>
        <Jumbotron fluid>
          <h3>Article</h3>
          {article && (
            <div>
              <h3>{article.title}</h3>
              <p> {article.body}</p>
              <div className='voteButtons'>
                <Button
                  variant='success'
                  size='sm'
                  disabled={votes === 1}
                  onClick={() => this.handleClickVote(1)}
                >
                  Vote Up
                </Button>
                <h5>Votes: {article.votes + votes} </h5>
                <Button
                  variant='danger'
                  size='sm'
                  disabled={votes === -1}
                  onClick={() => this.handleClickVote(-1)}
                >
                  Vote Down
                </Button>
              </div>
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

  handleClickVote = voteNum => {
    const { article_id } = this.props;
    let obj = { inc_votes: voteNum };
    const url = `https://nc-news-server.herokuapp.com/api/articles/${article_id}`;

    Axios.patch(url, obj);
    this.setState(prevState => ({
      votes: prevState.votes + voteNum
    }));
  };
}

export default SingleArticle;
