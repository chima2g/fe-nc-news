import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from '../utils'
// import SingleComment from '../Comments/SingleComment'

class CommentsList extends Component { 
    state = { comments : [] };

    componentDidMount() {
        axios.get(`${baseUrl}/articles/${this.props.article_id}/comments`)
        .then(response =>       {
            this.setState({comments : response.data.comments});
        });
    }

    render() {
        const {comments} = this.state;
        return ( comments && 
            <div>
                {comments.map(comment =>
                    <div>
                        <h3>Comment {comment.comment_id}: </h3>
                        <p>{comment.body}</p>
                        <p>Author: {comment.author}, Created: {new Date(comment.created_at).toLocaleString()}, Votes: {comment.votes}</p>
                    </div>
                    )}
            </div>
        );
    }
}
export default CommentsList;