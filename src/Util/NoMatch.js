import React from "react";
import { errorMessage } from "./utils";
import Container from "react-bootstrap/Container";

const NoMatch = () => {
  return (
    <Container className="mt-3">
      <p>This page doesn't exist or some other horrible error has occured.</p>
      {errorMessage}
    </Container>
  );
};

export default NoMatch;
