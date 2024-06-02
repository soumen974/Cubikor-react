import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from "./Navigation/Navigation";
import Footer from './Footer';


export default function Layout() {
  return (
    <>
     <Navigation/>
     <div className=" mx-auto max-w-screen py-20 px-2 md:px-[12vw]  ">
          <Outlet />
      </div> 
      <Footer/>
    </>
  )
}
