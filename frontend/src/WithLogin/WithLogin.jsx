import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/users/userSlice';
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import Home from '../Home/Home';

export default function WithLogin({children, path, postLogin=true}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    let user = JSON.parse(localStorage.getItem("user"))
    useEffect(()=>{
        user && dispatch(setUser(user))
        !user && navigate("/login")
        path === "/login" && user && navigate("/home")
    },[])

        return user ? 
            postLogin ? children : <Home/>
            : 
            postLogin ? <Login/> : children
}
