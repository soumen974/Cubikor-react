import React, { useState } from 'react';
import './App.css';
import './AboutUs.css'
import './ContactUs.css'
import './ResponApp.css'
import './loginPageStyle.css'
import { BrowserRouter } from 'react-router-dom';


import Navbar from "./nav";

export default function App() {

 
  return (
    <div className='body' contentEditable='false'>

      <Navbar/>
      
      
    </div>
  );
}
