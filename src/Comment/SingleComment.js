import React from 'react';

const SingleComment = ({comment}) => {
    return <div>
            <h3>Comment {comment.comment_id}: </h3>
            <p>{comment.body}</p>
            <p>Author: {comment.author}, Created: {new Date(comment.created_at).toLocaleString()}, Votes: {comment.votes}</p>
        </div>
}

export default SingleComment;