import React, { useEffect, useState, Component } from "react";

import "./Pathfinder.css";

import Astar from "../Algorithms/Astar";

import Node from "../components/Node/Node";
import Options from "../components/Options/Options";

export default function Pathfinder() {
  const [counter, setCounter] = useState(0);
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
      setNodes(newNodes);
    }
  }

  async function runAlgo() {
    const ans = await Astar(startPoint, endPoint, nodes);
    runAnimation(ans);
  }

  async function runAnimation(visitedNodes) {
    console.log(visitedNodes)
    let lastNode = visitedNodes.pop();
    const finish = [lastNode.row,lastNode.col]
    lastNode = lastNode.camefrom[0];
    const counter = lastNode.gScore
    await visitedNodes.forEach((item,i) => {
        setTimeout(()=>{
        document.getElementById(
          `node-${item.row}-${item.col}`
        ).className = `node Blue`;

        },40*i)
    })
    setTimeout(() => {
      for (let i = 0; i < counter; i++) {
        setTimeout(()=>{
          document.getElementById(
            `node-${lastNode.row}-${lastNode.col}`
          ).className = `node Purple`;
          lastNode = lastNode.camefrom[0];
        },50*i)

      }
      document.getElementById(
        `node-${finish[0]}-${finish[1]}`
      ).className = `node Orange`;
      
    }, 40*visitedNodes.length);
    // for (let i = 0; i < counter; i++) {
    //     setTimeout(()=>{
    //       document.getElementById(
    //         `node-${lastNode.row}-${lastNode.col}`
    //       ).className = `node Purple`;
    //       lastNode = lastNode.camefrom[0];
    //     },30*i)

    //   }
    //   document.getElementById(
    //     `node-${finish[0]}-${finish[1]}`
    //   ).className = `node Orange`;
    
    // for (let i = 0; i < counter; i++) {
    //     setTimeout(()=>{
    //       document.getElementById(
    //         `node-${lastNode.row}-${lastNode.col}`
    //       ).className = `node Purple`;
    //       lastNode = lastNode.camefrom[0];
    //     },30*i)

    //   }
    //   document.getElementById(
    //     `node-${finish[0]}-${finish[1]}`
    //   ).className = `node Orange`;

    
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
