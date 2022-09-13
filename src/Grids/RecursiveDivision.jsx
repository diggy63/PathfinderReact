import { getOverlayDirection } from "react-bootstrap/esm/helpers";

export default function RecursiveDivision(props) {
  let grid = gridInit(props[0], props[1]);
  const rowsInit = [0, props[0]];
  const colsInit = [0, props[1]];
  const nodesProcessed = [];
  divisionInit(rowsInit, colsInit, grid, nodesProcessed);
  division(rowsInit, colsInit, grid, nodesProcessed);
  return [grid, nodesProcessed];
}

function division(rows, cols, grid, np) {
  if (rows[1] - rows[0] <= 3 || cols[1] - rows[0] <= 3) {
    return;
  }
  const direc = getWallDirection(rows, cols);
  if(direc){
    buildVert()
  }else{
    buildHorz()
  }
}

function divisionInit(rows, cols, grid, np) {
  for (let i = 0; i < cols[1]; i++) {
    grid[0][i].isWall = true;
    np.push([0, i]);
  }
  for (let i = 0; i < rows[1]; i++) {
    grid[i][cols[1] - 1].isWall = true;
    np.push([i, cols[1] - 1]);
  }
  for (let i = cols[1] - 1; i >= 0; i--) {
    grid[rows[1] - 1][i].isWall = true;
    np.push([rows[1] - 1, i]);
  }
  for (let i = rows[1] - 1; i >= 0; i--) {
    grid[i][0].isWall = true;
    np.push([i, 0]);
  }
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

function getWallDirection(rows, cols) {
  if (rows[1] - rows[0] === 4) {
    return true;
  } else if (cols[1] - cols[0] === 4) {
    return false;
  }
  let number = Math.random();
  if (number < 0.5) {
    return true
  } else {
    return false
  }
}

function buildHorz(){

}   
function buildVert(){

}