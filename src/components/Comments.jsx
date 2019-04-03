import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';
import CommentsForm from './CommentsForm';
import './style.css';

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
        <h6>Comments:</h6>
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
    const commentUrl = `https://nc-news-server.herokuapp.com/api/articles/${article_id}/comments`;
    axios.get(commentUrl).then(({ data }) => {
      return this.setState({ comments: data.comments });
    });
  }

  addComment = commentToAdd => {
    this.setState({ comments: [commentToAdd, ...this.state.comments] });
  };

  handleDelete = e => {
    const commentId = e.target.id;
    const url = `https://nc-news-server.herokuapp.com/api/comments/${commentId}`;

    axios.delete(url).then(() => {
      this.setState(state => ({
        comments: state.comments.filter(comment => {
          return comment.comment_id !== Number(commentId);
        })
      }));
    });
  };
}

export default Comments;

///api/comments/:comment_id
