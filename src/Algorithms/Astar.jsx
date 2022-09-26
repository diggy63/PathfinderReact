export default async function Astar(start, end, nodes, ROWS, COLS) {
  const nodeScorse = AstarInit(start, end);
  const open_set = [nodeScorse[start[0]][start[1]]];
  const noders = await runAstar(open_set, nodeScorse, end, nodes, ROWS, COLS);
  return noders;
}
//function for getting neighbor nodes
function getNeighbors(node, nodes, nodeScorse, rows, cols) {
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

function createAstarNode(col, row) {
  return {
    col,
    row,
    fScore: Infinity,
    gScore: Infinity,
    camefrom: [],
  };
}
//creates the init grid array for the astar alogrithm, each node has a postion
// and an f score and g score
function AstarInit(start, end) {
  const nodeScorse = [];
  for (let row = 0; row < 25; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createAstarNode(col, row));
    }
    nodeScorse.push(currentRow);
  }
  nodeScorse[start[0]][start[1]].fScore = h(start, end);
  nodeScorse[start[0]][start[1]].gScore = 0;
  return nodeScorse;
}

//  heuristic to get the distance from the current node to the final node
function h(start, end) {
  const x = Math.abs(start[1] - end[1]);
  const y = Math.abs(start[0] - end[0]);
  return x + y;
}

//main a star function
async function runAstar(open_set, nodeScorse, end, nodes, rows,cols) {
  const visitedNodes = [];
  //while loop that runs until a return or until all unvisted nodes in a the open_set 
  //have looked at and there is no end
  while (open_set.length > 0) {
    const current = await bestNode(open_set)
    visitedNodes.push(current);
    //if statment that check to see if we have reached our end node
    if (current.row === end[0] && current.col === end[1]) {
      let lastNode = visitedNodes.pop();
      lastNode = lastNode.camefrom[0];
      const counter = lastNode.gScore;
      const pathNodes = [];
      //for loop that creates the shortest path from start node to end
      for (let i = 0; i < counter; i++) {
        pathNodes.unshift([lastNode.row, lastNode.col]);
        lastNode = lastNode.camefrom[0];
      }

      return [visitedNodes,pathNodes];
    }
    //gets the nieghbor nodes of current node if they are reachable and adds them to the open set while
    //updating there g scores and f scores
    let neighbors = getNeighbors([current.row, current.col], nodes, nodeScorse,rows,cols);
    neighbors.forEach((item) => {
      const newGScore = current.gScore + 1;
      if (newGScore < item.gScore) {
        item.gScore = newGScore;
        item.fScore = item.gScore + h([item.row, item.col], end);
        item.camefrom.push(current);
        //need to check if neighbor node has been looked at or do we need to add them to \
        //open set
        const bool = checkVisiteditems(open_set, item);
        if (!bool) {
          open_set.push(item);
        }
      }
    });
    //in a star we want to find the fastest path so we need to sort by fscore(closset to the end)
    open_set.sort((a, b) => {
      return a.fScore - b.fScore;
    });
  }
}
//check if the node is in the visited set
function checkVisiteditems(open_set, item) {
  open_set.forEach((checkItem) => {
    if (checkItem === item) {
      return true;
    }
  });
  return false;
}

//dont know if this speeds the algorithm up but it makes sure we are looking at the best node
//to find the end node. without it the function still works but checks the nodes by f score, this
//insures that we check by f and g score ie. the best node
function bestNode(set){
    let lowGS = set[0]
    let index = 0
    set.forEach((item,i) =>{
        if(item.fScore === lowGS.fScore && item.gScore > lowGS.gScore){
            lowGS = item
            index = i
        }
        if(item.fScore > lowGS.fScore){
            return
        }
    })
    set.splice(index,1)
    return lowGS
}
