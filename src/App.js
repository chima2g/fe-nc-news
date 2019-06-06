import React from 'react';
import { Router, navigate, Link, Redirect } from '@reach/router';
import './App.css';
import ArticlesList from './Article/ArticlesList';
import SingleArticle from './Article/SingleArticle';
import UserProfile from './User/UserProfile';
import axios from 'axios';
import baseUrl from './utils';

class App extends React.Component {
  
  state = {loggedInUsername : null, usernameToLogin: null}

  render() {

    const {loggedInUsername} = this.state;

    return (
      <div>
        <img src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_second.png" alt="Northcoders Logo" height="40%" width="40%" />
        {!loggedInUsername && <form>
          <label>
              <input type="text" name="login" placeholder="username" onChange={this.handleLoginNameChange} />
          </label>
          <button type="button" onClick={this.handleLoginSubmit}>Login</button>
        </form>}

      {loggedInUsername &&<button type="button" onClick={this.handleLogout}>Logout</button>}
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
           <Link to={`users/${this.state.loggedInUsername}`}>
            <button>Profile</button>
          </Link>
        </div>
        <Router>
          <Redirect from="/" to="articles" noThrow/>
          <ArticlesList path='/articles' />
          <SingleArticle path='/articles/:article_id' loggedInUsername={this.state.loggedInUsername}/>
          <UserProfile path='/users/:username' loggedInUsername={this.state.loggedInUsername} />
        </Router>
      </div>
    )
  }

  handleLoginNameChange = (event) => {
    this.setState({usernameToLogin: event.target.value});
  }

  handleLoginSubmit = (event) => {
    const {usernameToLogin} = this.state;

    axios.get(`${baseUrl}/users/${usernameToLogin}`)
        .then(response => {  
          const {user} = response.data;
           
          if(user)
          {
            this.setState({loggedInUsername: usernameToLogin, usernameToLogin : null});
            navigate(`../users/${usernameToLogin}`, {state: {justLoggedIn : true}});
          }
        })
        .catch(console.error);
  }

  handleLogout = (event) => {
    this.setState({loggedInUsername: null, usernameToLogin : null});
  }
}

export default App;
