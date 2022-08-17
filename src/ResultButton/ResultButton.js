import React from 'react'
import {Link} from "react-router-dom"

export default function ResultButton(props) {
    console.log(props)

  return (
    <Link to= "/resultpage" state= {props}>
      <button>Result</button>
    </Link>
    )  
}