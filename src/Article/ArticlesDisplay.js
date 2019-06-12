import React, { Component } from "react";
import { navigate } from "@reach/router";
import { getArticles, getTopics } from "../Util/utils";
import ArticlesList from "./ArticlesList";
import logo from "./search-icon.png";
import {
  Button,
  NavDropdown,
  Dropdown,
  DropdownButton,
  FormControl,
  Card,
  InputGroup,
  Spinner
} from "react-bootstrap";

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
        {this.getSearchBar()}
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

  getSearchBar2 = () => {
    return (
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button variant="outline-secondary">
            <img src={logo} alt="Logo" height="20px" length="20px" />
          </Button>
        </InputGroup.Prepend>

        <FormControl aria-describedby="basic-addon1" placeholder="author..." />
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title="Topic"
          id="input-group-dropdown-1"
        >
          <Dropdown.Item href="#">Action</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title="Sort By"
          id="input-group-dropdown-1"
        >
          <Dropdown.Item href="#">Action</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    );
  };
  getSearchBar = () => {
    return (
      <>
        {/* <span class="glyphicon glyphicon-search" /> */}
        <Card>
          <Card.Body>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Author"
                onChange={event => {
                  this.setState({ searchAuthor: event.target.value });
                }}
              />
              <NavDropdown
                title="Topic"
                onSelect={eventKey => {
                  this.setState({ searchTopic: eventKey });
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
                  this.setState({ searchSort: eventKey });
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
                <NavDropdown.Item key="comment_count" eventKey="comment_count">
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
          </Card.Body>
        </Card>
      </>
    );
  };

  getMain = () => {
    if (this.state.loading)
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
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
