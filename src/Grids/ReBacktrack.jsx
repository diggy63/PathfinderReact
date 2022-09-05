export default function ReBacktrack(props) {
  const grid = gridInit(props[0], props[1]);
  let current = [0, 0];
  let i = 0
  while (i < 100) {
    let neighs = getNeighbors(current, grid);
    grid[current[0]][current[1]].mazeVisited = true;
    console.log(neighs)
    let nextCell = Math.floor(Math.random() * neighs.length);
    neighs.forEach((item, i) => {
      if (i != nextCell) {
        item.isWall = true;
      }else{
        current = [item.row,item.col]
      }
    });
    i++
  }
  return grid;
}

function getNeighbors(node, nodes) {
  let neighs = [];
  if (node[0] - 1 >= 0 && !nodes[node[0] - 1][node[1]].isWall && !nodes[node[0] - 1][node[1]].mazeVisited) {
    neighs.push(nodes[node[0] - 1][node[1]]);
  }
  if (node[0] + 1 < 25 && !nodes[node[0] + 1][node[1]].isWall && !nodes[node[0] + 1][node[1]].mazeVisited) {
    neighs.push(nodes[node[0] + 1][node[1]]);
  }
  if (node[1] - 1 >= 0 && !nodes[node[0]][node[1] - 1].isWall && !nodes[node[0]][node[1] - 1].mazeVisited) {
    neighs.push(nodes[node[0]][node[1] - 1]);
  }
  if (node[1] + 1 < 50 && !nodes[node[0]][node[1] + 1].isWall && !nodes[node[0]][node[1] + 1].mazeVisited) {
    neighs.push(nodes[node[0]][node[1] + 1]);
  }
  return neighs;
}

function gridInit(ROWS, COLS) {
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
    mazeVisited: false,
    isEnd: false,
    isWall: false,
    isPath: false,
    previousNode: null,
    color: "",
  };
}
