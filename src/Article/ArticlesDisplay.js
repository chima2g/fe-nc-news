import React, { Component } from "react";
import { navigate } from "@reach/router";
import { getArticles, getTopics } from "../Util/utils";
import ArticlesList from "./ArticlesList";
import loading from "../Util/loading.gif";

class ArticlesDisplay extends Component {
  state = {
    articles: [],
    topics: [],
    searchTopic: "any",
    searchSort: "any",
    searchAuthor: "",
    loading: true
  };

  componentDidMount() {
    getArticles().then(articles => this.setState({ articles }));
    getTopics().then(topics => this.setState({ topics, loading: false }));
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Topic
            <select
              name="topic"
              onChange={event => {
                this.setState({ searchTopic: event.target.value });
              }}
            >
              <option value="any" key="any" />
              {this.state.topics.map(topic => (
                <option value={topic.slug} key={topic.slug}>
                  {topic.slug}
                </option>
              ))}
            </select>
          </label>
          <label>
            Author
            <input
              type="text"
              name="author"
              onChange={event => {
                this.setState({ searchAuthor: event.target.value });
              }}
            />
          </label>
          <label>
            Sort by
            <select
              name="sort_by"
              onChange={event => {
                this.setState({ searchSort: event.target.value });
              }}
            >
              <option value="any" key="any" />
              <option value="title" key="title">
                title
              </option>
              <option value="topic" key="topic">
                topic
              </option>
              <option value="author" key="author">
                author
              </option>
              <option value="votes" key="votes">
                votes
              </option>
              <option value="comment_count" key="comment_count">
                comment count
              </option>
              <option value="created_at" key="created_at">
                date
              </option>
            </select>
          </label>
          <button type="button" onClick={this.handleSearchSubmit}>
            search
          </button>
        </form>
        {this.getMain()}
      </div>
    );
  }

  getMain = () => {
    if (this.state.loading)
      return (
        <div>
          <img src={loading} alt="Loading animation" height="25%" width="25%" />
        </div>
      );
    else return <ArticlesList articles={this.state.articles} />;
  };

  /* Changes the value in the given object's single key value pair to the target event's
   * value, e.g. changes { searchTopic : "any" } to { searchTopic : "coding" }.
   * It then uses this object to set state
   */
  handleChange = searchTerm => {
    return event => {
      searchTerm[Object.keys(searchTerm)[0]] = event.target.value;
      this.setState(searchTerm);
    };
  };

  handleSearchSubmit = event => {
    event.preventDefault();
    const { searchTopic, searchSort, searchAuthor } = this.state;

    let topicCriteria = searchTopic === "any" ? "" : `topic=${searchTopic}`;
    let sortCriteria = searchSort === "any" ? "" : `sort_by=${searchSort}`;
    let authorCriteria = searchAuthor === "" ? "" : `author=${searchAuthor}`;

    const searchCriteria = [topicCriteria, sortCriteria, authorCriteria];

    let firstSearchTerm = true;

    let searchTerm = "";

    searchCriteria.forEach(searchCriteria => {
      if (searchCriteria) {
        if (firstSearchTerm) {
          firstSearchTerm = false;
          searchTerm += `?${searchCriteria}`;
        } else searchTerm += `&${searchCriteria}`;
      }
    });

    this.setState({ loading: true });
    getArticles(searchTerm)
      .then(articles => this.setState({ articles, loading: false }))
      .catch(error => {
        this.setState({ loading: false });
        navigate("../error", {
          state: { msg: error.response.data.msg }
        });
      });
  };
}

export default ArticlesDisplay;
