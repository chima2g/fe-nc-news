import React from "react";
import { Router, navigate, Link, Redirect } from "@reach/router";
import "./App.css";
import ArticlesDisplay from "./Article/ArticlesDisplay";
import SingleArticle from "./Article/SingleArticle";
import UserProfile from "./User/UserProfile";
import { getUser } from "./utils";
import NoMatch from "./NoMatch";

class App extends React.Component {
  state = { loggedInUsername: null, usernameToLogin: null };

  componentDidMount() {
    const loggedInUsername = localStorage.getItem("loggedInUsername");
    if (loggedInUsername) this.setState({ loggedInUsername });
  }

  render() {
    const { loggedInUsername } = this.state;

    return (
      <div>
        <img
          src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_second.png"
          alt="Northcoders Logo"
          height="40%"
          width="40%"
        />
        {!loggedInUsername && (
          <form>
            <label>
              <input
                type="text"
                name="login"
                placeholder="jessjelly"
                onChange={this.handleLoginNameChange}
              />
            </label>
            <button type="button" onClick={this.handleLoginSubmit}>
              Login
            </button>
          </form>
        )}
        {loggedInUsername && (
          <label>
            Welcome {loggedInUsername}
            <button type="button" onClick={this.handleLogout}>
              Logout
            </button>
          </label>
        )}
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to={`users/${this.state.loggedInUsername}`}>
            <button>Profile</button>
          </Link>
        </div>
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
          />
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

    getUser(usernameToLogin).then(user => {
      if (user) {
        localStorage.setItem("loggedInUsername", usernameToLogin);

        this.setState({
          loggedInUsername: usernameToLogin,
          usernameToLogin: null
        });
        navigate(`../users/${usernameToLogin}`, {
          state: { justLoggedIn: true }
        });
      }
    });
  };

  handleLogout = event => {
    this.setState({ loggedInUsername: null, usernameToLogin: null });
    localStorage.removeItem("loggedInUsername");
  };
}

export default App;
