import React from 'react'
import Headder from './Headder'
import { Outlet } from 'react-router-dom'
import '../App.css'

export default function LandingLayout() {
  return (
    <>
      <Headder/>
      <div className="mx-auto max-w-screen p-10 px-[12vw]   ">
          <Outlet />
      </div>    
    </>
  )
}
