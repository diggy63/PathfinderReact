import React, {useEffect, useState} from 'react'
import "./Node.css";

export default function Node({node, isClicked, checkNodeLift}){
    let color = ''
    if(node.row === 0 & node.col === 0){
        console.log('node loaded')
    }
    if(node.clicked){
        color = 'clicked'
    }

    function checkNode(){
        checkNodeLift(node.row,node.col)
    }


    return(
        <div className='node' id={color} onClick={checkNode}>
        </div>
    )
}