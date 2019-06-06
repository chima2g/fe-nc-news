import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from '../utils'
import SingleComment from './SingleComment'

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
                {comments.map(comment => <SingleComment comment={comment} key={comment.comment_id}/> )}
            </div>
        );
    }
}
export default CommentsList;