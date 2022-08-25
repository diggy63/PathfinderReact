import React, {useState} from 'react'

export default function Options(){
    const [start, setStart] = useState(false)
    function handleStart(e){
        setStart(!start)
    }
    return(
        <>
        <input type="checkbox" value='off' onChange={handleStart}/>
        </>
    )
}