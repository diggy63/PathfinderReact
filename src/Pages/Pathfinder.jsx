import React, { useEffect, useState, Component } from "react";

import "./Pathfinder.css";

import Node from "../components/Node/Node";
import NodeList from "../components/NodeList/NodeList";

export default function Pathfinder() {
  const [nodes, setNodes] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [nodeCoords, setNoteChoords] = useState([90, 90]);
  const ROWS = 20;
  const COLS = 50;

  useEffect(() => {
    if (nodes.length === 0) {
      console.log("mount");
      const grid = gridInit();
      setgrid(grid);
      // setloaded(true)
    } else {
      // the to part is a init for the useeffect and the cords are sent to a function to set the new state
      console.log("use effect");
      setNewGrid(nodeCoords[0], nodeCoords[1]);
    }
  }, [nodeCoords]);

  async function setgrid(node) {
    console.log("setGrid");
    await setNodes(node);
    setloaded(true);
  }
  async function setNewGrid(row, col) {
    console.log("setNewGrid");
    // in here we change the new state to have everything the same except that the node we clicked on is now visitied
    await setNodes(
      ...nodes,
      (nodes[row][col].isVisited = !nodes[row][col].isVisited)
    );
  }
  // this function gets the row and col of the node component lifted to the main componentand then sends its to the useffect
  async function checkNode(row, col) {
    setloaded(false)
    await setNoteChoords([row, col]);
    console.log(nodes);
    console.log("check Node");
    setloaded(true)
  }


  console.log("in the function");
  return (
    <div className="container">
      <div className="grid">
        {/* I am using my nodes state to make an array of an array of the node I made to represent them on a webpage with corrispoding row and col vars. when i click one i want to make its visited
         value equal true I do that in my checknode function*/}
        {nodes.map((row,ri) =>{
          console.log(nodes)
          return(
              <>
                {row.map((node,ni) => {
                  return(
                  <Node key={ni} node={node} checkNodeLift={checkNode}/>
                  )
                })}
                </>
          )
        })}
        
        
        </div>
    </div>
  );

  function gridInit() {
    console.log("init");
    const nodestart = [];
    for (let row = 0; row < ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < COLS; col++) {
        currentRow.push(createNode(col, row));
      }
      nodestart.push(currentRow);
    }
    return nodestart;
  }

  function createNode(col, row) {
    return {
      col,
      row,
      // isStart: row === START_NODE_ROW && col === START_NODE_COL,
      // isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  }
}
