import React, { useState ,useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from "./Navigation/Navigation";
import Footer from './Footer';


export default function Layout() {

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
      const handleScroll = () => {
          if (window.scrollY >= 500) { // Adjust the value as needed
              setShowButton(true);
          } else {
              setShowButton(false);
          }
      };

      window.addEventListener('scroll', handleScroll);

      // Cleanup the event listener on component unmount
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);
  return (
    <>
     <Navigation/>
      <div className="relative mx-auto max-w-screen py-20 px-2 md:px-[12vw]  ">
          <Outlet />
      </div>
     
      <div className="relative rounded-xl mx-auto max-w-screen py-0 px-0 lg:py-12 lg:px-[12vw]  ">
      <Footer/>
      </div>
      <abbr title='Scroll to Top' className={` fixed top-[25rem] lg:top-[30rem] ${showButton? "opacity-100 " :" opacity-0 invisible "} xl:-right-12 right-0 mx-auto max-w-screen py-20 px-2 md:px-[12vw]`}>
        <button   onClick={()=>{window.scrollTo({top: 0, behavior: 'smooth'})}} className=" group shadow-md hover:shadow-indigo-300 bg-gray-200 rounded-full  animate-bounce w-fit p-2">
                <svg className="w-6 h-6 text-violet-500  rotate-180" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
          </button>
      </abbr> 
    </>
  )
}
