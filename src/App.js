import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import ArticlesList from './Article/ArticlesList';
import ArticleCard from './Article/ArticleCard'

class App extends React.Component {
  
  state = {loggedInUsername : null}

  render() {

    const {loggedInUsername} = this.state;

    return (
      <div>
        <img src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_second.png" alt="Northcoders Logo" height="40%" width="40%" />
        {!loggedInUsername && <form>
          <label> 
              <input type="text" name="login" placeholder="username" onChange={this.handleLoginNameChange} />
          </label>
          <button type="button" onClick={this.handleSubmit}>Login</button>
        </form>}
      {loggedInUsername &&<button type="button" onClick={this.handleSubmit}>Logout</button>}
        <Router>
          <ArticlesList path='/articles'/>
          <ArticleCard path='/articles/:article_id' />
        </Router>
      </div>
    )
  }

  handleSubmit = (event) => {
    this.setState({loggedInUsername: event.target.value});
  }

  handleLoginNameChange = (event) => {
    this.setState({usernameToLogin: event.target.value});
  }
}

export default App;
