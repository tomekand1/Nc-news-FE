import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from '@reach/router';
class Articles extends Component {
  state = {
    articles: null
  };
  render() {
    const { articles } = this.state;
    return (
      <div>
        <form>
          <input type='text' />
        </form>
        {articles &&
          articles.map(article => {
            return (
              <p key={article.title}>
                <Link
                  to={`/article/${article.article_id}`}
                  id={article.article_id}
                  style={{ cursor: 'pointer' }}
                  key={article.article_id}
                >
                  {article.title}
                </Link>
              </p>
            );
          })}
      </div>
    );
  }
  componentDidMount = () => {
    const url = 'https://nc-news-server.herokuapp.com/api/articles';
    return Axios.get(url).then(({ data }) => {
      return this.setState({ articles: data.articles });
    });
  };
}

export default Articles;
