import React, { Component } from 'react';
import SingleComment from './SingleComment'

class CommentsList extends Component { 

    render() {
        const {comments, loggedInUsername} = this.props;

        return ( comments && 
            <div>
                {comments.map(comment => <SingleComment comment={comment} deleteComment={this.props.deleteComment}key={comment.comment_id} loggedInUsername={loggedInUsername}/> )}
            </div>
        );
    }
}
export default CommentsList;