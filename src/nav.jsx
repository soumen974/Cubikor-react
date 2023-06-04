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
import ContactUs from "./ContactUs";
import LoginPage from './LoginPage';
import ATry from './aTry';  

export default function Nav() {
  const inlineStyleSVG = { listStyle: 'none' };
  const [useMyaccnt, setUseMyaccnt] = useState(false);
  const [useMyAbotUs, setuseMyAbotUs] = useState(false);
  const [useFullBody, setuseFullBody] = useState(true);
  const [useContactUs, setuseContactUs] = useState(false);
  const [useLoginShow, setuseLoginShow] = useState(false);
  const [useSignUpShow, setuseSignUpShow] = useState(false);



  function MyAccountSVG() {
    setUseMyaccnt(true);
  }

  function ShowAbotUs(){
    setuseMyAbotUs(true);
    setuseFullBody(false);
    setuseLoginShow(false);
    setuseContactUs(false);

  }
  function ShowContactUs(){
    setuseMyAbotUs(false);
    setuseContactUs(true);
    setuseFullBody(false);
    setuseLoginShow(false);

  }
  function LoginShow(){
    setuseLoginShow(true);
  }
  function SignUpShow(){
    setuseLoginShow(false);
    setuseSignUpShow(true);
  }

  
  function handleOutsideClick(event) {
    if (event.target.classList.contains('clk-on')) {
      setuseMyAbotUs(false);
      setuseFullBody(true);
      setuseContactUs(false);
      setuseLoginShow(false);

    }
  }

  function CutShowLog(event){
      setuseLoginShow(false);

  }

  return (
    <div>
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
            <a >
              <div className="log" onClick={LoginShow}>
                <h4>Log in</h4>
              </div>
            </a>

            <a >
              <div className="sign" onClick={SignUpShow}>
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
              <a href="#" className="op" onClick={ShowContactUs}>
                <li >Contact Us</li>
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

     

        {/* this is for login page showing  */}

        {
          useLoginShow && 
          <>
          <LoginPage/>

          
          <div className='cut-show' onClick={CutShowLog}>
              <svg   x="0" y="0" version="1.1" viewBox="0 0 29 29" ><path d="M14.637 27.065a12.457 12.457 0 0 1-8.838-3.655c-4.874-4.874-4.874-12.804 0-17.678a12.419 12.419 0 0 1 8.839-3.662c3.339 0 6.478 1.3 8.838 3.662 2.361 2.361 3.662 5.5 3.662 8.839s-1.3 6.478-3.662 8.839a12.46 12.46 0 0 1-8.839 3.655zm.001-22.995a10.428 10.428 0 0 0-7.425 3.076c-1.983 1.983-3.075 4.62-3.075 7.425s1.092 5.441 3.075 7.425c4.094 4.094 10.756 4.095 14.849 0 1.983-1.983 3.076-4.62 3.076-7.425s-1.092-5.441-3.076-7.425a10.432 10.432 0 0 0-7.424-3.076z"></path><path d="M10.395 19.813a.999.999 0 0 1-.707-1.707l8.485-8.485a.999.999 0 1 1 1.414 1.414l-8.485 8.485a.993.993 0 0 1-.707.293z"></path><path d="M18.88 19.813a.997.997 0 0 1-.707-.293l-8.485-8.485a.999.999 0 1 1 1.414-1.414l8.485 8.485a.999.999 0 0 1-.707 1.707z"></path></svg>
       </div>
          </>
        }




                {/*this is to show only about us page*/}
                {
          useMyAbotUs &&
          <AboutUs/>

        }



         {/* this is for only showing the contact us page */}
      {
          useContactUs &&
          <ContactUs/>
        }
        

      
      {/* this is for full home page */}
      {
        useFullBody &&
        <>

       <Section1/>
       {/* <ATry/> */}
      <Cubes/>
      {/* <CubesBestseller/> */}
      <Section02/>
      <Section03/>
      <Section04/>
      <Section05/>
      <Section06/> 
      
        </>

      }     



      
      <Footer/>
      
    </div>
  );
}
