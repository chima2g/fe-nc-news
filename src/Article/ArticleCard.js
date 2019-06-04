import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from '../utils'

class ArticleCard extends Component { 
    state = { article : null };

    componentDidMount() {
        axios.get(`${baseUrl}/articles/${this.props.article_id}`)
        .then(response =>       {
            this.setState({article : response.data.article});
        });
    }

    render(){ 
        const {article} = this.state;

        return article && (<div>
            <h2>{article.title}</h2>
            <p>{article.body}</p>
            <p>Author: {article.author}, Topic: {article.topic}, Created at: {article.created_at}, Votes: {article.votes}</p>
        </div>)
    }
}
export default ArticleCard;