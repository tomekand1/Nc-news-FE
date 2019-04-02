import React, { Component } from "react";
import Axios from "axios";
import Comments from "./Comments";
import { Jumbotron } from "react-bootstrap";

class SingleArticle extends Component {
  state = {
    article: null
  };

  render() {
    const { article } = this.state;

    return (
      <div>
        <Jumbotron fluid>
          <h1>Article </h1>
          {article && <h3>{article.title}</h3>}
          {article && <p> {article.body}</p>}
        </Jumbotron>
        <div>
          <div>
            <h4>Add New Comment:</h4>
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
