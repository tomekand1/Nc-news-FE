import axios from 'axios';

const base_url = 'https://nc-news-server.herokuapp.com/api/';

export const getArticleById = article_id => {
  return axios
    .get(`${base_url}/articles/${article_id}`)
    .then(({ data }) => data.article);
};
