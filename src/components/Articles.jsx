import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Button } from 'react-bootstrap';
import * as api from '../api';
import ArticlesForm from './ArticlesForm';

class Articles extends Component {
  state = {
    articles: null
  };
  render() {
    const { articles } = this.state;
    const { logonUser } = this.props;
    return (
      <div>
        {logonUser && (
          <ArticlesForm logonUser={logonUser} addArticle={this.addArticle} />
        )}
        {articles &&
          articles.map(article => {
            return (
              <ul className='articleList' key={article.article_id}>
                <div
                  className='articleView'
                  id={article.article_id}
                  style={{ cursor: 'pointer' }}
                >
                  <Link className='link' to={`/article/${article.article_id}`}>
                    <h4 className='articleTitle'>Title: {article.title}</h4>
                    <h6> Topic: {article.topic}</h6>
                    <h6> {article.created_at.slice(0, 10)}</h6>
                  </Link>
                </div>
                {article.author === logonUser ? (
                  <Button
                    variant='danger'
                    size='sm'
                    onClick={this.handleDelete}
                    id={article.article_id}
                  >
                    Delete
                  </Button>
                ) : null}
              </ul>
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
