import React from 'react'

export default function footer() {
  return (
    <>
    
    <footer id="footer">
        <hr/>
        <div className='subscribe-us'>
                <h2>Subscribe to get notified  </h2>
                <form>
                    <input type='text' placeholder='Enter Your Mail '/>
                    <button type='submit' >Subscribe Us</button>
                </form>
            </div>
        <div className="ft-whole">
            
            <div className="lft-foot-logo">
                <h2>Cubikor</h2>
                2023 © Cubikor All rights reserved.
                  
            </div>

            <div className="lft-foot-nav">
                <ul>
                    <a href="#" className="foot-nv"> <li>Home</li></a>
                    <a href="#Cubes-new"className="foot-nv"><li>Cubes</li></a>
                     <a href="#"className="foot-nv"><li>About us</li></a>
                     <a href="#comunity"className="foot-nv"><li>Community</li></a>
                     <a href="#footer"className="foot-nv"><li>Contact</li></a>
                </ul>
                

            </div>

            <div className="mid-foot-social">
                <ul>
                    <a href="#" className="mid-foot-social-link"> <li>Facebook</li></a>
                    <a href="#"className="mid-foot-social-link"><li>Instagram</li></a>
                     <a href="#"className="mid-foot-social-link"><li>Twitter</li></a>
                     <a href="#"className="mid-foot-social-link"><li>Linkedin</li></a>
                </ul>

            </div>

            <div className="rgt-foot-toc">
                <ul>
                   <a className="rgt-foot-toc-thing"href="#"> <li>Privacy Policy</li></a>
                   <a className="rgt-foot-toc-thing" href="#"><li>Terms Of Service</li></a>
                </ul>

            </div>

            <div className="rgt-foot-go-up" >
                <a href="#">
                     <div className="up-button">
                        <svg 
                          viewBox="0 0 24 24"
                            stroke="currentColor"
                              stroke-linecap="round" 
                              stroke-linejoin="round"
                               className="feather feather-chevrons-up">
                               <polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline>
                        </svg>
                     </div>
                    </a>
            </div>


        </div>
    </footer>

    </>
  );
}
