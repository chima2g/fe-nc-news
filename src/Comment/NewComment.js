import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from '../utils'

class NewComment extends Component {
    state = {body : null}

    render() {
        return <form>
                <label>
                    <textarea value={this.state.value} placeholder="Your comment" rows="10" cols="50" onChange={this.handleCommentChange} />
                </label>
                <button type="button" onClick={this.handleLoginSubmit}>Post</button>
            </form>
    }

    handleCommentChange = (event) => {
        this.setState({body: event.target.value});
    }
    
    handleLoginSubmit = (event) => {
        event.preventDefault();

        const {body} = this.state;
        const {loggedInUsername} = this.props;

        axios.post(`${baseUrl}/articles/${this.props.article_id}/comments`, {body, username: loggedInUsername})
        .then(response => {  
            this.props.editArticle(response.data.comment);
        })
        .catch(console.error)
    }
}

export default NewComment;