import React, { Component } from 'react';
import { Link } from '@reach/router';
import { ListGroup, Button } from 'react-bootstrap';
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
        <ArticlesForm addArticle={this.addArticle} />
        {articles &&
          articles.map(article => {
            return (
              <ListGroup key={article.article_id} variant='flush'>
                <ListGroup.Item>
                  <ul>
                    <Link
                      to={`/article/${article.article_id}`}
                      id={article.article_id}
                      style={{ cursor: 'pointer' }}
                    >
                      <h4> Title: {article.title}</h4>
                    </Link>
                    <h6> Topic: {article.topic}</h6>
                    <h6> {article.created_at.slice(0, 10)}</h6>
                    <Button
                      variant='danger'
                      size='sm'
                      onClick={this.handleDelete}
                      id={article.article_id}
                    >
                      Delete
                    </Button>
                  </ul>
                </ListGroup.Item>
              </ListGroup>
            );
          })}
      </div>
    );
  }
  addArticle = articleToAdd => {
    this.setState({ articles: [articleToAdd, ...this.state.articles] });
  };

  componentDidMount = () => {
    const selectedTopic = this.props.topic;

    api.getArticles(selectedTopic).then(articles => {
      return this.setState({ articles });
    });
  };

  handleDelete = e => {
    const article_id = e.target.id;
    api.deleteArticle(article_id).then(() => {
      this.setState(state => ({
        articles: state.articles.filter(article => {
          return article.article_id !== Number(article_id);
        })
      }));
    });
  };
}

export default Articles;
