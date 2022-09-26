export default function DFS(startP, endP, nodes,ROWS,COLS) {
  const DFSgrid = DFSinit();
  const visited = [];
  let unvisited = [DFSgrid[startP[0]][startP[1]]];
  //thsi will run until we run out of visitable nodes or we find the end
  while (unvisited.length > 0) {
    const current = unvisited[0];
    unvisited.shift()
    visited.push(current);
    //end condition is if we found the end and returns the path
    if (current.row === endP[0] && current.col === endP[1]) {
      let firstNode = visited.shift();
      firstNode = firstNode.prevNode[0]
      const counter = visited.pop().count
      console.log(counter)
      const pathNodes = [];
      for(let i = 0; i < counter; i++){

        pathNodes.unshift([firstNode.row, firstNode.col]);
        firstNode = firstNode.prevNode[0];
      }
      return [visited,pathNodes];
    }
    //neighbors and adds to the unvisited list and the list checks if there are open nodes
    //in a clockwise direction so up right down left
    let neighs = getNeighbors([current.row, current.col], nodes, DFSgrid,ROWS,COLS);
    neighs.forEach((item) => {
      item.prevNode = [current];
      //we need to check if we have seen the item in both the visited and unvisted so that we 
      //dont check it twice we dont care about shortest distance just if we have seen it
      const check = checkForSame(unvisited, visited, item);
      if (!check) {
        item.count = current.count + 1
        unvisited.unshift(item);
      }
    });
  }
}


function getNeighbors(node, nodes, nodeScorse,rows,cols) {
    let neighs = [];
    if (node[1] - 1 >= 0 && !nodes[node[0]][node[1] - 1].isWall) {
        neighs.push(nodeScorse[node[0]][node[1] - 1]);
      }
    if (node[0] + 1 < rows && !nodes[node[0] + 1][node[1]].isWall) {
        neighs.push(nodeScorse[node[0] + 1][node[1]]);
      }
    if (node[1] + 1 < cols && !nodes[node[0]][node[1] + 1].isWall) {
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
  uv.forEach((item,i)=>{
    if (item === n){
        uv.splice(i,1)
    }
  })
  return check;
}
