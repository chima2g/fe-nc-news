import React from "react";
import Card from "react-bootstrap/Card";

const ArticleCard = ({ article }) => {
  return (
    <div className="mt-3">
      <Card key={article.article_id} className="mt-5">
        <Card.Body>
          <h3 className="mr-3">{article.title}</h3>
          <p>{article.body}</p>
          <blockquote className="blockquote mb-0">
            <footer className="blockquote-footer">
              <label className="mr-3">Author: {article.author}</label>
              <label className="mr-3">Topic: {article.topic}</label>
              <label className="mr-3">Article ID: {article.article_id}</label>
              <label className="mr-3">
                Created: {new Date(article.created_at).toLocaleString()}
              </label>
              <label className="mr-3">Votes: {article.votes}</label>
              <label className="mr-3">Comments: {article.comment_count}</label>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ArticleCard;
