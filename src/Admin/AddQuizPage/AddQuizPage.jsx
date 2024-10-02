import axios from 'axios'
import React from 'react'
import { useState } from 'react'

export default function AddQuestionPage() {
    const [numberOfQuestions, setNumberOfQuestions] = useState(0)
    const [message, setMessage] = useState('')
    let inputsJsx=[]
    for(let i=0;i<numberOfQuestions;i++){
        inputsJsx.push(<>
            Option {i+1}<input type="text" id={"quizID"+i}></input>
        <br/></>)
    }
    const handleSubmit=e=>{
        e.preventDefault()
        let IDs=[]
        for(let i in inputsJsx){
            IDs.push(e.target["quizID"+i].value)
        }
        let keys = (Array.from(e.target.querySelectorAll("input")).map(i=>i.id)), payload = {}
        for(let key of keys){
            if(key==='listOfIDs'){
                payload[key]=e.target[key].value.split(",")
            }
            else
                payload[key] = e.target[key].value
        }
        axios.post("http://localhost:3002/api/quiz", payload, {
            headers: { 
                'Content-Type' : 'application/json'
            }
        }).then(res=>{
            res.data && setMessage("Successfully added quiz")
        }).catch(err=>{
            console.error(err)
            setMessage("There was an error in submitting the question")
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                ID:<input type="text" id="id"></input><br/>
                Heading:<input type="text" id="heading"/><br/>
                Description:<input id="description"></input><br/>
                Number of questions:<input type="number" id="numberOfQuestions" onChange={e=>setNumberOfQuestions(e)}></input><br/>
                List of IDs (comma separated): <input type="text" id="listOfIDs"/><br/>
                <button type="submit">Submit</button><br/>
                {message}
            </form>
        </div>
    )
}
