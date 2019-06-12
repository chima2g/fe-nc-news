import React from "react";
import Card from "react-bootstrap/Card";

const ArticleCard = ({ article }) => {
  return (
    <Card key={article.article_id}>
      <Card.Header as="h5">{article.title}</Card.Header>
      <Card.Body>
        <p>{article.body}</p>
        <blockquote className="blockquote mb-0">
          <footer className="blockquote-footer">
            Author: {article.author}, Topic: {article.topic}, Article ID:{" "}
            {article.article_id}, Created:{" "}
            {new Date(article.created_at).toLocaleString()}, Votes:{" "}
            {article.votes}, Comments: {article.comment_count}
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;
