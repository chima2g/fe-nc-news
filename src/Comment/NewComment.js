import React, { Component } from "react";
import { navigate } from "@reach/router";
import { postComment } from "../Util/utils";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

class NewComment extends Component {
  state = { body: null, loading: false };

  render() {
    if (this.state.loading)
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    else
      return (
        <form>
          <label>
            <textarea
              value={this.state.body ? this.state.body : ""}
              placeholder="Your comment"
              rows="10"
              cols="50"
              onChange={this.handleCommentChange}
            />
          </label>
          <Button
            type="submit"
            disabled={this.state.body ? false : true}
            onClick={this.handleCommentSubmit}
          >
            Post
          </Button>
        </form>
      );
  }

  handleCommentChange = event => {
    this.setState({ body: event.target.value });
  };

  handleCommentSubmit = event => {
    event.preventDefault();

    this.setState({ loading: true });

    postComment(this.props.article_id, {
      body: this.state.body,
      username: this.props.loggedInUsername
    })
      .then(comment => {
        this.setState({ loading: false });
        this.props.addCommentToArticle(comment);
      })
      .catch(error => {
        this.setState({ loading: false });
        navigate("../error", {
          state: { msg: error.response.data.msg }
        });
      });
  };
}

export default NewComment;
