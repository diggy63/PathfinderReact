export default function DFS(startP, endP, nodes) {
  const DFSgrid = DFSinit();
  const visited = [];
  let unvisited = [DFSgrid[startP[0]][startP[1]]];
  let i = 0;
  while (unvisited.length > 0) {
    const current = unvisited[0];
    visited.push(current);
    unvisited = []
    if (current.row === endP[0] && current.col === endP[1]) {
      let firstNode = visited.shift();
      firstNode = firstNode.prevNode[0]
      console.log(firstNode)
      const counter = visited.pop().count
      console.log(counter)
      const pathNodes = [];
      for(let i = 0; i < counter; i++){

        pathNodes.unshift([firstNode.row, firstNode.col]);
        firstNode = firstNode.prevNode[0];
      }
      return [visited,pathNodes];
    }
    let neighs = getNeighbors([current.row, current.col], nodes, DFSgrid);
    neighs.forEach((item) => {
      item.prevNode = [current];
      const check = checkForSame(unvisited, visited, item);
      if (!check) {
        item.count = current.count + 1
        unvisited.unshift(item);
      }
    });
  }
}


function getNeighbors(node, nodes, nodeScorse) {
    let neighs = [];
    if (node[1] - 1 >= 0 && !nodes[node[0]][node[1] - 1].isWall) {
        neighs.push(nodeScorse[node[0]][node[1] - 1]);
      }
    if (node[0] + 1 < 25 && !nodes[node[0] + 1][node[1]].isWall) {
        neighs.push(nodeScorse[node[0] + 1][node[1]]);
      }
    if (node[1] + 1 < 50 && !nodes[node[0]][node[1] + 1].isWall) {
        neighs.push(nodeScorse[node[0]][node[1] + 1]);
      }
    if (node[0] - 1 >= 0 && !nodes[node[0] - 1][node[1]].isWall) {
        neighs.push(nodeScorse[node[0] - 1][node[1]]);
    }
    return neighs;
  }

function DFSinit() {
  const nodeScorse = [];
  for (let row = 0; row < 25; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createDFSNode(col, row));
    }
    nodeScorse.push(currentRow);
  }
  return nodeScorse;
}

function createDFSNode(col, row) {
  return {
    col,
    row,
    count: 0,
    prevNode: [],
  };
}

function checkForSame(uv, v, n) {
  let check = false;
  v.forEach((item) => {
    if (item === n) {
      check = true;
    }
  });
  return check;
}
