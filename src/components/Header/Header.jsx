import React, { useState } from "react";

import { Button, Nav, Navbar, Container, NavDropdown } from "react-bootstrap";

export default function Header({
  runAstar,
  runDijkstras,
  seeStart,
  seeEnd,
  resetGrid,
  clearGrid,
  randomGrid,
  runAlgorithm
}) {
  const [startOn, setStartOn] = useState('Set Start')
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

  function handleAlgo(e){
    runAlgorithm(e.target.innerHTML)
  }
  function handleDij() {
    runDijkstras();
  }
  function handleReset() {
    resetGrid();
  }
  function handleClear() {
    clearGrid();
  }
  function handleRandom() {
    randomGrid();
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Pathfinider</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={handleStart}>{startOn}</Nav.Link>
            <Nav.Link onClick={handleEnd}>Set End</Nav.Link>
            <NavDropdown title="Search Algorithm" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={handleAlgo}>A*</NavDropdown.Item>
              <NavDropdown.Item onClick={handleAlgo}>
                Dijsktras
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleAlgo}>
                Depth First Search
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Build A Maze" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={handleRandom}>Random</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={handleReset}>Reset Path</Nav.Link>
            <Nav.Link onClick={handleClear}>Clear Board</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
