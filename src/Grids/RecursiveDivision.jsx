import { getOverlayDirection } from "react-bootstrap/esm/helpers";

export default function RecursiveDivision(props) {
  let grid = gridInit(props[0], props[1]);
  const rowsInit = [0, props[0]];
  const colsInit = [0, props[1]];
  const nodesProcessed = [];
  divisionInit(rowsInit, colsInit, grid, nodesProcessed);
  const divRows = [1,(props[0]-2)]
  const divCols = [1,(props[1]-2)]
  division(divRows, divCols, grid, nodesProcessed);
  return [grid, nodesProcessed];
}
//recursive division function
function division(rows, cols, grid, np) {
  console.log(cols)
  if(cols[1]-cols[0] <= 0){
    return
  }
  if(rows[1]-rows[0] <= 0){
    return
  }
  const direct = getWallDirection(rows,cols)
  // const direct = true
  if(direct){
    const newCols = buildVert(rows,cols, grid, np)
    division(rows,newCols[0],grid,np)
    division(rows,newCols[1],grid,np)
  }else{
    const newRows = buildHorz(rows,cols, grid, np)
    division(newRows[0],cols,grid,np)
    division(newRows[1],cols,grid,np)
    
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
    if(cols[1] - cols[0] <= 1){
      return false
    }
    if(rows[1] - rows[0] <= 1){
      return true
    }
    const x = (Math.floor(Math.random() * 2) == 0);
    if(x){
    	return true;
    }else{
      return false;
    }

}

function buildHorz(rows, cols, grid, np) {
  let wall = Math.floor(Math.random()*(rows[1]-rows[0]-1))+(rows[0]+1)
  const gap = Math.floor(Math.random()*(cols[1]-cols[0]+1)+(cols[0]))
  if(grid[wall][cols[0]-1].isGap || grid[wall][cols[1]+1].isGap ){
    
  }
  for( let i = cols[0]; i <= cols[1]; i++){
    if(gap === i){
      grid[wall][i].isGap = true
      console.log(gap)
    }else{
      grid[wall][i].isWall = true
    }
    
  }
  return [[rows[0],wall-1],[wall+1,rows[1]]]
}
function buildVert(rows, cols, grid, np) {
  let wall = Math.floor(Math.random()*(cols[1]-cols[0]-1))+(cols[0]+1)
  const gap = Math.floor(Math.random()*(rows[1]-rows[0]+1)+(rows[0]))
  for( let i = rows[0]; i <= rows[1]; i++){
    if(gap === i){
      grid[i][wall].isGap = true
    }else{
      grid[i][wall].isWall = true
    }
  }
  return [[cols[0],wall-1],[wall+1,cols[1]]]
}
