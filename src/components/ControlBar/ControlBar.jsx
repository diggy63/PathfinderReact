import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

export default function ControlBar({ algo, runAlgorithm, seeStart, seeEnd, setWall }) {
    const [startTile, setStartTile] = useState(false)
    const [endTile, setEndTile] = useState(false)
    const [wallTile, setWallTile] = useState(false)
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
    seeStart(!startTile)
    setStartTile(true)
    setEndTile(false)
    setWallTile(false)
  }
  function handleEnd(){
    seeEnd(!endTile)
    setStartTile(false)
    setEndTile(true)
    setWallTile(false)
  }
  function handleWall(){
    setWall()
    setStartTile(false)
    setEndTile(false)
    setWallTile(true)
  }
  return (
    <>
    <ListGroup as="ul">
    <ListGroup.Item as="li">Tile</ListGroup.Item>
    <ListGroup.Item as="li">
    <ListGroup horizontal>
      <ListGroup.Item onClick={handleStart} active={startTile} >Start Tile</ListGroup.Item>
      <ListGroup.Item onClick={handleEnd} active={endTile}>End Tile</ListGroup.Item>
      <ListGroup.Item onClick={handleWall} active={wallTile}>Wall Tile</ListGroup.Item>
    </ListGroup>
    </ListGroup.Item>
    </ListGroup>
      <Button variant="primary" value={algo} onClick={handleClick}>
        {startButton}
      </Button>
    </>
  );
}
