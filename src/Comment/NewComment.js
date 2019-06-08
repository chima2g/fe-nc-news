import React, { Component } from "react";
import { postComment } from "../utils";

class NewComment extends Component {
  state = { body: null };

  render() {
    return (
      <form>
        <label>
          <textarea
            value={this.state.value}
            placeholder="Your comment"
            rows="10"
            cols="50"
            onChange={this.handleCommentChange}
          />
        </label>
        <button
          type="button"
          disabled={this.state.body ? false : true}
          onClick={this.handleLoginSubmit}
        >
          Post
        </button>
      </form>
    );
  }

  handleCommentChange = event => {
    this.setState({ body: event.target.value });
  };

  handleLoginSubmit = event => {
    event.preventDefault();

    const { body } = this.state;
    const { loggedInUsername } = this.props;

    postComment(this.props.article_id, {
      body,
      username: loggedInUsername
    }).then(comment => {
      this.props.editArticle(comment);
    });
  };
}

export default NewComment;
