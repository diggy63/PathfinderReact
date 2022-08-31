import React, { useEffect, useState, Component } from "react";

import "./Pathfinder.css";

import Astar from "../Algorithms/Astar";

import Node from "../components/Node/Node";
import Options from "../components/Options/Options";

export default function Pathfinder() {
  const [counter,setCounter] = useState(0)
  const [nodes, setNodes] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [startPoint, setStartPoint] = useState(false);
  const [endPoint, setEndPoint] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const ROWS = 20;
  const COLS = 50;

  useEffect(() => {
      console.log("mount");
      const grid = gridInit();
      setgrid(grid);
  }, []);

  function setgrid(node) {
    setNodes(node);
  }

  async function checkNode(row, col) {
    let newNodes = [...nodes];
    if (isStart) {
      if (startPoint) {
        newNodes[startPoint[0]][startPoint[1]].isStart = false;
      }
      newNodes[row][col].isStart = true;
      setStartPoint([row, col]);
    } else if (isEnd) {
      if (endPoint) {
        newNodes[endPoint[0]][endPoint[1]].isEnd = false;
      }
      newNodes[row][col].isEnd = true;
      setEndPoint([row, col]);
    } else {
      newNodes[row][col].isWall = !newNodes[row][col].isWall;
      setNodes(newNodes)
    }
  }


  async function runAlgo() {
    const ans = await Astar(startPoint, endPoint, nodes);
    for(let i = 0; i < ans.length; i++){
          runAnimation(ans,i);
    }
  }

  async function runAnimation(visitedNodes,counter) {
        let newNodes = [...nodes];
        newNodes[visitedNodes[counter].row][visitedNodes[counter].col].isVisited = true;
        setNodes(newNodes)
  }

  function seeStart(bool) {
    setIsEnd(false);
    setIsStart(bool);
  }

  function seeEnd(bool) {
    setIsStart(false);
    setIsEnd(bool);
  }

  return (
    <div className="container">
      <Options seeStart={seeStart} seeEnd={seeEnd} runAlgo={runAlgo} />
      <div className="grid">
        {nodes.map((row, ri) => {
          return (
            <>
              {row.map((node, ni) => {
                return <Node key={ni} node={node} checkNodeLift={checkNode} />;
              })}
            </>
          );
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
      isStart: false,
      distance: Infinity,
      isVisited: false,
      isEnd: false,
      isWall: false,
      previousNode: null,
    };
  }
}
