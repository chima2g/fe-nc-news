import React from "react";
import Button from "react-bootstrap/Button";

const Voter = props => {
  return (
    <>
      <div className="btn-group mr-2" role="group" aria-label="Voting group">
        <Button disabled={props.voteChange === 1} onClick={props.vote(1)}>
          <i className="far fa-thumbs-up" />
        </Button>
        <Button disabled={props.voteChange === -1} onClick={props.vote(-1)}>
          <i className="far fa-thumbs-down" />
        </Button>
      </div>
    </>
  );
};

export default Voter;
