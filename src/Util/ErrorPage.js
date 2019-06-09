import React from "react";
import { errorMessage } from "./utils";

const ErrorPage = props => {
  let { msg } = props.location.state;

  return (
    <div>
      <p>{msg}</p>
      {errorMessage}
    </div>
  );
};

export default ErrorPage;
