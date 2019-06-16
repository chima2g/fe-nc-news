import React from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

const NavigationBar = props => {
  const { loggedInUsername } = props;
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>NC News</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href={`/users/${loggedInUsername}`}>Profile</Nav.Link>
        </Nav>
        {!loggedInUsername && (
          <Form inline>
            <FormControl
              type="text"
              placeholder="jessjelly"
              className="mr-sm-2"
              onChange={props.handleLoginNameChange}
            />
            <Button
              type="submit"
              variant="outline-success"
              onClick={props.handleLoginSubmit}
              disabled={props.disableLoginButton}
            >
              Login
            </Button>
          </Form>
        )}
        {loggedInUsername && (
          <div>
            <label class="mr-3">
              Welcome {loggedInUsername}
              <i className="fas fa-user-circle ml-1" />
            </label>
            <Button variant="outline-success" onClick={props.handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
