import React, { useEffect, useState } from 'react'
import './Question.scss'

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
  

  let arr=props.options.map((option,index)=>
    {
    return (<div className='option-holder'>
      <div className='option-selector'>
        <input type="radio" value={option} name={props.q_id} onClick={()=>setAns(index+1)} disabled={attempted}/>
      </div>     
      <div className='option-text'>
        {option}
      </div>
      
      <br/>
    </div>)
    }
  )
  return (
    <div style={{display:props.shouldShow?"block":"none"}}>{props.number}. {props.q}<br/>
      {arr}
      <br/>
      <div className='button-holder'>
        <button disabled={attempted} onClick={()=>scoreHandler()}>Select</button>
        <button disabled={!attempted} onClick={()=>scoreUndoHandler()}>Deselect</button>
      </div>
      <br/>
      <br/>
      {selectedMessage}
      <br/>
      <br/>

    </div>
  )
}
