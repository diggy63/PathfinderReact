import React, {useEffect, useState} from 'react'
import "./Node.css";

export default function Node({node, nodeColor, checkNodeLift}){
    let color = ''
    if(node.isVisited){
        color = 'Blue'
    }else if(node.isStart){
        color = 'Green'
    }else if(node.isEnd){
        color = 'Orange'
    }else if(node.isWall){
        color = 'Black'
    }

    function checkNode(){
        checkNodeLift(node.row,node.col)
    }


    return(
        <div className='node' id={color} onClick={checkNode}>
        </div>
    )
}