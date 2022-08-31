import React, {useEffect, useState} from 'react'
import "./Node.css";

export default function Node({node,isStart, checkNodeLift}){
    let color = ''

    console.log(isStart)

    if(node.isVisited){
        color = 'Blue'
    }

    if(node.isStart){
        color = 'Orange'
    }

    function checkNode(){
        checkNodeLift(node.row,node.col)
    }


    return(
        <div className='node' id={color} onClick={checkNode}>
        </div>
    )
}