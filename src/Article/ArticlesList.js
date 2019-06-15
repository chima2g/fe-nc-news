import React from "react";
import { Link } from "@reach/router";
import ArticleCard from "./ArticleCard";

const ArticlesList = props => {
  const { articles } = props;

  return (
    <div class="mt-3 mr-5">
      <ul>
        {articles.map(article => (
          <Link to={`${article.article_id}`} key={article.article_id}>
            <ArticleCard article={article} />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesList;
