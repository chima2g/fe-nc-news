import React from 'react';
import SingleComment from './SingleComment'

const CommentsList = (props) => { 
   
    const {comments, loggedInUsername} = props;

    return ( comments && 
        <div>
            {comments.map(comment => <SingleComment comment={comment} deleteComment={props.deleteComment}key={comment.comment_id} loggedInUsername={loggedInUsername}/> )}
        </div>
    );
}

export default CommentsList;