import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import logoCube from './images-app/page-logo.jpg';
import Section1 from "./home";
import Cubes from "./CubeNew";
import CubesBestseller from "./CubeBestSell";
import Section02 from "./Section02";
import Section03 from "./Section03";
import Section04 from './Section04';
import Section05 from "./Section05";
import Section06 from "./Section06";
import Footer from "./footer";
import AboutUs from "./AboutUs";

export default function Nav() {
  const inlineStyleSVG = { listStyle: 'none' };
  const [useMyaccnt, setUseMyaccnt] = useState(false);
  const [useMyAbotUs, setuseMyAbotUs] = useState(false);
  const [useFullBody, setuseFullBody] = useState(true);
  


  function MyAccountSVG() {
    setUseMyaccnt(true);
  }

  function ShowAbotUs(){
    setuseMyAbotUs(true);
    setuseFullBody(false);
  }

  
  function handleOutsideClick(event) {
    if (event.target.classList.contains('clk-on')) {
      setuseMyAbotUs(false);
      setuseFullBody(true);
    }
  }

  return (
    <>
      <nav>
        <div className="menu">
          <a href="#">
            <div className="logo">
              <img src={logoCube} alt="page-logo" />
              <h2>Cubikor</h2>
            </div>
          </a>
          <div className="search">
            <form className="sec-br" action="#">
              <input type="text" placeholder="Search here.." />
              <button type="submit">
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather-search"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>
            <a href="#" className="op-love">
              <li className='clk-on' onClick={handleOutsideClick} style={inlineStyleSVG}>
                <svg
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-heart"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </li>
            </a>
            <a href="#" className="op-bag">
              <li className='clk-on' onClick={handleOutsideClick} style={inlineStyleSVG}>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-shopping-bag"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </li>
            </a>
          </div>

          <div className="entry">
            <a href="#">
              <div className="log">
                <h4>Log in</h4>
              </div>
            </a>

            <a href="#">
              <div className="sign">
                <h4>Sign up</h4>
              </div>
            </a>

            <div className="my-account" onClick={MyAccountSVG}>
              <Helmet>
                <script src="https://cdn.lordicon.com/ritcuqlt.js" />
              </Helmet>
              <lord-icon
                src="https://cdn.lordicon.com/hbvyhtse.json"
                trigger="hover"
                state="hover"
              />
            </div>
            

            
          </div>
        </div>
        <div className="link-bar">
          <div className="links-2">
            <ul>
              <a href="#" className="op">
                <li className='clk-on' onClick={handleOutsideClick}>Home</li>
              </a>
              <a href="#Cubes-new" className="op">
                <li className='clk-on' onClick={handleOutsideClick}>Cubes</li>
              </a>
              <a href="#" className="op" onClick={ShowAbotUs}>
                <li>About us</li>
              </a>
              <a href="#comunity" className="op">
                <li className='clk-on' onClick={handleOutsideClick}>Community</li>
              </a>
              <a href="#footer" className="op">
                <li >Contact</li>
              </a>
            </ul>
          </div>
        </div>
        
        {/* {useMyaccnt && 
        <>
                  <div className='corn-box-accnt-top'><br/></div>

        <div className='hover-account-show'>

          
          <div className='profile-box'>Profile</div>
          <div className='order-box'>Order</div>
          <div className='notification-box'>Notification</div>
          <div className='FAQ-box'>FAQ</div>
          <div className='Log-out-box'>Logout</div>
          
        </div>
        </>
        } */}

       
        

       
      </nav>

      {
        useFullBody &&
        <>

       <Section1/>
      <Cubes/>
      <CubesBestseller/>
      <Section02/>
      <Section03/>
      <Section04/>
      <Section05/>
      <Section06/> 
      
        </>


      }

      
     
      {
          useMyAbotUs &&
          <AboutUs/>

        }

      <Footer/>
      
    </>
  );
}
