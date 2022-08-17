import axios from 'axios'
import React from 'react'
import { useState } from 'react'

export default function AddQuestionPage() {
    const [numberOfOptions, setNumberOfOptions] = useState(0)
    const [message, setMessage] = useState('')
    let inputsJsx=[]
    for(let i=0;i<numberOfOptions;i++){
        inputsJsx.push(<>
            Option {i+1}<input type="text" id={"qOption"+i}></input>
        <br/></>)
    }
    const handleSubmit=(e)=>{
        console.log(e.target.qId.value)
        e.preventDefault()
        let options=[]
        for(let i in inputsJsx){
            options.push(e.target["qOption"+i].value)
        }
        axios.post("http://localhost:3002/api/question",
        {
            id:e.target.qId.value,
            question:e.target.qQuestion.value,
            options:options,
            correctOptionNo: e.target.qCorrectOptionNo.value,
            category:e.target.qCategory.value.toLowerCase()
        },
        {
            headers: { 
                'Content-Type' : 'application/json'
            }
        }).then(res=>{
            res.data && setMessage("Successfully added question")
        }).catch(err=>{
            setMessage("There was an error in submitting the question")
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                ID:<input type="text" id="qId"></input><br/>
                Question:<input type="text" id="qQuestion"></input><br/>
                Number of options:<input type="number" value={numberOfOptions} onChange={e=>setNumberOfOptions(e.target.value)}></input><br/>
                {numberOfOptions>0 && inputsJsx}<br/>
                Correct Option Number:<input type="number" id="qCorrectOptionNo"></input><br/>
                Category:<input type="text" id="qCategory"/><br/>
                <button type="submit">Submit</button><br/>
                {message}
            </form>
        </div>
    )
}
