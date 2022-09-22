export default function RecursiveDivision(props) {
  let grid = gridInit(props[0], props[1]);
  const rowsInit = [0, props[0]];
  const colsInit = [0, props[1]];
  const nodesProcessed = [];
  divisionInit(rowsInit, colsInit, grid, nodesProcessed);
  const divRows = [1, props[0] - 2];
  const divCols = [1, props[1] - 2];
  division(divRows, divCols, grid, nodesProcessed);
  return [grid, nodesProcessed];
}
//recursive division function
function division(rows, cols, grid, np) {
  console.log("start of div", rows, cols);
  if (cols[1] - cols[0] <= 0 || !cols) {
    console.log("cols sqiushed");
    return;
  }
  if (rows[1] - rows[0] <= 0 || !rows) {
    console.log("rows squished");
    return;
  }
  if (cols[1] - cols[0] === 1 && rows[1] - rows[0] === 1) {
    finishSquare(rows, cols, grid, np);
    return;
  }
  const direct = getWallDirection(rows, cols);
  if (direct) {
    let newCols = buildVert(rows, cols, grid, np);
    if (!newCols) {
      newCols = division(rows, cols, grid, np);
    }
    division(newCols[0], newCols[2], grid, np);
    division(newCols[1], newCols[3], grid, np);
  } else {
    let newRows = buildHorz(rows, cols, grid, np);
    if (!newRows) {
      newRows = division(rows, cols, grid, np);
    }
    division(newRows[0], newRows[2], grid, np);
    division(newRows[1], newRows[3], grid, np);
  }
}
// makes border aoround pathfinder area
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
//builds the array of arrays that represent our nodes to do recursive div
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
  if (cols[1] - cols[0] <= 1) {
    return false;
  }
  if (rows[1] - rows[0] <= 1) {
    return true;
  }
  const x = Math.floor(Math.random() * 2) == 0;
  if (x) {
    return false;
  } else {
    return true;
  }
}

function buildHorz(rows, cols, grid, np) {
  console.log("builidng horz");
  let wall =
    Math.floor(Math.random() * (rows[1] - rows[0] - 1)) + (rows[0] + 1);
  const gap = Math.floor(Math.random() * (cols[1] - cols[0] + 1) + cols[0]);
  if (grid[wall][cols[0] - 1].isGap) {
    grid[wall][cols[0]].isGap = true;
  }
  if (grid[wall][cols[1] + 1].isGap) {
    grid[wall][cols[1]].isGap = true
  }
  for (let i = cols[0]; i <= cols[1]; i++) {
    if (gap === i) {
      grid[wall][i].isGap = true;
    } else if(!grid[wall][i].isGap){
      grid[wall][i].isWall = true;
      np.push([wall,i])
    }
    // if (grid[wall][cols[0] - 1].isGap) {
    //   grid[wall][cols[0]].isWall = false;
    //   grid[wall][cols[0] + 1].isWall = true;
    // }
    // if (grid[wall][cols[1] + 1].isGap) {
    //   grid[wall][cols[1]].isWall = false;
    //   grid[wall][cols[1] - 1].isWall = true;
    // }
  }
  return [
    [rows[0], wall - 1],
    [wall + 1, rows[1]],
    [cols[0], cols[1]],
    [cols[0], cols[1]],
  ];
}
function buildVert(rows, cols, grid, np) {
  console.log("building vert");
  let wall =
    Math.floor(Math.random() * (cols[1] - cols[0] - 1)) + (cols[0] + 1);
  // let wall = Math.floor(((cols[1]-cols[0]+1)/2)+(cols[0]+1))
  const gap = Math.floor(Math.random() * (rows[1] - rows[0] + 1) + rows[0]);
  if (grid[rows[0] - 1][wall].isGap) {
    grid[rows[0]][wall].isGap = true;
    // grid[rows[0]+ 1][wall].isWall = true
  } else if (grid[rows[1] + 1][wall].isGap) {
    grid[rows[1]][wall].isGap = true;
    // grid[rows[1]-1][wall].isWall = true
  }
  for (let i = rows[0]; i <= rows[1]; i++) {
    if (gap === i) {
      grid[i][wall].isGap = true;
    }else if(!grid[i][wall].isGap) {
      grid[i][wall].isWall = true;
      np.push([i,wall])
    }
  }
  // if (grid[rows[0] - 1][wall].isGap) {
  //   grid[rows[0]][wall].isWall = false;
  //   // grid[rows[0]+ 1][wall].isWall = true
  // } else if (grid[rows[1] + 1][wall].isGap) {
  //   grid[rows[1]][wall].isWall = false;
  //   // grid[rows[1]-1][wall].isWall = true
  // }

  return [
    [rows[0], rows[1]],
    [rows[0], rows[1]],
    [cols[0], wall - 1],
    [wall + 1, cols[1]],
  ];
}

function finishSquare(rows, cols, grid, np) {
  console.log(rows);
  console.log(cols);
}
