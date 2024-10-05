import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import { setUser } from '../features/users/userSlice'

export default function ResultPage() {
  const params=useParams()
  const {state} = useLocation()
  const dispatch = useDispatch()
  const {user}= useSelector(state=>state.user)
  
  const uploadScore = (score)=>{
    axios.post("http://localhost:3002/api/score", {value:score, userId: user.id},  {  //get user here from redux
      headers: { 
          'Content-Type' : 'application/json'
      }
    }).then(res=>{
        console.log(res)
      }).catch(err=>console.log(err))
  }

  // const setUserAttemptedObject=(user,attemptedObject)=>{
  //   user={...user, attempted:attemptedObject}
  //   dispatch(setUser(user))

  //   updateUser(user)

  // }

  const addAttemptedListToUser = ()=>{
    axios.put("http://localhost:3002/api/user/"+user.id, {listOfIDs:state.attemptedObject}).then(res=>{
        console.log(res)
      }).catch(err=>console.log(err))
  }

  useEffect(()=>{
    uploadScore(state.score, user.id)
    // addAttemptedListToUser(user, state.attemptedObject)
    addAttemptedListToUser()
  },[])

  console.log(user)
  return (
    <div>Your latest score is {state.score} </div>
  )
}
//Mongo Express React Node