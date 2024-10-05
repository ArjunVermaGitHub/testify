import React, { useState, useEffect } from 'react'
import axios from 'axios'
import QuizList from './QuizList/QuizList'
import AddQuestionPage from './AddQuestionPage/AddQuestionPage'
import AddQuizPage from './AddQuizPage/AddQuizPage'
import QuestionCard from './QuestionCard/QuestionCard'
import "./Admin.scss"

export default function Admin() {
  const [view, setView] = useState("")
  const [listOfQuestions, setListOfQuestions] = useState("")

  let viewJSX = ""

  useEffect(() => {
    view === "questions" && (async () => setListOfQuestions(await getListOfQuestions()))()
  }, [view])
  const getListOfQuestions = async () => {
    let res = await axios.get("http://localhost:3002/api/questions")
    return res.data.map(dt=><QuestionCard id={dt.id} question={dt.question} options={dt.options}
      correctOptionNo={dt.correctOptionNo}
      category={dt.category}
    />)
    // <pre className='json-view'>{JSON.stringify(res.data, null, 2)}</pre>
  }


  const views = {
    "quizzes": <QuizList></QuizList>,
    "questions": <div className='card-list'>{listOfQuestions}</div>,
    "addQuestion": <AddQuestionPage />,
    "addQuiz": <AddQuizPage />
  }

  return (
    <div>
      <div className="button-holder">
        <button onClick={() => setView("quizzes")}>Get a list of all quizzes</button>
        <button onClick={() => setView("questions")}>Get a list of all questions</button>
        <button onClick={() => setView("addQuestion")}>Add a Question</button>
        <button onClick={() => setView("addQuiz")}>Create a quiz</button>
      </div>
      <div>
        {Object.keys(views).map(k=><div style={{display: k===view ? "block" : "none"}}>
          {views[k]}
        </div>)}
      </div>
    </div>
  )
}
