import React from 'react'

export default function Random(props){
        console.log(props)
        const nodestart = [];
        for (let row = 0; row < props[0]; row++) {
            console.log('in row')
          const currentRow = [];
          for (let col = 0; col < props[1]; col++) {
            console.log('in col')
            let rNum = Math.floor(Math.random() * 10);
            if (rNum > 5) {
              let rNode = createNode(col, row);
              rNode.isWall = true;
              currentRow.push(rNode);
            } else {
              currentRow.push(createNode(col, row));
            }
          }
          nodestart.push(currentRow);
        }
        console.log(nodestart)
        return nodestart;

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
          isPath: false,
          previousNode: null,
          color: "",
        };
      }
    
    
