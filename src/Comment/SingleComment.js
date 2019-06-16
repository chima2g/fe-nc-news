import React, { Component } from "react";
import { vote, deleteComment } from "../Util/utils";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Voter from "../Util/Voter";

class SingleComment extends Component {
  state = { voteChange: 0 };

  render() {
    const { comment, loggedInUsername } = this.props;

    return (
      <Container>
        <InputGroup>
          <h3 className="mr-3">Comment {comment.comment_id}</h3>
          {loggedInUsername && (
            <div>
              <Voter
                vote={this.voteOnComment}
                voteChange={this.state.voteChange}
              />
              {comment.author === loggedInUsername && (
                <Button onClick={this._deleteComment}>
                  <i class="far fa-trash-alt" />
                </Button>
              )}
            </div>
          )}
        </InputGroup>
        <p>{comment.body}</p>
        <p>
          Author: {comment.author}, Created:{" "}
          {new Date(comment.created_at).toLocaleString()}, Votes:{" "}
          {comment.votes + this.state.voteChange}
        </p>
      </Container>
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
