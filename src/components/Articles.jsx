import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Button, Form } from 'react-bootstrap';
import * as api from '../api';
import ArticlesForm from './ArticlesForm';
import Footer from './Footer';

class Articles extends Component {
  state = {
    articles: [],
    input: ''
  };
  render() {
    const { articles, input } = this.state;
    const { logonUser } = this.props;

    const searchedArticles = articles.filter(article => {
      return article.title.toLowerCase().includes(input.toLocaleLowerCase());
    });

    return (
      <div>
        {logonUser && (
          <ArticlesForm logonUser={logonUser} addArticle={this.addArticle} />
        )}
        {articles.length === 0 ? <h3>Loading articles...</h3> : null}
        {articles && (
          <ul className='articleList'>
            {searchedArticles.map(article => {
              return (
                <li
                  key={article.article_id}
                  className='articleView'
                  id={article.article_id}
                  style={{ cursor: 'pointer' }}
                >
                  <Link className='link' to={`/article/${article.article_id}`}>
                    <h4 className='articleTitle'>
                      Title: {article.title.slice(0, 30) + '...'}
                    </h4>
                    <h6> Topic: {article.topic}</h6>
                    <h6> {article.created_at.slice(0, 10)}</h6>
                  </Link>

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
                </li>
              );
            })}
          </ul>
        )}
        <Footer>
          <Form.Control
            className='articleSearch'
            onChange={this.handleChange}
            placeholder='Search By title...'
            type='text'
            value={input}
          />
        </Footer>
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
