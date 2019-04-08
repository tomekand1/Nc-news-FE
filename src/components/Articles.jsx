import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Button, Form } from 'react-bootstrap';
import * as api from '../api';
import ArticlesForm from './ArticlesForm';
import StickyFooter from 'react-sticky-footer';

class Articles extends Component {
  state = {
    articles: [],
    input: ''
  };
  render() {
    const { articles, input } = this.state;
    const { logonUser } = this.props;

    const searchedArticles = articles.filter(article => {
      return article.title.toLowerCase().includes(this.state.input);
    });

    console.log(searchedArticles);

    return (
      <div>
        {logonUser && (
          <ArticlesForm logonUser={logonUser} addArticle={this.addArticle} />
        )}

        {articles &&
          searchedArticles.map(article => {
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
        <StickyFooter
          bottomThreshold={50}
          stickyStyles={{
            backgroundColor: 'rgba(255,255,255,.8)',
            padding: '10px',
            position: 'absolute',
            right: '10px'
          }}
        >
          <Form onSubmit={this.handleSearch}>
            <Form.Control
              onChange={this.handleChange}
              placeholder='title search'
              type='text'
              value={input}
            />
          </Form>
        </StickyFooter>
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

  clearInput = () => {
    this.setState({ input: '' });
  };

  handleChange = e => {
    let input = e.target.value;
    this.setState({ input });
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
