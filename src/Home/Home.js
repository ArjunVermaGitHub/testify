import React from 'react'
import { useEffect, useState } from 'react'
import {Link,Navigate} from "react-router-dom"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../features/users/userSlice'

export default function Home() {
  const [started, setStarted]=useState(false)
  const [questions, setQuestions]=useState([])
  const [quiz, setQuiz]=useState("Select")
  const [quizzesJSX, setQuizzesJSX]=useState(<></>)
  const {user}= useSelector(state=>state.user)
  console.log(user)
  
  const getQuizzes=()=>{

    axios.get("http://localhost:3002/api/quizzes").then(res=>{
      setQuizzesJSX([<option>Select</option>,...res.data?.map(d=><option>{d.id}</option>)])
    }, )
  }
  const clickHandler=()=>{
        axios.get("http://localhost:3002/api/quiz/"+quiz).then(res=>{
          console.log(res.data)
          setQuestions(res.data[0].listOfIDs)
          setStarted(true)
        })
  }

  useEffect(()=>{
    getQuizzes()
  },[])

  console.log(quiz)
  return (<>
    <h1>{"Welcome " + user.name}</h1>
    {started && <Navigate to="/test" state={{quiz: quiz, questions: questions}}/>}
    <Link to= "/addQuestionPage">
        <button>Add a Question</button>
      </Link>
    Select a quiz:
    <select value={quiz} onChange={e=>setQuiz(e.target.value)}>
      {quizzesJSX}
    </select><br/>
    <button onClick={quiz!=="Select"&&clickHandler}>Start test</button>
  </>)
}
