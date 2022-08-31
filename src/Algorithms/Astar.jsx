import React from "react"

export default function Astar(start,end,nodes){
    let y1 = start[0]
    let x1 = start[1]
    let y2 = end[0]
    let x2 = end[1]
    let neighbors = getNeighbors(start,nodes)
    console.log(neighbors)
    console.log(start)
    // console.log(x1+x2+y1+y2)
}

function getNeighbors(node, nodes){
    let neighs = []
    if( node[0]-1 >= 0){
        neighs.push(nodes[node[0]-1][node[1]])
    }
    if( node[0]+1 < 20 ){
        neighs.push(nodes[node[0]+1][node[1]])
    }
    if( node[1]-1 >= 0){
        neighs.push(nodes[node[0]][node[1]-1])
    }
    if( node[1]+1 < 50 ){
        neighs.push(nodes[node[0]][node[1]+1])
    }
    return neighs
}