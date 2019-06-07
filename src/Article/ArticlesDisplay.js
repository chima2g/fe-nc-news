import React, { Component } from 'react';
import axios from 'axios';
import baseUrl from '../utils';
import ArticlesList from './ArticlesList';

class ArticlesDisplay extends Component {

    state = { articles : [] };

    componentDidMount() {
        axios.get(`${baseUrl}/articles`)
        .then(response => {
            const {articles} = response.data;
            this.setState({articles});
        })
    }

    render() {
        return <div>
                    <ArticlesList articles={this.state.articles}/>
                </div>
    }
}

export default ArticlesDisplay;