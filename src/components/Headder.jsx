import React from 'react'
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import pagelogo from "../images-app/page-logo.jpg";



export default function Headder() {
  return (
    <>
    <div className='fixed w-full bg-[#ededed] z-50'>
        <header className='flex  justify-between px-10 py-2'>
            <div className="logos flex justify-center align-center  gap-1">
                <img className='w-10 p-1 rounded-[50%]' src={pagelogo} alt="" />
                <h1 className='text-2xl font-bold py-2'  >Cubikor</h1>
            </div>

            <div className="middleui flex justify-between gap-10">
                <div className="searchbar flex gap-2">
                    <input className='rounded-md px-2 w-[24vw] drop-shadow-md text-xl' type="text" placeholder="Search here.." />
                    <button  className='bg-[#3164f4] rounded-md p-2'>
                        
                        <svg
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather-search w-[1.4rem] text-white fill-none"
                        >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>
                <div className="intract flex gap-2">
                    <button>
                            <svg
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-heart w-[1.8rem] text-white fill-[#fd0404]"
                        >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>

                    <button className=''>
                        <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-shopping-bag w-[1.8rem] stroke-[#3164f4] stroke-2 ">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                       </svg>
                    </button>
                </div>
            </div>

            <div className="userentry flex justify-between gap-2 text-xl font-semibold">
                <button className='border hover:border-black p-1 px-4 rounded-md'>login</button>
                <button className=' p-1 px-4 rounded-md text-white bg-[#3164f4]'>signup</button>
                <button className='  pt-2 '>
                    <Helmet>
                    <script src="https://cdn.lordicon.com/ritcuqlt.js" />
                   </Helmet>
                    <lord-icon
                        src="https://cdn.lordicon.com/hbvyhtse.json"
                        trigger="hover"
                        state="hover"
                        className='w-[1.8rem] text-4xl'
                    />
                </button>
            </div>

        </header>

        <nav className='bg-[#f5c000] py-1'>
            <ul className='flex justify-center gap-10 text-[1.2rem] font-extralight '>
                <li> <NavLink to="/"> Home</NavLink></li>
                <li>Cubes</li>
                <li><NavLink to="/Aboutus">About us</NavLink> </li>
                <li> Community</li>
                <li><NavLink to="/Contactus">Contact Us</NavLink></li>
            </ul>

        </nav>
    </div>
    </>
  )
}
