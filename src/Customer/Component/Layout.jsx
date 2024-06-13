import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from "./Navigation/Navigation";
import Footer from './Footer';
import PageLoder from '../../Loaders/PageLoder';


export default function Layout() {
  return (
    <>
     <Navigation/>
     <div className=" mx-auto max-w-screen py-20 px-2 md:px-[12vw]  ">
          <Outlet />

          <button className=" bg-gray-200 rounded-full  animate-bounce w-fit p-2">
            <svg class="w-6 h-6 text-violet-500 rotate-180" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
          </button>
          <PageLoder/>
      </div> 
      
      <Footer/>
    </>
  )
}
