import React, {useState, useEffect} from 'react'

export default function Options({seeStart}){
    const [isStart, setIsStart] = useState(false)


    // useEffect(() =>{
    //     console.log("switch")
    // },[start])

    
    function handleStart(){
        seeStart(!isStart)
        setIsStart(!isStart)
        
    }
    return(
        <div>
        {isStart ? <h1>set start</h1> : <h1>click to set start</h1>}
        <button onClick={handleStart}>start</button>
        </div>
    )
}