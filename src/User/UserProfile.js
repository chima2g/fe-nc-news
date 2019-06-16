import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "@reach/router";

class UserProfile extends React.Component {
  render() {
    const justLoggedIn =
      window.history.state && window.history.state.justLoggedIn;
    let { loggedInUsername } = this.props;

    return (
      <div>
        {justLoggedIn && loggedInUsername && <p>Good to have you back!</p>}
        <p>{!loggedInUsername ? "Please log in!" : this.getProfile()}</p>
      </div>
    );
  }

  getProfile = () => {
    return (
      <div className="container mt-4">
        <h2 className="text-center mb-3">
          <i className="fas fa-user-circle mr-2" />
          Your Profile
        </h2>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>My Articles</Card.Title>
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
