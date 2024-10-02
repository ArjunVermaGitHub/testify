import React, {useState, useEffect } from 'react'
import Question from '../Question/Question'
import ResultButton from '../ResultButton/ResultButton'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router'
import './Test.scss'

export default function Test(props) {
    const {state} = useLocation()
    const navigate = useNavigate()
    const [mode,setMode] = useState("none")
    const [score, setScore]=useState(0)
    const [i, setI]=useState(0)
    const [attemptedObject, setAttemptedObject]=useState({})
    // if(mode==="none") 
    let [questionsArray, setQuestionsArray]=useState([])
    
    const getQuestions=(questions=[])=>{
        axios.get("http://localhost:3002/api/questions", {params:{questions}}, {
            headers: { 
                'Content-Type' : 'application/json'
            }
        }).then(res=>{
            console.log(res)
            setQuestionsArray(res.data)
        }).catch(err=>console.log(err))
    }
    
    useEffect(()=>{
        getQuestions(state.questions)
    },[])
    
    useEffect(()=>{
        console.log("Score changed to "+score)
    },[score])
    
    let questionsJSX=questionsArray?.map((question, index)=>
        <Question 
            number={index+1}
            q={question.question} 
            q_id={question.id} 
            options={question.options}
            correctOptionNo={question.correctOptionNo}  
            score={score}
            setScore={setScore}
            shouldShow={i===index}
            attemptedObject={attemptedObject}
            setAttemptedObject={setAttemptedObject}
        />
    )
    return ( 
            <div>
                <div className='quiz-header'>
                        <h1>{state.quiz}</h1>
                    <div className='quiz-header-actions'>
                        <button onClick={()=>{
                            navigate("/")
                        }}>Exit quiz</button>
                    </div>
                </div>
                <div className='button-holder'>
                {
                    mode==="none"?(<><button onClick={()=>setMode("questions")}>15 questions</button>
                    <button onClick={()=>setMode("minutes")}>15 minutes</button></>) : ""
                }
                </div>
                {(mode==="questions") &&
                    <>
                        {questionsJSX}
                        {i-1>=0 &&
                            <button onClick={()=>setI(i-1)}>Previous</button>
                        }
                        {i+1<questionsArray.length &&
                            <button onClick={()=>setI(i+1)}>Next</button>
                        }
                        {i==(questionsArray.length-1)  &&
                            <ResultButton score={score} quiz={state.quiz} attemptedObject={attemptedObject}/>
                        }
                    </>}
                    
                {(mode==="minutes")?<div>15 minutes</div> : "" }
            </div>
    )
}
