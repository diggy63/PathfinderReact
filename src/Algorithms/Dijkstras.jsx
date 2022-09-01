import React from 'react'

export default function Dijkstras(startP,endP,nodes){
    let grid = createAlgoGrid(startP)
    let unvisited = [grid[startP[0]][startP[1]]]
    let visited = []
    while(unvisited.length > 0){
    let current = unvisited[0]
    visited.push(unvisited.shift())
    if(current.row === endP[0] && current.col === endP[1]){
        return visited
    }
    let neighbors = getNeighbors([current.row,current.col],nodes,grid)
    neighbors.forEach(n =>{
        const potentialD = current.shortestD + 1
        if(n.shortestD > potentialD){
            n.shortestD = potentialD
            n.prevNode = [current]
        }
        const check = checkForSame(unvisited,visited,n)
        if(!check){
            unvisited.push(n)
        }
        })
        unvisited.sort((a,b) =>{
            return a.shortestD - b.shortestD
        })
    }
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
function createDijNode(col, row) {
    return {
      col,
      row,
      shortestD: Infinity,
      prevNode:[]
    };
  }

function createAlgoGrid(start){
    const nodeScorse = []
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
          currentRow.push(createDijNode(col, row));
        }
        nodeScorse.push(currentRow);
      }
    nodeScorse[start[0]][start[1]].shortestD = 0
    return nodeScorse
}

function checkForSame(uv,v,n){
    let check = false
    uv.forEach(item => {
        if(item === n){
            check = true
        }
    })
    v.forEach(item =>{
        if(item === n){
            check = true
        }
    })
    return check
}