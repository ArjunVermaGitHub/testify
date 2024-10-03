import React from 'react'
import WithLogin from '../WithLogin/WithLogin'

export default function RouteMapper({children}) {
  return (
    children.map(route=><WithLogin>{route}</WithLogin>)
  )
}
