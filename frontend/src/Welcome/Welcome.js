import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../features/users/userSlice'

export default function Welcome() {
  
  return (<>
    <h1>Welcome to testify.</h1>
    <Link to="/register"><button>Register</button></Link><br/>
    Or login if you already have an account.
    <Link to="/login"><button>Login</button></Link>
  </>
  )
}
