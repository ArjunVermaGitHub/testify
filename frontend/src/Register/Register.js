import React from 'react'
import axios from 'axios'
import { useState } from 'react'

export default function Register() {
    const [message, setMessage] = useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()        
        axios.post("http://localhost:3002/api/register",
        {
            name:e.target.name.value,
            email:e.target.email.value,
            password:e.target.password.value,
        },
        {
            headers: { 
                'Content-Type' : 'application/json'
            }
        }).then(res=>{
            console.log(res.data)
            res.data && setMessage("Successfully registered")
        }).catch(err=>{
            setMessage("There was an error in registration")
        })
    }
    return (
    <>
    <form onSubmit={handleSubmit}>
        <h1>Register Page:</h1><br/>
        Select a username: <input id="name"/><br/>
        Email: <input id="email"/><br/>
        Select a password: <input type="password" id="password"/><br/>
        <button type="submit" children="Submit"/>
    </form>
    {message}
    </>
  )
}
