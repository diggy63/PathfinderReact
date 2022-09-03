import React, { useEffect, useState, Component } from "react";

import "./Pathfinder.css";

import Astar from "../Algorithms/Astar";
import Dijkstras from "../Algorithms/Dijkstras";

import Random from '../Grids/Random'

import Node from "../components/Node/Node";
import Options from "../components/Options/Options";
import Header from "../components/Header/Header";

export default function Pathfinder() {
  const [counter, setCounter] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [startPoint, setStartPoint] = useState(false);
  const [endPoint, setEndPoint] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const ROWS = 25;
  const COLS = 50;

  useEffect(() => {
    console.log("mount");
    const grid = gridInit();
    setgrid(grid);
  }, []);

  function setgrid(node) {
    setNodes(node);
  }
  function clearGrid() {
    const grid = gridInit();
    setgrid(grid);
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
  async function runAlgorithm(algo){
    if(!startPoint || !endPoint){
      console.log('missing Start or End Point')
      return
    }
    let ans = false
    if(algo === 'A*'){
      ans = await Astar(startPoint, endPoint, nodes);
    }else if(algo === 'Dijsktras'){
      ans = await Dijkstras(startPoint, endPoint, nodes);
    }
    if (ans) {
      runAnimation(ans);
    } else {
      console.log("no solution");
    }
  }

  async function runAnimation(visitedNodes) {
    await visitedNodes[0].forEach((item, i) => {
      let newNodes = [...nodes];
      setTimeout(() => {
        newNodes[item.row][item.col].isVisited = true;
        setNodes(newNodes);
      }, 30 * i);
    });
    setTimeout(() => {
      visitedNodes[1].forEach((item,i) =>{
        let newNodes = [...nodes]
        setTimeout(()=>{
          newNodes[item[0]][item[1]].isPath = true
          setNodes(newNodes)
        },50*i)
      })
    }, 30 * visitedNodes[0].length);
  }

  function seeStart(bool) {
    setIsEnd(false);
    setIsStart(bool);
  }

  function seeEnd(bool) {
    setIsStart(false);
    setIsEnd(bool);
  }

  function resetGrid() {
    const grid = gridReset();
    setNodes(grid);
  }
  function randomGrid() {
    const grid = Random([ROWS,COLS]);
    setNodes(grid);
  }

  return (
    <>
      <Header
        seeStart={seeStart}
        seeEnd={seeEnd}
        resetGrid={resetGrid}
        clearGrid={clearGrid}
        randomGrid={randomGrid}
        runAlgorithm={runAlgorithm}
      />
      <div className="botHalf">
        <div className="grid">
          {nodes.map((row, ri) => {
            return (
              <>
                {row.map((node, ni) => {
                  return (
                    <Node key={ni} node={node} checkNodeLift={checkNode} />
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
    </>
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

  function gridReset() {
    const nodestart = [];
    for (let row = 0; row < ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < COLS; col++) {
        if (nodes[row][col].isWall) {
          currentRow.push(nodes[row][col]);
        } else {
          currentRow.push(createNode(col, row));
        }
      }
      nodestart.push(currentRow);
    }
    if (startPoint) {
      nodestart[startPoint[0]][startPoint[1]].isStart = true;
    }
    if (endPoint) {
      nodestart[endPoint[0]][endPoint[1]].isEnd = true;
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
      isPath: false,
      previousNode: null,
      color: "",
    };
  }
}
