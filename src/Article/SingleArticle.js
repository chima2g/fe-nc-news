import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from '../utils'
import CommentsList from '../Comment/CommentsList'

class SingleArticle extends Component { 
    state = { article : null, voteChange : 0 };

    componentDidMount() {
        axios.get(`${baseUrl}/articles/${this.props.article_id}`)
        .then(response =>       {
            this.setState({article : response.data.article});
        });
    }

    render() {
        const {article} = this.state;
        const {voteChange} = this.state;
        const {loggedInUsername} = this.props;

        return article && (<div>
            <h2>{article.title}</h2>
            {loggedInUsername && 
                <div>
                    <button disabled={voteChange === 1} onClick={this.voteOnArticle(1)}>Up Vote</button>
                    <button disabled={voteChange === -1} onClick={this.voteOnArticle(-1)}>Down Vote</button>
                </div>}
            <p>{article.body}</p>
            <p>Author: {article.author}, Topic: {article.topic}, Created at: {new Date(article.created_at).toLocaleString()}, Votes: {article.votes + voteChange}</p>
            <CommentsList article_id={this.props.article_id} loggedInUsername={loggedInUsername}/>
        </div>)
    }

    voteOnArticle = (voteIncrease) => {
        return  () => {    
            let voteChange = this.state.voteChange;
            voteChange += voteIncrease;
            this.setState({voteChange});
    
            axios.patch(`${baseUrl}/articles/${this.props.article_id}`, { inc_votes : voteIncrease })
            .catch(() => {
                voteChange -= voteIncrease;
                this.setState({voteChange});
            })
        }    
    }
}
export default SingleArticle;