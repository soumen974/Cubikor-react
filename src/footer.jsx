import React from 'react'
import Facebook from "./svg/facebook.svg";
import Instagram from "./svg/instagram.svg";
import Twitter from "./svg/twitter.svg";
import linkedin from "./svg/linkedin.svg";
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
                    <a href="https://www.facebook.com/" className="mid-foot-social-link"> <li>
                                                                       <svg   viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
                                                                    </li>
                     </a>

                     <a href="https://www.instagram.com/soumen_974/" className="mid-foot-social-link"> <li>
                                                                 <svg className='instagram-icon'   viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                                                    </li>
                     </a>


                    <a href="https://twitter.com/Soumen81845556" className="mid-foot-social-link"> <li>
                                                                 <svg  viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                                                                    </li>
                     </a>

                     <a href="https://www.linkedin.com/in/soumen-bhunia-me-dvp/" className="mid-foot-social-link"> <li>
                                                                 <svg   viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                                                                    </li>
                     </a>


                    
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
