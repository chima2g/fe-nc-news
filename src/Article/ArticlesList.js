import React, { Component } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import baseUrl from '../utils';
import ArticleCard from './ArticleCard';

class ArticlesList extends Component {

    state = { articles : [] };

    componentDidMount() {
        axios.get(`${baseUrl}/articles`)
        .then(response => {
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
                        <Link to={`${article.article_id}`} key={article.article_id}>
                            <ArticleCard article={article} />
                        </Link>
                    )}
                </ul>
            </div>
        );
    }
}

export default ArticlesList;