import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import "./ControlBar.css"

export default function ControlBar({ algo, runAlgorithm, seeStart, seeEnd, setWall, clearGrid, resetGrid }) {
    const [startTile, setStartTile] = useState(false)
    const [endTile, setEndTile] = useState(false)
    const [wallTile, setWallTile] = useState(true)
  let startButton;
  function handleClick(e) {
    console.log(algo);
    runAlgorithm(algo);
  }
  if (algo) {
    startButton = `Start ${algo}`;
  } else {
    startButton = "Pick Pathfinding Algorithm";
  }
  function handleClear(){
    clearGrid()
  }
  function handleReset(){
    resetGrid()
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
    <div className="controlBar">
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
    <ListGroup as="ul">
    <ListGroup.Item as="li">Control Bar</ListGroup.Item>
    <ListGroup.Item as="li">
    <ListGroup horizontal>
      <ListGroup.Item onClick={handleClick} variant='success' >Start</ListGroup.Item>
      <ListGroup.Item onClick={handleReset} variant='warning'>Reset Path</ListGroup.Item>
      <ListGroup.Item onClick={handleClear} variant='danger'>Clear Board</ListGroup.Item>
    </ListGroup>
    </ListGroup.Item>
    </ListGroup>
      {/* <Button variant="primary" value={algo} onClick={handleClick}>
        {startButton}
      </Button> */}
    </div>
  );
}
