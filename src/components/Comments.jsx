import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import CommentsForm from './CommentsForm';
import './style.css';
import * as api from '../api';

class Comments extends Component {
  state = {
    comments: []
  };
  render() {
    const { comments } = this.state;
    const { logonUser, article_id } = this.props;
    return (
      <div>
        {logonUser && (
          <CommentsForm
            logonUser={logonUser}
            addComment={this.addComment}
            article_id={article_id}
          />
        )}
        <h6 style={{ margin: '2em' }}>Comments:{comments.length}</h6>
        {comments.map(comment => {
          return (
            <div className='jumbotron' key={comment.comment_id}>
              <ul className='list'>{comment.body}</ul>
              <li className='author'>From: {comment.author}</li>
              {comment.author === logonUser.username ? (
                <Button
                  variant='danger'
                  size='sm'
                  onClick={this.handleDelete}
                  id={comment.comment_id}
                >
                  Delete
                </Button>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    const { article_id } = this.props;
    api.getCommentsByArticleId(article_id).then(comments => {
      return this.setState({ comments });
    });
  }

  addComment = commentToAdd => {
    this.setState({ comments: [commentToAdd, ...this.state.comments] });
  };

  handleDelete = e => {
    const comment_id = e.target.id;

    api.deleteComment(comment_id).then(() => {
      this.setState(state => ({
        comments: state.comments.filter(comment => {
          return comment.comment_id !== Number(comment_id);
        })
      }));
    });
  };
}

export default Comments;

///api/comments/:comment_id
