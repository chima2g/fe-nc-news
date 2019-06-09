import React, { Component } from "react";
import { vote, deleteComment } from "../Util/utils";

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
            <button disabled={voteChange === 1} onClick={this.voteOnComment(1)}>
              Up Vote
            </button>
            <button
              disabled={voteChange === -1}
              onClick={this.voteOnComment(-1)}
            >
              Down Vote
            </button>
            {comment.author === loggedInUsername && (
              <button onClick={this._deleteComment}>Delete</button>
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
