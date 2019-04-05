import axios from 'axios';

const base_url = 'https://nc-news-server.herokuapp.com/api/';

//  articles handlers

export const getArticleById = article_id => {
  return axios
    .get(`${base_url}/articles/${article_id}`)
    .then(({ data }) => data.article);
};

export const getArticles = topic => {
  const url = topic
    ? `${base_url}/articles?topic=${topic}`
    : `${base_url}/articles`;

  return axios.get(url).then(({ data }) => data.articles);
};

export const postArticles = obj => {
  return axios
    .post(`${base_url}/articles`, obj)
    .then(({ data }) => data.article);
};

export const articleVote = (article_id, obj) => {
  return axios.patch(`${base_url}/articles/${article_id}`, obj);
};

export const deleteArticle = article_id => {
  return axios.delete(`${base_url}/articles/${article_id}`);
};

// comments handlers

export const postNewComment = (article_id, obj) => {
  return axios
    .post(`${base_url}/articles/${article_id}/comments`, obj)
    .then(({ data }) => data.comment);
};

export const getCommentsByArticleId = article_id => {
  return axios
    .get(`${base_url}/articles/${article_id}/comments`)
    .then(({ data }) => data.comments);
};

export const deleteComment = comment_id => {
  return axios.delete(`${base_url}/comments/${comment_id}`);
};

//topics handler

export const getTopics = () => {
  return axios.get(`${base_url}/topics`).then(({ data }) => data.topics);
};

export const postTopic = obj => {
  return axios.post(`${base_url}/topics`, obj).then(({ data }) => data.topic);
};

//users handlers
export const getUsers = () => {
  return axios.get(`${base_url}/users`).then(({ data }) => data.users);
};
