import React, { Component } from "react";
import CommentsList from "../Comment/CommentsList";
import NewComment from "../Comment/NewComment";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Voter from "../Util/Voter";

import {
  getArticle,
  getCommentsByArticleID,
  vote,
  errorMessage
} from "../Util/utils";

class SingleArticle extends Component {
  state = {
    article: null,
    comments: [],
    voteChange: 0,
    enableCommentEditing: false,
    error: null
  };

  componentDidMount() {
    getArticle(this.props.article_id)
      .then(article => {
        getCommentsByArticleID(this.props.article_id).then(comments =>
          this.setState({ article, comments, error: null })
        );
      })
      .catch(error => {
        this.setState({ error: error.response.data.msg });
      });
  }

  render() {
    const { article, voteChange, error } = this.state;
    const { loggedInUsername } = this.props;
    if (error)
      return (
        <Container>
          <p>{error}</p>
          {errorMessage}
        </Container>
      );

    return (
      article && (
        <Container className="mt-4">
          <InputGroup className="mb-3">
            <h2 className="mr-3">{article.title}</h2>
            {loggedInUsername && (
              <div>
                <Voter vote={this.voteOnArticle} voteChange={voteChange} />
                <Button
                  onClick={() =>
                    this.setState({
                      enableCommentEditing: true
                    })
                  }
                >
                  <i className="far fa-comment" />
                </Button>
              </div>
            )}
          </InputGroup>
          <p>{article.body}</p>
          <p>
            Author: {article.author}, Topic: {article.topic}, Created at:{" "}
            {new Date(article.created_at).toLocaleString()}, Votes:{" "}
            {article.votes + voteChange}
          </p>
          {this.state.enableCommentEditing && (
            <NewComment
              article_id={article.article_id}
              loggedInUsername={loggedInUsername}
              addCommentToArticle={this.addCommentToArticle}
            />
          )}
          <CommentsList
            comments={this.state.comments}
            deleteComment={this.deleteComment}
            undoDeleteComment={this.undoDeleteComment}
            loggedInUsername={loggedInUsername}
          />
        </Container>
      )
    );
  }

  voteOnArticle = voteIncrease => {
    return () => {
      let voteChange = this.state.voteChange;
      voteChange += voteIncrease;
      this.setState({ voteChange });

      vote(this.props.article_id, voteIncrease, true).catch(() => {
        voteChange -= voteIncrease;
        this.setState({ voteChange });
      });
    };
  };

  addCommentToArticle = newComment => {
    this.setState({ enableCommentEditing: false });

    const [...existingComments] = this.state.comments;
    this.setState({
      comments: [newComment, ...existingComments]
    });
  };

  deleteComment = comment_id => {
    const { comments } = this.state;
    const [...existingComments] = comments;
    const newComments = existingComments.filter(
      comment => comment.comment_id !== comment_id
    );

    this.setState({ comments: newComments, commentsPreDelete: comments });
  };

  undoDeleteComment = () => {
    this.setState({ comments: this.state.commentsPreDelete });
  };
}

export default SingleArticle;
