import React from 'react'
import { Outlet } from 'react-router-dom'
import Head from './Components/Head'



export default function LayoutSeller() {
  return (
    <>
     <Head/>
     <div className="mx-auto max-w-screen py-10 px-2 md:px-[12vw]   ">
          <Outlet />
      </div> 
      
    </>
  )
}
