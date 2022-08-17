import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (<>
    <div>Welcome to testify.</div>
    <Link to="/register"><button>Register</button></Link><br/>
    Or login if you already have an account.
    <Link to="/login"><button>Login</button></Link>
  </>
  )
}
