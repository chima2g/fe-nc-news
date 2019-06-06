import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from '../utils'

class SingleComment extends Component {
    
    state = {voteChange : 0}

    render() {
        const {comment} = this.props; 
        const {voteChange} = this.state; 

        return <div>
                <button disabled={voteChange === 1} onClick={this.voteOnComment(1)}>Up Vote</button>
                <button disabled={voteChange === -1} onClick={this.voteOnComment(-1)}>Down Vote</button>
                <h3>Comment {comment.comment_id}: </h3>
                <p>{comment.body}</p>
                <p>Author: {comment.author}, Created: {new Date(comment.created_at).toLocaleString()}, Votes: {comment.votes + voteChange}</p>
            </div>
    }

    voteOnComment = (voteIncrease) => {
        const {comment_id} = this.props.comment;
        return  () => {    
            let voteChange = this.state.voteChange;
            voteChange += voteIncrease;
            this.setState({voteChange});

            axios.patch(`${baseUrl}/comments/${comment_id}`, { inc_votes : voteIncrease })
            .catch(() => {
                voteChange -= voteIncrease;
                this.setState({voteChange});
            })
        }    
    }
}

export default SingleComment;