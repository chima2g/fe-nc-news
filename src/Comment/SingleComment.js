import React, { Component } from "react";
import { vote, deleteComment } from "../Util/utils";
import Button from "react-bootstrap/Button";

class SingleComment extends Component {
  state = { voteChange: 0 };

  render() {
    const { comment } = this.props;
    const { voteChange } = this.state;
    const { loggedInUsername } = this.props;

    return (
      <div>
        {loggedInUsername && (
          <div>
            <Button disabled={voteChange === 1} onClick={this.voteOnComment(1)}>
              Up Vote
            </Button>
            <Button
              disabled={voteChange === -1}
              onClick={this.voteOnComment(-1)}
            >
              Down Vote
            </Button>
            {comment.author === loggedInUsername && (
              <Button onClick={this._deleteComment}>Delete</Button>
            )}
          </div>
        )}
        <h3>Comment {comment.comment_id}: </h3>
        <p>{comment.body}</p>
        <p>
          Author: {comment.author}, Created:{" "}
          {new Date(comment.created_at).toLocaleString()}, Votes:{" "}
          {comment.votes + voteChange}
        </p>
      </div>
    );
  }

  voteOnComment = voteIncrease => {
    return () => {
      let voteChange = this.state.voteChange;
      voteChange += voteIncrease;
      this.setState({ voteChange });

      vote(this.props.comment.comment_id, voteIncrease).catch(() => {
        voteChange -= voteIncrease;
        this.setState({ voteChange });
      });
    };
  };

  _deleteComment = () => {
    this.props.deleteComment(this.props.comment.comment_id);

    deleteComment(this.props.comment.comment_id).catch(
      () => this.props.undoDeleteComment
    );
  };
}

export default SingleComment;
