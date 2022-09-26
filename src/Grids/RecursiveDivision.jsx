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
  //when the cols overlap and there is no space to build walls end recursion
  if (cols[1] - cols[0] <= 0 || !cols) {
    return;
  }
  //when the rows over lap meaning there is no where to build end the recursion
  if (rows[1] - rows[0] <= 0 || !rows) {
    return;
  }
  // when the maze ends in a 2x2 we need to finish in a way in order not to cover exit
  if (cols[1] - cols[0] === 1 && rows[1] - rows[0] === 1) {
    finishSquare(rows, cols, grid, np);
    return;
  }
  //getting direct of walls true === vert and false === horizontal
  const direct = getWallDirection(rows, cols);
  if (direct) {
    let newCols = buildVert(rows, cols, grid, np);
    //after building the vertical wall we are given the new halfs after wall is built
    // if there is no possible way to resolve the two new halfs ie there is to many gaps to make a wall
    // or there is an error we rerun recursion
    if (!newCols) {
      newCols = division(rows, cols, grid, np);
    }

    division(newCols[0], newCols[2], grid, np);
    division(newCols[1], newCols[3], grid, np);
  } else {
    let newRows = buildHorz(rows, cols, grid, np);
    //after building the vertical wall we are given the new halfs after wall is built
    // if there is no possible way to resolve the two new halfs ie there is to many gaps to make a wall
    // or there is an error we rerun recursion
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
//builds the initial array of arrays that represent our nodes to do recursive div
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

//Makes a 50 50 decision in order to make a vert or horizontal wall and has some 
//logic to make sure we dont make a wall where there is no space
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

//bullds the horizontal wall and houses the logic that makes sure we dont cover gaps
function buildHorz(rows, cols, grid, np) {
  let wall =
    Math.floor(Math.random() * (rows[1] - rows[0] - 1)) + (rows[0] + 1);
  const gap = Math.floor(Math.random() * (cols[1] - cols[0] + 1) + cols[0]);
  //next to if statments check to make sure we are not overlapping a former gap
  //basically if we are running into a gap or exit we dont make a wall next to it
  if (grid[wall][cols[0] - 1].isGap) {
    grid[wall][cols[0]].isGap = true;
  }
  if (grid[wall][cols[1] + 1].isGap) {
    grid[wall][cols[1]].isGap = true
  }
  //builds the wall
  for (let i = cols[0]; i <= cols[1]; i++) {
    if (gap === i) {
      grid[wall][i].isGap = true;
    } else if(!grid[wall][i].isGap){
      grid[wall][i].isWall = true;
      np.push([wall,i])
    }
  }
  //this return could be a little cleaner but this gives me more room to test future ideas
  return [
    [rows[0], wall - 1],
    [wall + 1, rows[1]],
    [cols[0], cols[1]],
    [cols[0], cols[1]],
  ];
}
//builds vertical wall
function buildVert(rows, cols, grid, np) {
  let wall =
    Math.floor(Math.random() * (cols[1] - cols[0] - 1)) + (cols[0] + 1);
  const gap = Math.floor(Math.random() * (rows[1] - rows[0] + 1) + rows[0]);
  //two if statments to make sure we dont run into and cover a former exit
  if (grid[rows[0] - 1][wall].isGap) {
    grid[rows[0]][wall].isGap = true;
  } else if (grid[rows[1] + 1][wall].isGap) {
    grid[rows[1]][wall].isGap = true;
  }
  //builds the wall
  for (let i = rows[0]; i <= rows[1]; i++) {
    if (gap === i) {
      grid[i][wall].isGap = true;
    }else if(!grid[i][wall].isGap) {
      grid[i][wall].isWall = true;
      np.push([i,wall])
    }
  }
  //once agian this could be cleaner but its give me options to test in the future
  return [
    [rows[0], rows[1]],
    [rows[0], rows[1]],
    [cols[0], wall - 1],
    [wall + 1, cols[1]],
  ];
}

//future function to handlea a 2x2 sqaure to not cover and exit
function finishSquare(rows, cols, grid, np) {
  // console.log('2x2');
}
