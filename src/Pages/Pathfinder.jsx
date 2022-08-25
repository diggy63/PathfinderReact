import React, { useEffect, useState } from "react";

import "./Pathfinder.css";

import Node from "../components/Node/Node";
import NodeList from "../components/NodeList/NodeList";

export default function Pathfinder() {
  class PathNode {
    constructor(row, col, clicked) {
      this.row = row;
      this.col = col;
      this.clicked = false;
    }
  }

  const [nodes, setNodes] = useState([]);
  const [re, setRe] = useState(true);
  const ROWS = 20;
  const COLS = 50;

  useEffect(() => {
    
    if (nodes.length === 0) {
    console.log("intial mount")
      const nodestart = [];
      for (let row = 0; row < ROWS; row++) {
        const currentRow = [];
        for (let col = 0; col < COLS; col++) {
          currentRow.push(new PathNode(row, col));
        }
        nodestart.push(currentRow);
      }
      setgrid(nodestart);
    }else{
        console.log("in remount")
    }
  },[nodes]);

   async function setgrid(node) {
    await setNodes(node);
  }

  async function checkNode(row, col) {
     await setNodes([...nodes,nodes[row][col].clicked = !nodes[row][col].clicked ])
  }


  return (
    <div className="container">
      <div className="grid">
        <NodeList nodes={nodes} checkNode={checkNode}/>
      </div>
    </div>
  );
}
