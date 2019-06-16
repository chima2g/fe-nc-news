import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "@reach/router";
import { getUser } from "../Util/utils";

class UserProfile extends React.Component {
  render() {
    const justLoggedIn =
      window.history.state && window.history.state.justLoggedIn;
    let { loggedInUsername, loggedInUser } = this.props;

    return (
      <Container className="mt-3">
        {justLoggedIn && loggedInUsername && <p>Good to have you back!</p>}
        <p>
          {!loggedInUsername ? "Please log in!" : this.getProfile(loggedInUser)}
        </p>
      </Container>
    );
  }

  getProfile = loggedInUser => {
    return (
      <div className="container mt-4">
        <h2 className="text-center mb-3">
          <img
            src={loggedInUser.avatar_url.replace("https://www.", "http://")}
            alt="user avatar"
            height="100px"
            width="100px"
            className="rounded-circle mr-3"
          />
          My Profile
        </h2>
        <Card style={{ width: "18rem" }} className="mb-4">
          <Card.Body>
            <Card.Title>Details</Card.Title>
            <Card.Text>Name: {loggedInUser.name}</Card.Text>
            <Card.Text>Username: {loggedInUser.username}</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }} className="mb-4">
          <Card.Body>
            <Card.Title>Articles</Card.Title>
            <Card.Text>
              Feeling a bit nostalgic? Why not take a look back at some of the
              fantastic contributions you've made?
            </Card.Text>
            <Link to={"articles"}>
              <Button variant="primary">Go</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  };
}

export default UserProfile;
