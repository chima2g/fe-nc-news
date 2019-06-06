import React, { Component } from 'react';


const ArticleCard = ({article}) => 
    {
        return <li key={article.article_id}>
            <h2>{article.title}</h2>
            <p>Author: {article.author}, Topic: {article.topic}, Article ID: {article.article_id}, Created: {new Date(article.created_at).toLocaleString()}, Votes: {article.votes}, Comments: {article.comment_count}</p>
        </li>
    }

export default ArticleCard;