import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from '../utils';
import ArticlesList from './ArticlesList';

class ArticlesDisplay extends Component {

    state = { articles : [], topics : [], searchTopic : "any", searchSort : "any", searchAuthor : ""};

    componentDidMount() {
        axios.get(`${baseUrl}/articles`)
        .then(response => {
            const {articles} = response.data;
            this.setState({articles});
        })

        axios.get(`${baseUrl}/topics`)
        .then(response => {
            const {topics} = response.data;
            this.setState({topics});
        })

    }

    render() {
        return <div>
                    <form action="/action_page.php">
                        <label>Topic
                            <select name="topic" onChange={this.handleTopicChange}>
                                <option value="any" key="any"></option>
                                {this.state.topics.map(topic => <option value={topic.slug} key={topic.slug}>{topic.slug}</option> )}
                            </select>
                        </label>
                        <label>Author
                            <input type="text" name="author" onChange={this.handleAuthorChange} />
                        </label>
                        <label>Sort By
                            <select name="sort_by" onChange={this.handleSortChange}>
                                <option value="any" key="any"></option>
                                <option value="title" key="title">title</option>
                                <option value="topic" key="topic">topic</option>
                                <option value="author" key="author">author</option>
                                <option value="votes" key="votes">votes</option>
                                <option value="comment_count" key="comment_count">comment count</option>
                                <option value="created_at" key="created_at">date</option>
                            </select>
                        </label>
                        <button type="button" onClick={this.handleSearchSubmit}>search</button>
                    </form>
                    <ArticlesList articles={this.state.articles}/>
                </div>
    }

    handleTopicChange = (event) => {
        this.setState({searchTopic: event.target.value});
    }

    handleSortChange = (event) => {
        this.setState({searchSort: event.target.value});
    }

    handleAuthorChange = (event) => {
        this.setState({searchAuthor: event.target.value});
    }
    
    handleSearchSubmit = (event) => {
        event.preventDefault();
        const {searchTopic, searchSort, searchAuthor} = this.state;

        let topicCriteria = (searchTopic === "any")? "" : `topic=${searchTopic}`;
        let sortCriteria = (searchSort === "any")? "" : `sort_by=${searchSort}`;
        let authorCriteria = (searchAuthor === "")? "" : `author=${searchAuthor}`;

        const searchCriteria = [topicCriteria, sortCriteria, authorCriteria];

        let firstSearchTerm = true;

        let searchTerm = "";
        
        searchCriteria.forEach(searchCriteria => {
            if(searchCriteria)
            {
                if(firstSearchTerm)
                {
                    firstSearchTerm = false;
                    searchTerm += `?${searchCriteria}`;
                }
                else searchTerm += `&${searchCriteria}`;
            }
        })

        axios.get(`${baseUrl}/articles${searchTerm}`)
        .then(response => {
            const {articles} = response.data;
            this.setState({articles});
        })
    }
}

export default ArticlesDisplay;