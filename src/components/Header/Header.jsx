import React, { useState } from "react";

import { Button, Nav } from "react-bootstrap";

export default function Header({ runAstar, runDijkstras, seeStart, seeEnd , resetGrid}) {
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  function handleStart() {
    setIsEnd(false);
    seeStart(!isStart);
    setIsStart(!isStart);
  }

  function handleEnd() {
    setIsStart(false);
    seeEnd(!isEnd);
    setIsEnd(!isEnd);
  }

  function handleAlgo(e) {
    runAstar();
  }
  function handleDij() {
    runDijkstras();
  }
  function handleReset(){
    resetGrid()
  }
  return (
    <Nav
      className="justify-content-center"
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Button onClick={handleAlgo}>Run Astar</Button>
      </Nav.Item>
      <Nav.Item>
        <Button onClick={handleDij}>Run Dijsktras</Button>
      </Nav.Item>
      <Nav.Item>
        <Button onClick={handleStart}>Set Start</Button>
      </Nav.Item>
      <Nav.Item>
        <Button onClick={handleEnd}>Set End</Button>
      </Nav.Item>
      <Nav.Item>
        <Button onClick={handleReset}>Reset</Button>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
