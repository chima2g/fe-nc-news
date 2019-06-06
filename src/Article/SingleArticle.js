import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from '../utils'
import CommentsList from '../Comment/CommentsList'

class SingleArticle extends Component { 
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
            <p>Author: {article.author}, Topic: {article.topic}, Created at: {new Date(article.created_at).toLocaleString()}, Votes: {article.votes}</p>
            <CommentsList article_id={this.props.article_id}/>
        </div>)
    }
}
export default SingleArticle;