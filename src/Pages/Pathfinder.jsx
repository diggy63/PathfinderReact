import React, { useEffect, useState, Component } from "react";

import "./Pathfinder.css";

import Node from "../components/Node/Node";
import NodeList from "../components/NodeList/NodeList";

export default function Pathfinder() {

  const [nodes, setNodes] = useState([]);
  const [loaded, setloaded] = useState(false)
  const [nodeCoords, setNoteChoords] = useState([90,90]);
  const ROWS = 20;
  const COLS = 50;

  useEffect(() => {
      if(nodes.length === 0){
        console.log('mount')
      const grid = gridInit()
      setgrid(grid)
      // setloaded(true)
      }else{
        console.log('use effect')
        setNewGrid(nodeCoords[0],nodeCoords[1])
      }
  },[nodeCoords]);

   async function setgrid(node) {
    console.log("setGrid")
    await setNodes(node);
    setloaded(true)
  }
  async function setNewGrid(row,col) {
    console.log("setNewGrid")
    await setNodes(...nodes,nodes[row][col].isVisited = !nodes[row][col].isVisited)
  }

  async function checkNode(row, col) {
    setloaded(false)
    await setNoteChoords([row,col])
    console.log("check Node")
    setloaded(true)
    
  }
  const nodesList = nodes.map((item, i) => {
    console.log(i)
    if (i > 19) {
      console.log(nodes);
      return;
    }
    return item.map((itemNext, idx) => {
      return <Node key={i + idx} node={itemNext} checkNodeLift={checkNode} />;
    });
  });
  
  return (
    <div className="container">
      <div className="grid">
        {loaded ? <>{nodesList}</> :null}
      </div>
    </div>
  );

  function gridInit(){
    const nodestart = [];
      for (let row = 0; row < ROWS; row++) {
        const currentRow = [];
        for (let col = 0; col < COLS; col++) {
          currentRow.push((createNode(col,row)));
        }
        nodestart.push(currentRow);
      }
      return nodestart
}

function createNode(col, row){
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
};


}


