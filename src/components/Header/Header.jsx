import React, { useState } from "react";

import { Button, Nav, Navbar, Container, NavDropdown } from "react-bootstrap";

import './Header.css'

export default function Header({
  runAstar,
  runDijkstras,
  seeStart,
  seeEnd,
  resetGrid,
  clearGrid,
  mazeGrid,
  pickAlgorithm,
  runAlgorithm
}) {
  const [startColor, setStartColor] = useState('secondary')
  const [endColor, setEndColor] = useState('secondary')
  const [wallColor, setWallColor] = useState('success')
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  function handleStart() {
    setStartColor('success')
    setEndColor('secondary')
    setWallColor('secondary')
    setIsEnd(false);
    seeStart(true);
    setIsStart(true);
  }

  function handleEnd() {
    setEndColor('success')
    setStartColor('secondary')
    setWallColor('secondary')
    setIsStart(false);
    seeEnd(true);
    setIsEnd(true);
  }
  function handleWall(){
    setEndColor('secondary')
    setStartColor('secondary')
    setWallColor('success')
    setIsEnd(false);
    setIsStart(false);
    seeStart(false);
    seeEnd(false);

  }
  function handleAlgoStart(){
    runAlgorithm()
  }

  function handleAlgo(e){
    pickAlgorithm(e.target.innerHTML)
  }
  function handleReset() {
    resetGrid();
  }
  function handleClear() {
    clearGrid();
  }
  function handleMaze(e) {
    mazeGrid(e.target.innerHTML);
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Pathfinider</Navbar.Brand>
          <Nav className="me-auto">
            <div className="buttonHeader">
            <Button onClick={handleStart} variant={startColor}>Set Start Point</Button>{'     '}
            </div>
            <div className="buttonHeader">
            <Button onClick={handleEnd} variant={endColor}>Set End Point</Button>
            </div>
            <div className="buttonHeader">
            <Button onClick={handleWall} variant={wallColor}>Create Wall</Button>
            </div>
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
              <NavDropdown.Item onClick={handleMaze}>Random</NavDropdown.Item>
              <NavDropdown.Item onClick={handleMaze}>Recursive Division</NavDropdown.Item>
            </NavDropdown>
            <div className="buttonHeader">
            <Button onClick={handleAlgoStart} variant='success'>Start</Button>
            </div>
            <Nav.Link onClick={handleReset}>Reset Path</Nav.Link>
            <Nav.Link onClick={handleClear}>Clear Board</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
