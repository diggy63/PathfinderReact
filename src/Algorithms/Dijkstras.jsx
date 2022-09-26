export default function Dijkstras(startP, endP, nodes,ROWS,COLS) {
  let grid = createAlgoGrid(startP);
  let unvisited = [grid[startP[0]][startP[1]]];
  let visited = [];
  //runs the function while there are still nodes in the unvisited Array and this will
  //run until it finds the end or check all nodes that are reachable
  while (unvisited.length > 0) {
    let current = unvisited[0];
    visited.push(unvisited.shift());
    //if statement checks if the current is the end
    if (current.row === endP[0] && current.col === endP[1]) {
      let lastNode = visited.pop();
      lastNode = lastNode.prevNode[0];
      const counter = lastNode.shortestD;
      const pathNodes = [];
      //for loop that returns the shortest path in the first to last node
      for (let i = 0; i < counter; i++) {
        pathNodes.unshift([lastNode.row, lastNode.col]);
        lastNode = lastNode.prevNode[0];
      }
      return [visited,pathNodes];
    }
    // gets neighbors and then gives its nieghbors its distance from the start node
    //if that distance is shorter than the current one it had its replaces the shortest distance
    // and prev node so that we always find the shortest route even if we visit a node
    // multiple times
    let neighbors = getNeighbors([current.row, current.col], nodes, grid,ROWS,COLS);
    neighbors.forEach((n) => {
      const potentialD = current.shortestD + 1;
      if (n.shortestD > potentialD) {
        n.shortestD = potentialD;
        n.prevNode = [current];
      }
      const check = checkForSame(unvisited, visited, n);
      if (!check) {
        unvisited.push(n);
      }
    });
    //need to short by shortest distance for quickest solve
    unvisited.sort((a, b) => {
      return a.shortestD - b.shortestD;
    });
  }
}

function getNeighbors(node, nodes, nodeScorse, rows,cols) {
  let neighs = [];
  if (node[0] - 1 >= 0 && !nodes[node[0] - 1][node[1]].isWall) {
    neighs.push(nodeScorse[node[0] - 1][node[1]]);
  }
  if (node[0] + 1 < rows && !nodes[node[0] + 1][node[1]].isWall) {
    neighs.push(nodeScorse[node[0] + 1][node[1]]);
  }
  if (node[1] - 1 >= 0 && !nodes[node[0]][node[1] - 1].isWall) {
    neighs.push(nodeScorse[node[0]][node[1] - 1]);
  }
  if (node[1] + 1 < cols && !nodes[node[0]][node[1] + 1].isWall) {
    neighs.push(nodeScorse[node[0]][node[1] + 1]);
  }
  return neighs;
}
//dijstraka nodes need to have a distance and prev node so that we can record the shortest path
// and distance has to be set to inf so when we visit for the first time we will record something
function createDijNode(col, row) {
  return {
    col,
    row,
    shortestD: Infinity,
    prevNode: [],
  };
}

function createAlgoGrid(start) {
  const nodeScorse = [];
  for (let row = 0; row < 25; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createDijNode(col, row));
    }
    nodeScorse.push(currentRow);
  }
  nodeScorse[start[0]][start[1]].shortestD = 0;
  return nodeScorse;
}
//this makes sure that we dont add multiple of the same nodes to the unvisited list
function checkForSame(uv, v, n) {
  let check = false;
  uv.forEach((item) => {
    if (item === n) {
      check = true;
    }
  });
  v.forEach((item) => {
    if (item === n) {
      check = true;
    }
  });
  return check;
}
