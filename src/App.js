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

// import loading from "./Util/loading.gif";

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
  }

  render() {
    return (
      <div>
        {/* <img
          src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_second.png"
          alt="Northcoders Logo"
          height="40%"
          width="40%"
        /> */}
        <NavigationBar
          loggedInUsername={this.state.loggedInUsername}
          handleLoginNameChange={this.handleLoginNameChange}
          handleLoginSubmit={this.handleLoginSubmit}
          handleLogout={this.handleLogout}
        />
        {this.getMain()}
      </div>
    );
  }

  getMain = () => {
    // if (this.state.loading)
    //   return (
    //     <div>
    //       <img src={loading} alt="Loading animation" height="25%" width="25%" />
    //     </div>
    //   );
    // else
    return (
      <div>
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
          <ErrorPage path="error" />
          <NoMatch default />
        </Router>
      </div>
    );
  };

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

          this.setState({
            loggedInUsername: usernameToLogin,
            usernameToLogin: null,
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
