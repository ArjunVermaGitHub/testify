import React from 'react'
import "./QuestionCard.scss"

export default function QuestionCard({id, question, options, correctOptionNo, category}) {
  return (
    <div className="card-holder">
        <h3>{question}</h3>
        {options.map((option, index)=><div style={{color:index+1===correctOptionNo? "green":""}}>
            {option}
        </div>)}
        <br></br>
        <div>Category: {category}</div>
        <div>ID: {id}</div>
    </div>
  )
}
