import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingLayout from './components/LandingLayout'
import Home from './components/Pages/Home'
import Contactus from './components/Pages/Contactus'
import Aboutus from './components/Pages/Aboutus'
import DevLayout from './Developer/DevLayout';

export default function AppRouting() {
  return (
    <>
      <Router>
        <Routes>
         
          {/* Landing Page */}
          <Route path="/" element={<LandingLayout/> } >

            <Route path="/" element={<Home/>} />
            <Route path="/Contactus" element={<Contactus />} />
            <Route path="/Aboutus" element={<Aboutus/>} />
            
          </Route>

          <Route path="/developer" element={<DevLayout/>} />


        
        </Routes>
      </Router>
    </>
  )
}
