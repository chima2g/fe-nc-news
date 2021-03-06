import React from "react";
import { Router, navigate, Redirect } from "@reach/router";
import "./App.css";
import ArticlesDisplay from "./Article/ArticlesDisplay";
import SingleArticle from "./Article/SingleArticle";
import UserProfile from "./User/UserProfile";
import { getUser } from "./Util/utils";
import NoMatch from "./Util/NoMatch";
import ErrorPage from "./Util/ErrorPage";
import NavigationBar from "./NavigationBar";

class App extends React.Component {
  state = {
    loggedInUsername: null,
    usernameToLogin: null,
    error: null,
    loading: false
  };

  componentDidMount() {
    const loggedInUsername = localStorage.getItem("loggedInUsername");
    if (loggedInUsername) this.setState({ loggedInUsername });

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) this.setState({ loggedInUser });
  }

  render() {
    return (
      <div>
        <NavigationBar
          disableLoginButton={this.state.usernameToLogin ? false : true}
          loggedInUsername={this.state.loggedInUsername}
          loggedInUser={this.state.loggedInUser}
          handleLoginNameChange={this.handleLoginNameChange}
          handleLoginSubmit={this.handleLoginSubmit}
          handleLogout={this.handleLogout}
        />
        <Router>
          <Redirect from="/" to="articles" noThrow />
          <ArticlesDisplay path="/articles" />
          <SingleArticle
            path="/articles/:article_id"
            loggedInUsername={this.state.loggedInUsername}
          />
          <UserProfile
            path="/users/:username"
            loggedInUsername={this.state.loggedInUsername}
            loggedInUser={this.state.loggedInUser}
          />
          <ArticlesDisplay path="/users/:search_author/articles" />
          <ErrorPage path="error" />
          <NoMatch default />
        </Router>
      </div>
    );
  }

  handleLoginNameChange = event => {
    this.setState({ usernameToLogin: event.target.value });
  };

  handleLoginSubmit = event => {
    event.preventDefault();
    const { usernameToLogin } = this.state;

    this.setState({ loading: true });
    getUser(usernameToLogin)
      .then(user => {
        if (user) {
          localStorage.setItem("loggedInUsername", usernameToLogin);
          localStorage.setItem("loggedInUser", JSON.stringify(user));

          this.setState({
            loggedInUsername: usernameToLogin,
            usernameToLogin: null,
            loggedInUser: user,
            loading: false
          });
          navigate(`../users/${usernameToLogin}`, {
            state: { justLoggedIn: true }
          });
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        navigate("../error", {
          state: { msg: error.response.data.msg }
        });
      });
  };

  handleLogout = event => {
    event.preventDefault();
    this.setState({ loggedInUsername: null, usernameToLogin: null });
    localStorage.removeItem("loggedInUsername");
  };
}

export default App;
