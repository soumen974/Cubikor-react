import React, { useState } from 'react';
import './App.css';
import './AboutUs.css'
import './ContactUs.css'
import './ResponApp.css'
import './loginPageStyle.css'
import { Route,Switch } from 'react-router-dom';

import Navbar from "./nav";
import LoginPage from './LoginPage';

export default function App() {

 
  return (
    <>

    
    <div className='body'>

      <Navbar/>
      
      
    </div>

              {/* <Switch>
                
                <Route path="/loginPage" component={LoginPage} />
               
            </Switch> */}
    </>
  );
}
