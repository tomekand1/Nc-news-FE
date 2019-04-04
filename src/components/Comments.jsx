import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Jumbotron } from 'react-bootstrap';
import CommentsForm from './CommentsForm';
import './style.css';
import * as api from '../api';

class Comments extends Component {
  state = {
    comments: []
  };
  render() {
    const { comments } = this.state;
    return (
      <div>
        <CommentsForm
          addComment={this.addComment}
          article_id={this.props.article_id}
        />
        <h6>Comments:{comments.length}</h6>
        {comments.map(comment => {
          return (
            <Jumbotron className='jumbotron' fluid>
              <ul key={comment.comment_id}>
                <li className='list'>
                  {comment.body}
                  <p className='author'>From: {comment.author}</p>
                </li>
                <Button
                  variant='danger'
                  size='sm'
                  onClick={this.handleDelete}
                  id={comment.comment_id}
                >
                  Delete
                </Button>
              </ul>
            </Jumbotron>
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
