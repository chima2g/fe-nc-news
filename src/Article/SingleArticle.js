import React, { Component } from "react";
import CommentsList from "../Comment/CommentsList";
import NewComment from "../Comment/NewComment";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Voter from "../Util/Voter";
import { navigate } from "@reach/router";

import { getArticle, getCommentsByArticleID, vote } from "../Util/utils";

class SingleArticle extends Component {
  state = {
    article: null,
    comments: [],
    voteChange: 0,
    enableCommentEditing: false
  };

  componentDidMount() {
    getArticle(this.props.article_id)
      .then(article => {
        getCommentsByArticleID(this.props.article_id).then(comments =>
          this.setState({ article, comments })
        );
      })
      .catch(error => {
        navigate("../error", {
          state: { msg: error.response.data.msg }
        });
      });
  }

  render() {
    const { article, voteChange } = this.state;
    const { loggedInUsername } = this.props;

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
            <label className="mr-3">Author: {article.author}</label>
            <label className="mr-3">Topic: {article.topic}</label>
            <label className="mr-3">Article ID: {article.article_id}</label>
            <label className="mr-3">
              Created: {new Date(article.created_at).toLocaleString()}
            </label>
            <label className="mr-3">Votes: {article.votes + voteChange}</label>
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
