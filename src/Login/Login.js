import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import {Navigate} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../features/users/userSlice'


export default function Login() {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    
    const handleSubmit=(e)=>{
        e.preventDefault()        
        axios.post("http://localhost:3002/api/login",
        {
            email:e.target.email.value,
            password:e.target.password.value,
        },
        {
            headers: { 
                'Content-Type' : 'application/json'
            }
        }).then(res=>{
            console.log(res.data)
            dispatch(setUser(res.data))
            localStorage.setItem("user", JSON.stringify(res.data))
            res.data && setMessage("Logged in")
        }).catch(err=>{
            console.error(err)
            setMessage("There was an error in logging in")
        })
    }
    return (
    <>
    {message==="Logged in"?<Navigate to={"/home"}/>:""}
    <form onSubmit={handleSubmit}>
        <h1>Login Page</h1><br/>
        Email: <input id="email"/><br/>
        Password: <input type="password" id="password"/><br/>
        <button type="submit" children="Submit"/>
    </form>
    </>
  )
}
