export default function RecursiveDiv(props) {
  let grid = gridInit(props[0], props[1]);
  const nodesPlaced = [];
  const rowL = [0, props[0]];
  const colL = [0, props[1]];
  buildNewSection(rowL, colL, grid, nodesPlaced);
  Division(rowL, colL, grid, nodesPlaced);
  return [grid, nodesPlaced];
}

function Division(rows, cols, grid, np) {
  let vert = false;
  let horz = false;
  let newColsA = cols;
  let newRowsA = rows;
  let newColsB = cols;
  let newRowsB = rows;

  if (rows[1] - rows[0] < 4 || cols[1] - cols[0] < 4) {
    console.log("done");
    return;
  }
  //makes choice between vertical or horizontal serperation using 1 as horizontal and 0 and vertical
  const rowOrCol = Math.floor(Math.random() * 2);
  rowOrCol === 1 ? (vert = true) : (horz = true);
  //check to make sure if we need to go horizonatal or vertical to ignore the random flip
  if (cols[1] - cols[0] < 5) {
    horz = true;
    vert = false;
  } else if (rows[1] - rows[0] < 5) {
    vert = true;
    horz = false;
  }
  //builds wall around the new grid
  if (vert) {
    //builds vertical wall
    const newCols = buildVert(rows, cols, grid, np);
    newColsA = newCols[0];
    newColsB = newCols[1];
  } else if (horz) {
    const newRows = buildHorz(rows, cols, grid, np);
    newRowsA = newRows[0];
    newRowsB = newRows[1];
    //build horizontal wall
    // const wall = Math.floor(Math.random() * (rows[1] - 4 - rows[0])) + (2 + rows[0]);
    // const gap = Math.floor(Math.random() * (cols[1] - 4 - cols[0])) + (2 + cols[0]);
    // console.log(gap)
    // for (let i = cols[0]; i < cols[1]; i++) {
    //   if(i === gap){
    //     grid[wall][i].isGap = true;
    //   }else{
    //     grid[wall][i].isWall = true;
    //     np.push([wall,i])
    //   }

    // }
    // newRowsA = [rows[0], wall + 1];
    // newRowsB = [wall, rows[1]];
  }
  Division(newRowsA, newColsA, grid, np);
  Division(newRowsB, newColsB, grid, np);
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

function buildNewSection(rows, cols, grid, np) {
  for (let rL = rows[0]; rL < rows[1]; rL++) {
    for (let cL = cols[0]; cL < cols[1]; cL++) {
      if (
        rL === rows[0] ||
        cL === rows[0] ||
        rL === rows[1] - 1 ||
        cL === cols[1] - 1
      ) {
        if (grid[rL][cL].isGap) {
          console.log("gap");
        } else if (!grid[rL][cL].isWall) {
          grid[rL][cL].isWall = true;
          np.push([rL, cL]);
        }
      }
    }
  }
}

function buildVert(rows, cols, grid, np) {
  //builds vertical wall
  let wall =
    Math.floor(Math.random() * (cols[1] - 4 - cols[0])) + (2 + cols[0]);
  const gap =
    Math.floor(Math.random() * (rows[1] - 4 - rows[0])) + (2 + rows[0]);
  if (grid[rows[0]][wall].isGap || grid[rows[1] - 1][wall].isGap) {
    if (wall + 3 >= cols[1]) {
      wall = wall - 1;
    } else {
      wall = wall + 1;
    }
  }
  for (let i = rows[0]; i < rows[1]; i++) {
    if (i === gap) {
      grid[i][wall].isGap = true;
    } else {
      grid[i][wall].isWall = true;
      np.push([i, wall]);
    }
  }
  return [
    [cols[0], wall + 1],
    [wall, cols[1]],
  ];
}

function buildHorz(rows, cols, grid, np) {
  let wall =
    Math.floor(Math.random() * (rows[1] - 4 - rows[0])) + (2 + rows[0]);
  const gap =
    Math.floor(Math.random() * (cols[1] - 4 - cols[0])) + (2 + cols[0]);
    if(grid[wall][cols[0]].isGap || grid[wall][cols[1]-1].isGap){
      if((wall+3) >= rows[1]){
        wall = wall -1
      }else{
        wall = wall + 1
      }
    }
  for (let i = cols[0]; i < cols[1]; i++) {
    if (i === gap) {
      grid[wall][i].isGap = true;
    } else {
      grid[wall][i].isWall = true;
      np.push([wall, i]);
    }
  }
  return [
    [rows[0], wall + 1],
    [wall, rows[1]],
  ];
}
