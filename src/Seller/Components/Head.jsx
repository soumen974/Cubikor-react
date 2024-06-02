import React, { useState } from 'react'
import pagelogo from "../../Customer/Component/Data/images-app/page-logo.jpg";
import { useNavigate } from 'react-router-dom';
import DialogBox from '../../Customer/DialogBox';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import SideBar from './SideBar';
import { useStepContext } from '@mui/material';


export default function Head() {
 
 const [sideBar, setsideBar] = useState(true);
      
  return (
    <>
        <SideBar  isSidebarOpen={sideBar} setIsSidebarOpen={setsideBar}/>
       
        <div class=" sm:ml-64">
          <div className="">
           <div className=" pl-4 bg-white fixed w-full z-40 ">
            
            <nav aria-label="Top" className="  ">
            
              <div className="flex border-b border-gray-200 h-16 items-center">
                
                <button
                    type="button"
                    className="relative rounded-md bg-white p-2 text-gray-400 sm:hidden"
                    onClick={() => setsideBar(!sideBar)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>

                {/* Logo */}
                <div className="ml-4  flex lg:ml-0">
                  <a href="/" className='flex justify-center items-center gap-3 '>
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto rounded-full"
                      src={pagelogo}
                      alt=""
                    />
                  
                  <h1 className='font-semibold text-xl'>CUBIKOR -seller</h1>

                  </a>
                </div>

               

               
              </div>
            
           </nav>
            
           </div>
          </div>
      </div>
       


       

    </>
  )
}
