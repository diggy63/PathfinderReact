export default function RecursiveDiv(props) {
  let grid = gridInit(props[0], props[1]);
  const newGrid = Division(grid);
  return newGrid;
}

function Division(grid) {
  const row = grid.length;
  const col = grid[0].length;
  const wallWithGap = (Math.floor(Math.random() * (col-1))+1);
  grid.forEach((row, i) => {
    row.forEach((node, nodeI) => {
      if (!node.isGap) {
        if (i === 0 || i === grid.length - 1) {
          node.isWall = true;
        } else if (nodeI === 0 || nodeI === row.length - 1 || nodeI === wallWithGap) {
          node.isWall = true;
        }
      }
    });

  });
  return grid;
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
    isGap: false,
    isEnd: false,
    isWall: false,
    isPath: false,
    previousNode: null,
    color: "",
  };
}
