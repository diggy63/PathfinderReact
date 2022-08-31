import React from "react"

export default async function Astar(start,end,nodes){
    const nodeScorse = AstarInit(start,end)
    const open_set = [nodeScorse[start[0]][start[1]]]
    const noders = await runAstar(open_set,nodeScorse,end,nodes)
    return noders
    

}

function getNeighbors(node, nodes,nodeScorse){
    let neighs = []
    if( node[0]-1 >= 0 && !nodes[node[0]-1][node[1]].isWall){
        neighs.push(nodeScorse[node[0]-1][node[1]])
    }
    if( node[0]+1 < 20 && !nodes[node[0]+1][node[1]].isWall){
        neighs.push(nodeScorse[node[0]+1][node[1]])
    }
    if( node[1]-1 >= 0 && !nodes[node[0]][node[1]-1].isWall){
        neighs.push(nodeScorse[node[0]][node[1]-1])
    }
    if( node[1]+1 < 50 && !nodes[node[0]][node[1]+1].isWall){
        neighs.push(nodeScorse[node[0]][node[1]+1])
    }
    return neighs
}

function createAstarNode(col, row) {
    return {
      col,
      row,
      // isStart: row === START_NODE_ROW && col === START_NODE_COL,
      // isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      fScore: Infinity,
      gScore: Infinity,
    };
  }

  function AstarInit(start,end){
    const nodeScorse = []
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
          currentRow.push(createAstarNode(col, row));
        }
        nodeScorse.push(currentRow);
      }
    nodeScorse[start[0]][start[1]].fScore = h(start,end)
    nodeScorse[start[0]][start[1]].gScore = 0
    return nodeScorse
  }

  function h(start,end){
    const x = Math.abs(start[1] - end[1])
    const y = Math.abs(start[0] - end[0])
    return(x+y)
  }

  async function runAstar(open_set, nodeScorse, end, nodes){
    const visitedNodes= []
    while(open_set.length > 0){

        const current = await open_set[0]
        open_set.shift()

        if(current.row === end[0] && current.col === end[1]){
            return visitedNodes
        }
        let neighbors = getNeighbors([current.row,current.col],nodes,nodeScorse)
        neighbors.forEach(item =>{
            const newGScore = current.gScore + 1
            if(newGScore < item.gScore){
                item.gScore = newGScore
                item.fScore = item.gScore + h([item.row,item.col],end)
                const bool = checkVisiteditems(open_set,item)
                if(!bool){
                    open_set.push(item)
                    visitedNodes.push(item)
                }
            }
            
            
        })
        open_set.sort((a,b) =>{
            return a.fScore - b.fScore
        })
    }
  }

  function checkVisiteditems(open_set,item){
        open_set.forEach(checkItem=>{
            if(checkItem === item){
                return true
            }
        })
        return false
  }