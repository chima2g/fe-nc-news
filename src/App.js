import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import ArticlesList from './Article/ArticlesList';
import ArticleCard from './Article/ArticleCard';
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
        <Router>
          <ArticlesList path='/articles'/>
          <ArticleCard path='/articles/:article_id' />
        </Router>
      </div>
    )
  }

  handleLoginNameChange = (event) => {
    this.setState({usernameToLogin: event.target.value});
  }

  handleLoginSubmit = (event) => {
    axios.get(`${baseUrl}/users/${this.state.usernameToLogin}`)
        .then(response => {  
          const {user} = response.data;
          
          if(user)
            this.setState({loggedInUsername: this.state.usernameToLogin, usernameToLogin : null});
        })
        .catch(console.error);
  }

  handleLogout = (event) => {
    this.setState({loggedInUsername: null, usernameToLogin : null});
  }
}

export default App;
