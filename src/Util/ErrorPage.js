import React from "react";
import { errorMessage } from "./utils";
import Container from "react-bootstrap/Container";

const ErrorPage = props => {
  let { msg } = props.location.state;

  return (
    <Container className="mt-3">
      <p>{msg}</p>
      {errorMessage}
    </Container>
  );
};

export default ErrorPage;
