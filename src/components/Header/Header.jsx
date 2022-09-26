import React, { useState } from "react";

import {
  Button,
  Nav,
  Navbar,
  Container,
  NavDropdown,
} from "react-bootstrap";

import "./Header.css";

export default function Header({
  runAstar,
  runDijkstras,
  seeStart,
  seeEnd,
  resetGrid,
  clearGrid,
  mazeGrid,
  pickAlgorithm,
  runAlgorithm,
  algo,
  handleAlert,
}) {
  const [show, setShow] = useState(false);
  const [startColor, setStartColor] = useState("secondary");
  const [endColor, setEndColor] = useState("secondary");
  const [wallColor, setWallColor] = useState("success");
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [didRun, setDidRun] = useState(false);
  const [didMaze, setDidMaze] = useState(false);


  let startText;
  if (algo === "") {
    startText = "Pick a Pathingfinding Algorithm";
  } else {
    startText = `Vizualize ${algo}`;
  }
  function handleStart() {
    setStartColor("success");
    setEndColor("secondary");
    setWallColor("secondary");
    setIsEnd(false);
    seeStart(!isStart);
    setIsStart(!isStart);
  }

  function handleEnd() {
    setEndColor("success");
    setStartColor("secondary");
    setWallColor("secondary");
    setIsStart(false);
    seeEnd(!isEnd);
    setIsEnd(!isEnd);
  }
  function handleWall() {
    setEndColor("secondary");
    setStartColor("secondary");
    setWallColor("success");
    setIsEnd(false);
    setIsStart(false);
    seeStart(false);
    seeEnd(false);
  }
  function handleAlgoStart() {
    if (algo === "") {
      handleAlert("No Algorithm Picked");
    } else {
      setDidRun(true)
      runAlgorithm();
    }
  }

  function handleAlgo(e) {
    pickAlgorithm(e.target.innerHTML);
  }
  function handleReset() {
    setDidRun(false)
    resetGrid();
  }
  function handleClear() {
    setDidRun(false)
    setDidMaze(false)
    clearGrid();
  }
  async function handleMaze(e) {
    setDidMaze(true)
      mazeGrid(e.target.innerHTML);

  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Pathfinider</Navbar.Brand>
          <Nav className="me-auto">
            <div className="buttonHeader">
              <Button onClick={handleStart} variant={startColor}>
                Set Start Point
              </Button>
              {"     "}
            </div>
            <div className="buttonHeader">
              <Button onClick={handleEnd} variant={endColor}>
                Set End Point
              </Button>
            </div>
            <div className="buttonHeader">
              <Button onClick={handleWall} variant={wallColor}>
                Create Wall
              </Button>
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
                        {didMaze ?( 
                            <Nav.Link onClick={handleClear}>  Clear the Maze  </Nav.Link>
                        ):(
                          <NavDropdown title="Build A Maze" id="navbarScrollingDropdown">
                          <NavDropdown.Item onClick={handleMaze}>Random</NavDropdown.Item>
                          <NavDropdown.Item onClick={handleMaze}>
                            Recursive Division
                          </NavDropdown.Item>
                        </NavDropdown>
                         )}
            <div className="startBut">
              {didRun ? (
                <Button
                  classname="buttonFull"
                  onClick={handleReset}
                  variant="success"
                >
                  Reset Path
                </Button>
              ) : (
                <Button
                  classname="buttonFull"
                  onClick={handleAlgoStart}
                  variant="success"
                >
                  Run Vizualizer
                </Button>
              )}
            </div>
            <Nav.Link onClick={handleClear}>Clear Board</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
