import axios from "axios";
import React from "react";
import { Link } from "@reach/router";

export const BASE_URL = "https://be-nc-news-chima2g.herokuapp.com/api";

export const errorMessage = (
  <p>
    Not to worry, you can always head back to the warm embrace of our{" "}
    <Link to={"/"}>homepage</Link>
  </p>
);

export const getUser = username => {
  return axios.get(`${BASE_URL}/users/${username}`).then(response => {
    const { user } = response.data;
    return user;
  });
};

export const getTopics = () => {
  return axios.get(`${BASE_URL}/topics`).then(response => {
    const { topics } = response.data;
    return topics;
  });
};

export const vote = (id, voteIncrease, isArticle) => {
  return axios.patch(
    `${BASE_URL}/${isArticle ? "articles" : "comments"}/${id}`,
    {
      inc_votes: voteIncrease
    }
  );
};

export const getArticles = searchTerm => {
  return axios
    .get(`${BASE_URL}/articles${searchTerm ? searchTerm : ""}`)
    .then(response => {
      const { articles } = response.data;
      return articles;
    });
};

export const getArticle = article_id => {
  return axios.get(`${BASE_URL}/articles/${article_id}`).then(response => {
    const { article } = response.data;
    return article;
  });
};

export const getCommentsByArticleID = article_id => {
  return axios
    .get(`${BASE_URL}/articles/${article_id}/comments`)
    .then(response => {
      const { comments } = response.data;
      return comments;
    });
};

export const deleteComment = comment_id => {
  return axios.delete(`${BASE_URL}/comments/${comment_id}`);
};

export const postComment = (article_id, comment) => {
  return axios
    .post(`${BASE_URL}/articles/${article_id}/comments`, comment)
    .then(response => {
      const { comment } = response.data;
      return comment;
    });
};
