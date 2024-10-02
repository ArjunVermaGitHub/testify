import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Quiz from '../Quiz'
import './QuizList.scss'

export default function QuizList() {
    const [quizzesJSX, setQuizzesJSX] = useState("")
    const [quiz, setQuiz] = useState("")
    
    const getQuizzes=()=>{
        axios.get("http://localhost:3002/api/quizzes").then(res=>{
          setQuizzesJSX([...res.data?.map(d=>
          <div className='quiz'>
            <h2>{d?.heading}</h2>
            <h4>{d?.description}</h4>
            <p>Number of questions in the quiz: {d?.numberOfQuestions}</p>
            <button onClick={()=>{
              setQuiz(d.id)}}>Get List of questions</button>
          </div>
          )])
        }, )
    }

    useEffect(()=>{
        getQuizzes()
    },[])
  return (
    <>
        <div className="quiz-holder">{quizzesJSX}</div>
        {quiz && <Quiz quiz={quiz}/>}
    </>
  )
}
