import React, { Component } from 'react';
import axios from 'axios';
import CommentsForm from './CommentsForm';

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
        <h1>Comments</h1>
        {comments.map(comment => {
          return (
            <ul key={comment.comment_id}>
              <li> {comment.body}</li>
              <button onClick={this.handleDelete} id={comment.comment_id}>
                Delete
              </button>
            </ul>
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

    axios.delete(url).then(this.componentDidMount());
  };
}

export default Comments;

///api/comments/:comment_id
