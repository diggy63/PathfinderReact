import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./Instructions.css"

export default function Instructions({ show, closeMod }) {
  function handleClose() {
    closeMod();
  }
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Diggys Pathfinding App
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Welcome</h3>
        <p>
          This is my very simple pathfinding app to both learn and demonstrate
          pathfinding alogrithms. Its fairly simple all you need to do is set a
          starting node and an end node and pick a search algorithm.
          <h4>Nodes</h4>
          <ul>
            <li>Empty Node<div className="nodeI"></div></li>
            <li>Wall<div className="nodeI wall"></div></li>
            <li>Start Point<div className="nodeI startP"></div></li>
            <li>End Point<div className="nodeI endP"></div></li>
            <li>Visited Node<div className="nodeI visitedP"></div></li>
            <li>Path<div className="nodeI pathP"></div></li>

          </ul>
          <h4>Search Algorithms</h4>
          <h5>A Star</h5>
          <p>A star is a weighted alogorithm meaning it has some knowledge of the the end point and will search towards the end point. It will always find the shortest path.</p>
          <h5>Diakstras</h5>
          <p>Diakstras is a none weighted pathfinding algorithm and serachs nodes by shortest path towards to the start. Always guarantees the shorest path.</p>
          <h5>Depth First Search</h5>
          <p>Most commom way to search nodes. Will just search blindly unitl it finds the end. Not good for pathfinding But good for checking all possible nodes.</p>
          <h4>Maze Algorithms</h4>
          <h5>Recursive division</h5>
          <p>Creates a maze by dividing the area in half and adding and "exit" until you cant divide anymore. always creates a path to every node.</p>
          <h5>Random</h5>
          <p>Radnomly chooses where walls are going to be doesnt not insure a path to every node.</p>
        </p>
        <h3>Enjoy</h3>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
