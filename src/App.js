import './App.css';
import Pathfinder from './Pages/Pathfinder';

function App() {

  const ROWS = 20;
  const COLS = 50;
  function gridInit() {
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
  return (
    <div className='App'>
      <Pathfinder />
    </div>
  );
}

function createNode(col, row) {
  return {
    col,
    row,
    isStart: false,
    distance: Infinity,
    isVisited: false,
    isEnd: false,
    isWall: false,
    previousNode: null,
  };
}








export default App;
