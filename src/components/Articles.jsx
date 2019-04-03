import React, { Component } from 'react';
import { Link } from '@reach/router';
import { ListGroup } from 'react-bootstrap';
import * as api from '../api';
import ArticlesForm from './ArticlesForm';

class Articles extends Component {
  state = {
    articles: null
  };
  render() {
    const { articles } = this.state;
    return (
      <div>
        <ArticlesForm />
        {articles &&
          articles.map(article => {
            return (
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <ul key={article.title}>
                    <Link
                      to={`/article/${article.article_id}`}
                      id={article.article_id}
                      style={{ cursor: 'pointer' }}
                    >
                      <h4> Title: {article.title}</h4>
                    </Link>
                    <h6> Topic: {article.topic}</h6>
                    <h6> {article.created_at.slice(0, 10)}</h6>
                  </ul>
                </ListGroup.Item>
              </ListGroup>
            );
          })}
      </div>
    );
  }
  componentDidMount = () => {
    api.getArticles().then(articles => {
      return this.setState({ articles });
    });
  };
}

export default Articles;
