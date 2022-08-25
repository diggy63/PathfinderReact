import React, {useEffect, useState} from 'react'
import "./Node.css";

export default function Node({node, isClicked, checkNodeLift}){
    let color = ''

    if(node.clicked){
        color = 'clicked'
    }

    useEffect(() => {
        console.log("inside the node")
    })
    function checkNode(){
        checkNodeLift(node.row,node.col)
    }


    return(
        <div className='node' id={color} onClick={checkNode}>
        </div>
    )
}