import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './Quiz.scss'
export default function Quiz({quiz}) {
    
    const [questionsList, setQuestionsList] = useState("")
    const getQuestionsListOfQuiz = (quiz) => {
        axios.get("http://localhost:3002/api/quiz/"+quiz,
            {headers: { 
                'Content-Type' : 'application/json'
            }}).then(res=>{
            getQuestions(res.data[0].listOfIDs)
        })
    }

    const getQuestions=(questions=[])=>{
        axios.get("http://localhost:3002/api/questions", {params:{questions}}, {
            headers: { 
                'Content-Type' : 'application/json'
            }
        }).then(res=>{
            console.log({res})
            let relevantJSON = res.data.map(d=>{
                let {_id, __v, ...rest} = d
                return rest
            })
            setQuestionsList(JSON.stringify(relevantJSON, null, 2))
        }).catch(err=>console.log(err))
    }

    useEffect(()=>{
        getQuestionsListOfQuiz(quiz)
    },[quiz])
  return (
    <>
        <div>Quiz</div>
        <pre className='json-view'>
            {questionsList}
        </pre>
        {/* {questions?.map(q=>q?.heading)}
        {questions?.map(q=>q?.description)} */}

    </>
  )
}
