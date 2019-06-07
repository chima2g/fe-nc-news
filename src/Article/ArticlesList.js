import React from 'react';
import { Link } from '@reach/router';
import ArticleCard from './ArticleCard';

const ArticlesList = (props) => {
    const {articles} = props;

    return <ul>
            {articles.map(article =>
                <Link to={`${article.article_id}`} key={article.article_id}>
                    <ArticleCard article={article} />
                </Link>
            )}
        </ul>
}

export default ArticlesList;