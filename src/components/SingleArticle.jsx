import React, { Component } from 'react';
import Axios from 'axios';
import Comments from './Comments';

class SingleArticle extends Component {
  state = {
    article: null
  };

  render() {
    const { article } = this.state;

    return (
      <div>
        <h1>Article </h1>
        {article && <h3>Title: {article.title}</h3>}
        {article && <p> {article.body}</p>}
        <div>
          <div>
            <h3>Add New Comment:</h3>
          </div>
          <Comments article_id={this.props.article_id} />
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    const { article_id } = this.props;
    const url = `https://nc-news-server.herokuapp.com/api/articles/${article_id}`;
    return Axios.get(url).then(({ data }) => {
      return this.setState({ article: data.article });
    });
  };
}

export default SingleArticle;
