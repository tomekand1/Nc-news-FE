import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from '@reach/router';
import { ListGroup } from 'react-bootstrap';

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
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <ul>
                    <Link
                      key={article.title}
                      to={`/article/${article.article_id}`}
                      id={article.article_id}
                      style={{ cursor: 'pointer' }}
                    >
                      {article.title}
                    </Link>
                  </ul>
                </ListGroup.Item>
              </ListGroup>
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
