import React, {useState, useEffect} from 'react'

import './Options.css'

export default function Options({seeStart, seeEnd, runAstar, runDijkstras, resetGrid}){
    const [isStart, setIsStart] = useState(false)
    const [isEnd, setIsEnd] = useState(false)

    // useEffect(() =>{
    //     console.log("switch")
    // },[start])

    
    function handleStart(){
        setIsEnd(false)
        seeStart(!isStart)
        setIsStart(!isStart)
        
    }

    function handleEnd(){
        setIsStart(false)
        seeEnd(!isEnd)
        setIsEnd(!isEnd)
    }
    function handleAstar(){
        runAstar()
    }
    function handleDijsktras(){
        runDijkstras()
    }
    function gridReset(){
        resetGrid()
    }
    return(
        <div className='optionC'>
        {isStart ? <h1>set start</h1> : <h1>click to set start</h1>}
        <button onClick={handleStart}>Start</button>
        {isEnd ? <h1>set End</h1> : <h1>click to set End</h1>}
        <button onClick={handleEnd}>End</button>
        <h1>Run A*</h1>
        <button onClick={handleAstar}>Run</button>
        <h1>Run Dijsktras</h1>
        <button onClick={handleDijsktras}>Run</button>
        <h1>Reset</h1>
        <button onClick={gridReset}>Reset</button>
        </div>

    )
}