import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from '../utils'
import CommentsList from '../Comment/CommentsList'
import NewComment from '../Comment/NewComment'

class SingleArticle extends Component { 
    state = { article : null, comments : [], voteChange : 0, enableCommentEditing : false};

    componentDidMount() {
        axios.get(`${baseUrl}/articles/${this.props.article_id}`)
        .then(response => {
            const {article} = response.data;

            axios.get(`${baseUrl}/articles/${this.props.article_id}/comments`)
            .then(response => {
                const {comments} = response.data;

                this.setState({article, comments});
            });
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
                    <button onClick={this.editComment(true)}>Comment</button>
                    {/* {article.author === loggedInUsername && <button onClick={this.deleteArticle}>Delete</button>}                     */}
                </div>}
            <p>{article.body}</p>
            <p>Author: {article.author}, Topic: {article.topic}, Created at: {new Date(article.created_at).toLocaleString()}, Votes: {article.votes + voteChange}</p>
            {this.state.enableCommentEditing && 
                <NewComment article_id={article.article_id} loggedInUsername={loggedInUsername} editArticle={this.editArticle}/>}
            <CommentsList comments={this.state.comments} deleteComment={this.deleteComment}loggedInUsername={loggedInUsername}/>
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

    editComment = (enable) => {
        return () => this.setState({enableCommentEditing : enable});
    }

    editArticle = (newComment) => {
        this.editComment(false)();

        const [...oldComments] = this.state.comments;
        this.setState({comments : [newComment, ...oldComments]});
    }

    deleteComment = (comment_id) => {
        const {comments} = this.state;
        const comentToDelete = comments.find(comment => comment.comment_id === comment_id)
        const [commentToDelete, ...commentsToKeep] = comments;

        this.setState({comments : commentsToKeep})
    }
}

export default SingleArticle;