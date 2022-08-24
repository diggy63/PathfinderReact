import React, {useEffect, useState} from 'react'

import './Pathfinder.css'

import Node from '../components/Node/Node'


export default function Pathfinder(){

    const [nodes,setNodes] = useState([])
    const [nodeChange,setNodeChange] = useState([80,80])
    const ROWS = 20
    const COLS = 50
    useEffect(() => {
        const node = []
        for(let row = 0; row < ROWS; row++){
            const currentRow = []
            for(let col = 0; col < COLS; col++){
                currentRow.push({row:row,col:col, isClicked:false})
            }
            node.push(currentRow)
        }
        setNodes(node)
        console.log(nodes)
    }, [])

    function checkNode(row,col){
        setNodes(nodes)

    }

    const nodesList = nodes.map((item,i) =>{
        return(
            item.map((item,idx) =>{
                return <Node key={i+idx} row={item.row} col={item.col} isClicked={item.isClicked} checkNodeLift={checkNode} />
            })
        )
    })
    return(
        <div className='container'>
        <div className='grid'>
        {nodesList}
        </div>
        </div>
        
    )
} 