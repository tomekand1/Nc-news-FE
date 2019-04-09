import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Button, Form } from 'react-bootstrap';
import * as api from '../api';
import ArticlesForm from './ArticlesForm';
import Footer from './Footer';

class Articles extends Component {
  state = {
    articles: [],
    input: '',
    swipe: false
  };
  render() {
    const { articles, input, swipe } = this.state;
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
        <h6 style={{ margin: '2em' }}>Articles: {searchedArticles.length} </h6>
        {articles && (
          <ul className='articleList' onTouchMove={this.handleScroll}>
            {searchedArticles.map(article => {
              return (
                <li
                  key={article.article_id}
                  className='articleView'
                  id={article.article_id}
                  style={{ cursor: 'pointer' }}
                >
                  <Link className='link' to={`/article/${article.article_id}`}>
                    <h6> Topic: {article.topic}</h6>
                    <h4 className='articleTitle'>
                      Title: {article.title.slice(0, 30) + '...'}
                    </h4>
                    <p className='articleDate'>
                      {article.created_at.slice(0, 10)}
                    </p>
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
        {swipe && (
          <Footer>
            <Form.Control
              className='articleSearch'
              onChange={this.handleChange}
              placeholder='Search By title...'
              type='text'
              value={input}
            />
          </Footer>
        )}
      </div>
    );
  }

  handleScroll = e => {
    this.setState({ swipe: true });
  };

  addArticle = articleToAdd => {
    this.setState({ articles: [articleToAdd, ...this.state.articles] });
  };

  componentDidUpdate(prevProps) {
    if (this.props.topic !== prevProps.topic) {
      this.getArticles();
    }
  }

  componentDidMount = () => {
    this.getArticles();
  };

  getArticles = () => {
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
