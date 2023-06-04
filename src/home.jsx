import React, { useState } from 'react';
import ToprightImg from './images-app/hm-rt-img.jpg'
export default function home() {
  return (

<section className="section-1" id="home">

         
         <div className="home-things">
             <div className="hm-lft">
 
                 <div className="a-2">
 
                     <div className="a-1"> ~ New month, new purchase, free delivery!</div>
                     <h1>Find your best Cube</h1>
                 </div>
                 <div className="a-3">A speed cube is a Rubik's Cube that has been specifically designed to be solved faster, with improved corner cutting and smoother turning.
                 </div>
 
                 <div className="see-btn">
                   
                     <a href="#Cubes-new" ><div className="bt-1">Get your own</div></a>
                    <a href="#Cubes-bestsells"><div className="bt-2">Check out other cubes</div></a> 
                 </div>
             </div>
 
             <div className="hm-rgt">
                
 
                 <div className="right-img">
                   <img src={ToprightImg} />
                 </div>
             </div>
             
         </div>
 
         <div className="get-cupon">
             <a href="#" className="cupon"> <h5>Get20% Off</h5></a> 
             <div className='coupon-code'>soB17ChD <div className='copy-code'>copy</div></div>
          </div>
        
         
 
          
         
        
         
</section>  )
}
