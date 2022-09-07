export default function RecursiveDiv(props) {
  let grid = gridInit(props[0], props[1]);
  const rowL = [0,props[0]]
  const colL = [0,props[1]]
  Division(rowL,colL,grid);
  return grid;
}

function Division(rows,cols,grid) {
  let newColsA = cols
  let newRowsA = rows
  let newColsB = cols
  let newRowsB = rows
  if(rows[1]-rows[0] < 3 || cols[1]-cols[2] < 3){
    return
  }
  //makes choice between vertical or horizontal serperation using 1 as horizontal and 0 and vertical
  const rowOrCol = Math.floor(Math.random()*2)
  //builds wall around the new grid
  for(let rL = rows[0]; rL < rows[1]; rL++){
    for(let cL = cols[0];cL < cols[1]; cL++){
      if(rL === 0 || cL === 0 || rL === rows[1]-1 || cL === cols[1]-1){
        grid[rL][cL].isWall = true
       }
    }
  }

  if(rowOrCol > 0){
    //builds vertical wall
    const wall = Math.floor(Math.random()*(cols[1]-3))+2
    for(let i  = rows[0]; i < rows[1]; i++){
      grid[i][wall].isWall = true
    }
    newRowsA = [rows[0],wall]
    newRowsB = [wall,rows[1]]
  }else{
    //build horizontal wall
    const wall = Math.floor(Math.random()*(rows[1]-3))+2
    for(let i  = cols[0]; i < cols[1]; i++){
      grid[wall][i].isWall = true
    }
    newColsA = [cols[0],wall]
    newColsB = [wall,cols[1]]
  }
  console.log(newRowsA,newColsA)
  console.log(newRowsB,newColsB)
  // Division(newRowsA,newColsA,grid)
  // Division(newRowsB,newColsB,grid)
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
