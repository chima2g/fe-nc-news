import React, { Component } from "react";
import { navigate } from "@reach/router";
import { getArticles, getTopics } from "../Util/utils";
import ArticlesList from "./ArticlesList";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";

class ArticlesDisplay extends Component {
  state = {
    articles: [],
    topics: [],
    search_topic: "any",
    search_sort: "any",
    search_author: "",
    loading: true
  };

  componentDidMount() {
    const { search_author } = this.props;

    if (search_author)
      getArticles(`?author=${search_author}`).then(articles =>
        this.setState({ articles, search_author })
      );
    else getArticles().then(articles => this.setState({ articles }));

    getTopics().then(topics => this.setState({ topics, loading: false }));
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Form>
              <InputGroup>
                {this.props.search_author ? null : (
                  <FormControl
                    type="text"
                    placeholder="Author"
                    onChange={event => {
                      this.setState({ search_author: event.target.value });
                    }}
                  />
                )}
                <NavDropdown
                  title="Topic"
                  onSelect={eventKey => {
                    this.setState({ search_topic: eventKey });
                  }}
                >
                  <NavDropdown.Item key="any" eventKey="any">
                    any
                  </NavDropdown.Item>
                  {this.state.topics.map(topic => (
                    <NavDropdown.Item key={topic.slug} eventKey={topic.slug}>
                      {topic.slug}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <NavDropdown
                  title="Sort by"
                  onSelect={eventKey => {
                    this.setState({ search_sort: eventKey });
                  }}
                >
                  <NavDropdown.Item key="title" eventKey="title">
                    title
                  </NavDropdown.Item>
                  <NavDropdown.Item key="author" eventKey="author">
                    author
                  </NavDropdown.Item>
                  <NavDropdown.Item key="votes" eventKey="votes">
                    votes
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    key="comment_count"
                    eventKey="comment_count"
                  >
                    comment count
                  </NavDropdown.Item>
                  <NavDropdown.Item key="created_at" eventKey="created_at">
                    date
                  </NavDropdown.Item>
                </NavDropdown>
                <Button type="submit" onClick={this.handleSearchSubmit}>
                  Search
                </Button>
              </InputGroup>
            </Form>
          </Card.Body>
        </Card>
        {this.state.loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <ArticlesList articles={this.state.articles} />
        )}
      </div>
    );
  }

  handleSearchSubmit = event => {
    event.preventDefault();
    const { search_topic, search_sort, search_author } = this.state;

    let topicCriteria = search_topic === "any" ? "" : `topic=${search_topic}`;
    let sortCriteria = search_sort === "any" ? "" : `sort_by=${search_sort}`;
    let authorCriteria = search_author === "" ? "" : `author=${search_author}`;

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
