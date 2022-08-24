import React, {useEffect, useState} from 'react'

import './Pathfinder.css'

import Node from '../components/Node/Node'


export default function Pathfinder(){

    const  [nodes,setNodes] = useState([])
    const ROWS = 20
    const COLS = 50
    useEffect(() => {
        const node = []
        for(let row = 0; row < ROWS; row++){
            const currentRow = []
            for(let col = 0; col < COLS; col++){
                currentRow.push({row:row,col:col})
            }
            node.push(currentRow)
        }
        setNodes(node)
    }, [])

    const nodesList = nodes.map((item,i) =>{
        return(
            item.map(item =>{
                return <Node row={item.row} col={item.col} />
            })
        )
    })
    console.log(nodes)
    return(
        <div className='container'>
        <div className='grid'>
        {nodesList}
        </div>
        </div>
        
    )
} 