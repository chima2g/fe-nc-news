import React from "react";
import Button from "react-bootstrap/Button";

const Voter = props => {
  return (
    <>
      <Button disabled={props.voteChange === 1} onClick={props.vote(1)}>
        Up Vote
      </Button>
      <Button disabled={props.voteChange === -1} onClick={props.vote(-1)}>
        Down Vote
      </Button>
    </>
  );
};

export default Voter;
