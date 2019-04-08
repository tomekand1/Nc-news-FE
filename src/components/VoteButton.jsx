import React, { Component } from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import * as api from '../api';

class VoteButton extends Component {
  state = {
    votes: 0
  };
  render() {
    const { votes } = this.state;
    const { articleVotes, logonUser } = this.props;
    return (
      <div className='voteButtons'>
        {logonUser && (
          <Button
            variant='success'
            size='sm'
            disabled={votes === 1}
            onClick={() => this.handleClickVote(1)}
          >
            Like
          </Button>
        )}
        <h5>Likes: {articleVotes + votes} </h5>
        {logonUser && (
          <Button
            variant='danger'
            size='sm'
            disabled={votes === -1}
            onClick={() => this.handleClickVote(-1)}
          >
            Dislike
          </Button>
        )}
      </div>
    );
  }
  handleClickVote = voteNum => {
    const { article_id } = this.props;
    let obj = { inc_votes: voteNum };

    api.articleVote(article_id, obj);
    this.setState(prevState => ({
      votes: prevState.votes + voteNum
    }));
  };
}

export default VoteButton;
