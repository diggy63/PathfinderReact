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
  //   const direc = true
  if (direc) {
    const newCols = buildVert(rows, cols, grid, np);
    division(rows,newCols[0],grid,np)
    // division(rows, newCols[1], grid, np);
  } else {
    const newRols = buildHorz(rows, cols, grid, np);
    division(newRols[0],cols,grid,np)
    // division(newRols[1], cols, grid, np);
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
    return true;
  } else {
    return false;
  }
}

function buildHorz(rows, cols, grid, np) {
  const wallEnd = cols[1] - 2;
  const innerWallLength = rows[1] - rows[0] - 4;
  let wallPosition =
    Math.floor(Math.random() * innerWallLength) + (2 + rows[0]);
  const gapInWall =
    Math.floor(Math.random() * (wallEnd - cols[0])) + (1 + cols[0]);
  console.log(grid[wallPosition][cols[0]], grid[wallPosition][cols[1] - 1]);
  if (
    grid[wallPosition][cols[0]].isGap ||
    grid[wallPosition][cols[1] - 1].isGap
  ) {
    if (wallPosition + 3 === cols[1]) {
      wallPosition = wallPosition - 1;
    } else {
      wallPosition = wallPosition + 1;
    }
  }
  for (let i = cols[0] + 1; i <= wallEnd; i++) {
    if (gapInWall === i) {
      grid[wallPosition][i].isGap = true;
    } else {
      grid[wallPosition][i].isWall = true;
      np.push([[wallPosition], i]);
    }
  }
  return [
    [rows[0], wallPosition + 1],
    [wallPosition, rows[1]],
  ];
}
function buildVert(rows, cols, grid, np) {
  const wallEnd = rows[1] - 2;
  const innerWallLength = cols[1] - cols[0] - 4;
  let wallPosition =
    Math.floor(Math.random() * innerWallLength) + (2 + cols[0]);
  const gapInWall =
    Math.floor(Math.random() * (wallEnd - rows[0])) + (1 + rows[0]);
  if (
    grid[rows[0]][wallPosition].isGap ||
    grid[rows[1] - 1][wallPosition].isGap
  ) {
    if (wallPosition + 3 === rows[1]) {
      wallPosition = wallPosition - 1;
    } else {
      wallPosition = wallPosition + 1;
    }
  }
  for (let i = rows[0] + 1; i <= wallEnd; i++) {
    if (gapInWall === i) {
      grid[i][wallPosition].isGap = true;
    } else {
      grid[i][wallPosition].isWall = true;
      np.push([i, [wallPosition]]);
    }
  }
  return [
    [cols[0], wallPosition + 1],
    [wallPosition, cols[1], grid],
  ];
}
