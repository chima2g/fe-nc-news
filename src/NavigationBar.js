import React from "react";
import { Button, FormControl, Nav, Navbar, Form } from "react-bootstrap";

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
            >
              Login
            </Button>
          </Form>
        )}
        {loggedInUsername && (
          <label>
            Welcome {loggedInUsername}
            <Button variant="outline-success" onClick={props.handleLogout}>
              Logout
            </Button>
          </label>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
