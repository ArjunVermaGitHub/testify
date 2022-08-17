import React, { useEffect, useState } from 'react'

export default function Question(props) {
  const [ans, setAns]=useState(0)
  const [attempted, setAttempted]=useState(false)
  const [selectedMessage, setSelectedMessage] = useState("")
  const scoreHandler=()=>{
      setAttempted(true)
      setSelectedMessage("You selected "+props.options[ans-1])
      if(ans===props.correctOptionNo){
          props.setScore(props.score+1)
      }
      props.setAttemptedObject({...props.attemptedObject, [props.q_id]:ans})
  }
  const scoreUndoHandler=()=>{
    setAttempted(false)
    setSelectedMessage("")
    if(ans===props.correctOptionNo){
      props.setScore(props.score-1)
    }
  }
  

  console.log(props.correctOptionNo, props.attemptedObject)
  let arr=props.options.map((option,index)=>
    {
    return (<>
      <input type="radio" value={option} name={props.q_id} onClick={()=>setAns(index+1)} disabled={attempted}/>
      {option}<br/>
    </>)}
  )
  return (
    <div style={{display:props.shouldShow?"block":"none"}}>{props.q}<br/>
      {arr}

      <br/>
      <button disabled={attempted} onClick={()=>scoreHandler()}>Select</button>
      <button disabled={!attempted} onClick={()=>scoreUndoHandler()}>Deselect</button>
      <br/>
      <br/>
      {selectedMessage}
      <br/>
      <br/>

    </div>
  )
}
