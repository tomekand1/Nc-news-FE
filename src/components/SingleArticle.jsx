import React, { Component } from 'react';
import Axios from 'axios';

class SingleArticle extends Component {
  state = {
    article: null,
    comments: [],
    body: ''
  };

  render() {
    const { article, comments, body } = this.state;

    return (
      <div>
        <h1>Article </h1>
        {article && <h3>Title: {article.title}</h3>}
        {article && <p> {article.body}</p>}
        <div>
          <div>
            <h3>Add New Comment:</h3>
            <form>
              <textarea value={body} type='text' onChange={this.handleBody} />
              <button onClick={this.handlePostNewComment}>Submit</button>
            </form>
          </div>
          <h1>Comments</h1>
          {comments.map(comment => {
            return <h6 key={comment.comment_id}> {comment.body}</h6>;
          })}
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    const { article_id } = this.props;

    const commetnUrl = `https://nc-news-server.herokuapp.com/api/articles/${article_id}/comments`;
    const url = `https://nc-news-server.herokuapp.com/api/articles/${article_id}`;
    return Axios.get(url)
      .then(({ data }) => {
        return this.setState({ article: data.article });
      })
      .then(
        Axios.get(commetnUrl).then(({ data }) => {
          return this.setState({ comments: data.comments });
        })
      );
  };

  handleBody = e => {
    this.setState({ body: e.target.value });
  };

  handlePostNewComment = e => {
    e.preventDefault();
    const { article_id } = this.props;
    const url = `https://nc-news-server.herokuapp.com/api/articles/${article_id}/comments`;
    const obj = { username: 'grumpy19', body: this.state.body };

    Axios.post(url, obj).then(res => {
      console.log(res.data.comment);
      this.setState({
        comments: [res.data.comment, ...this.state.comments]
      });
    });
  };
}

export default SingleArticle;
