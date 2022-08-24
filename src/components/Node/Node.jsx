import React, {useEffect, useState} from 'react'
import "./Node.css";

export default function Node({row,col, isClicked, checkNodeLift}){
    const [nodeID, setNodeID] = useState('')
    
    useEffect(()=>{

    },[nodeID])

    function checkNode(){
        checkNodeLift(row,col)
        setNodeID('clicked')
    }


    return(
        <div className='node' id={nodeID} onClick={checkNode}>
        </div>
    )
}