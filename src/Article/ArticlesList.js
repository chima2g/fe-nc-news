import React, { Component } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import baseUrl from '../utils';

class ArticlesList extends Component {

    state = { articles : [] };

    componentDidMount() {
        axios.get(`${baseUrl}/articles`)
        .then(response => {
            console.log(response);
            const {articles} = response.data;
            this.setState({articles});
        })
    }

    render() {
        const {articles} = this.state;
        return ( articles && 
            <div>
                <ul>
                    {articles.map(article =>
                        <Link to={`${article.article_id}`}>
                            <li key={article.article_id}>
                                <h2>{article.title}</h2>
                                <p>Author: {article.author}, Topic: {article.topic}, Article ID: {article.article_id}, Created: {article.created_at}, Votes: {article.votes}, Comments: {article.comment_count}</p>
                            </li>
                        </Link>
                    )}
                </ul>
            </div>
        );
    }
}

export default ArticlesList;