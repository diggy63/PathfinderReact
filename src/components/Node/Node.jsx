import React, {useEffect, useState} from 'react'
import "./Node.css";

export default function Node({node, nodeColor, checkNodeLift}){
    let color = ''
    if(node.isPath){
        color = 'Purple'
    }else if(node.isStart){
        color= 'Green'
    }else if(node.isEnd){
        color = 'Orange'
    }else if(node.isWall){
        color = 'Black'
    }else if(node.isVisited){
        color = 'Blue'
    }

    function checkNode(){
        checkNodeLift(node.row,node.col)
    }


    return(
        <div className={`node ${color}`} id={`node-${node.row}-${node.col}`} onClick={checkNode}>
        </div>
    )
}