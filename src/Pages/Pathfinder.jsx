import React, { useEffect, useState, Component } from "react";

import "./Pathfinder.css";

import Node from "../components/Node/Node";
import NodeList from "../components/NodeList/NodeList";
import Options from "../components/Options/Options";

export default function Pathfinder() {
  const [nodes, setNodes] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [isStart, setIsStart] = useState(false)
  const [nodeColor, setNodeColor] = useState('Blue')
  const [nodeCoords, setNoteChoords] = useState([90, 90]);
  const ROWS = 20;
  const COLS = 50;

  useEffect(() => {
    if (nodes.length === 0) {
      console.log("mount");
      const grid = gridInit();
      setgrid(grid);
    } else {
      // the to part is a init for the useeffect and the cords are sent to a function to set the new state
      setNewGrid(nodeCoords[0], nodeCoords[1]);
    }
  }, [nodeCoords]);

  async function setgrid(node) {
    await setNodes(node);
    setloaded(true);
  }
  async function setNewGrid(row, col) {
    let newNodes = [...nodes]
    newNodes[row][col].isVisited = !newNodes[row][col].isVisited
    // in here we change the new state to have everything the same except that the node we clicked on is now visitied
    setNodes(newNodes)
  }
  // this function gets the row and col of the node component lifted to the main componentand then sends its to the useffect
  async function checkNode(row, col) {
    setloaded(false)
    await setNoteChoords([row, col]);
    setloaded(true)
  }

  function seeStart(bool){
    setIsStart(bool)
  }


  return (
    <div className="container">
      <Options seeStart={seeStart}/>
      <div className="grid">
        {nodes.map((row,ri) =>{
          return(
              <>
                {row.map((node,ni) => {
                  return(
                  <Node key={ni} node={node} checkNodeLift={checkNode} isStart={isStart}/>
                  )
                })}
                </>
          )
        })}
        
        
        </div>
    </div>
  );

  function gridInit() {
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
      isStart:false,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  }
}
