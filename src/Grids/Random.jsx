import { cloneElement } from "react";

export default function Random(props){
        const nodestart = [];
        const nodesPro = []
        for (let row = 0; row < props[0]; row++) {
          const currentRow = [];
          for (let col = 0; col < props[1]; col++) {
            let rNum = Math.floor(Math.random() * 10);
            if (rNum > 5) {
              nodesPro.push([row,col])
              let rNode = createNode(col, row);
              rNode.isWall = true;
              currentRow.push(rNode);
            } else {
              currentRow.push(createNode(col, row));
            }
          }
          nodestart.push(currentRow);
        }
        return [nodestart,nodesPro];

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
    
    
