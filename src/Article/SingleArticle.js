import React, { Component } from "react";
import CommentsList from "../Comment/CommentsList";
import NewComment from "../Comment/NewComment";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

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
    const { article, voteChange, loggedInUsername, error } = this.state;

    if (error)
      return (
        <Container>
          <p>{error}</p>
          {errorMessage}
        </Container>
      );

    return (
      article && (
        <Container>
          <h2>{article.title}</h2>
          {loggedInUsername && (
            <div>
              <Button
                disabled={voteChange === 1}
                onClick={this.voteOnArticle(1)}
              >
                Up Vote
              </Button>
              <Button
                disabled={voteChange === -1}
                onClick={this.voteOnArticle(-1)}
              >
                Down Vote
              </Button>
              <Button
                onClick={() =>
                  this.setState({
                    enableCommentEditing: true
                  })
                }
              >
                Comment
              </Button>
            </div>
          )}
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
