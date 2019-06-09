import React from "react";
import { errorMessage } from "./utils";

const NoMatch = () => {
  return (
    <div>
      <p>This page doesn't exist or some other horrible error has occured.</p>
      {errorMessage}
    </div>
  );
};

export default NoMatch;
