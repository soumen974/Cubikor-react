import React from 'react'
import { Outlet } from 'react-router-dom'
import Head from './Components/Head'



export default function LayoutSeller() {
  return (
    <>
     <Head/>
      <div className="p-4  pt-20 sm:ml-64">
        <div className="p-0">
        <Outlet />
        </div>
      </div>
      
      
    </>
  )
}
