import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from "./Navigation/Navigation";
import Footer from './Footer';


export default function Layout() {
  return (
    <>
     <Navigation/>
     <div className="mx-auto max-w-screen p-10 px-[12vw]   ">
          <Outlet />
      </div> 
      <Footer/>
    </>
  )
}
