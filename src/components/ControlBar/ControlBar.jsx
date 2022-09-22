import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

export default function ControlBar({ algo, runAlgorithm }) {
  let startButton;
  function handleClick(e) {
    console.log(e.target.value);
    runAlgorithm(e.target.value);
  }
  if (algo) {
    startButton = `Start ${algo}`;
  } else {
    startButton = "Pick Pathfinding Algorithm";
  }
  function handleStart(){
    console.log("start tile")
  }
  return (
    <>
      <ListGroup as="ul">
        <ListGroup.Item as="li" active>
          Pick Tile To Set
        </ListGroup.Item>
        <ListGroup.Item as="li" onClick={handleStart}>Start</ListGroup.Item>
        <ListGroup.Item as="li" active="true">
          End
        </ListGroup.Item>
        <ListGroup.Item as="li">Wall</ListGroup.Item>
      </ListGroup>
      <Button variant="primary" value={algo} onClick={handleClick}>
        {startButton}
      </Button>
    </>
  );
}
