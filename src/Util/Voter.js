import React from "react";
import Button from "react-bootstrap/Button";

const Voter = props => {
  return (
    <>
      <div class="btn-group mr-2" role="group" aria-label="Voting group">
        <Button disabled={props.voteChange === 1} onClick={props.vote(1)}>
          Up Vote
        </Button>
        <Button disabled={props.voteChange === -1} onClick={props.vote(-1)}>
          Down Vote
        </Button>
      </div>
    </>
  );
};

export default Voter;
