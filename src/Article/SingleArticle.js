import React, { Component } from "react";
import { getArticle, getCommentsByArticleID, vote } from "../utils";
import CommentsList from "../Comment/CommentsList";
import NewComment from "../Comment/NewComment";

class SingleArticle extends Component {
  state = {
    article: null,
    comments: [],
    voteChange: 0,
    enableCommentEditing: false
  };

  componentDidMount() {
    getArticle(this.props.article_id).then(article => {
      getCommentsByArticleID(this.props.article_id).then(comments =>
        this.setState({ article, comments })
      );
    });
  }

  render() {
    const { article } = this.state;
    const { voteChange } = this.state;
    const { loggedInUsername } = this.props;

    return (
      article && (
        <div>
          <h2>{article.title}</h2>
          {loggedInUsername && (
            <div>
              <button
                disabled={voteChange === 1}
                onClick={this.voteOnArticle(1)}
              >
                Up Vote
              </button>
              <button
                disabled={voteChange === -1}
                onClick={this.voteOnArticle(-1)}
              >
                Down Vote
              </button>
              <button onClick={this.editComment(true)}>Comment</button>
              {/* {article.author === loggedInUsername && <button onClick={this.deleteArticle}>Delete</button>}                     */}
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
              editArticle={this.editArticle}
            />
          )}
          <CommentsList
            comments={this.state.comments}
            deleteComment={this.deleteComment}
            unDeleteComment={this.unDeleteComment}
            loggedInUsername={loggedInUsername}
          />
        </div>
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

  editComment = enable => {
    return () => this.setState({ enableCommentEditing: enable });
  };

  editArticle = newComment => {
    this.editComment(false)();

    const [...oldComments] = this.state.comments;
    this.setState({ comments: [newComment, ...oldComments] });
  };

  deleteComment = comment_id => {
    const { comments } = this.state;
    const [...existingComments] = comments;
    const newComments = existingComments.filter(
      comment => comment.comment_id !== comment_id
    );

    this.setState({ comments: newComments, commentsPreDelete: comments });
  };

  unDeleteComment = () => {
    this.setState({ comments: this.state.commentsPreDelete });
  };
}

export default SingleArticle;
