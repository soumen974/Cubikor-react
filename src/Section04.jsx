import React from 'react'
import img1 from "./images-app/rt-sc-4-img.jpg";
export default function Section04() {
  return (
    <>
    
    <section className="section-4">
        <div className="whole-s4">
            <div className="lft-s4">
                <h4>Costsaver</h4>
                <h2>Experience the unparalleled smoothness and speed of our cutting -edge cubes.</h2>
                Rubik's Cube solving improves problem solving and cognitive ability,promotes patience 
                and stress relief,and builds community ,playing Rubik's cube can offer you a challenging and benificial activity.
               
                <a href="#Cubes-new">
                <div className="btn-s4">
                     {/* <svg className="b-s4-1">
                 
                </svg>  */}
                
                See now

                <svg  className="b-s4-2"
                viewBox="0 -340 1792 1792"
                  >
                  <path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"/>
                </svg>
                    

                
            
                 </div>
                </a>

            </div>
            <div className="rgt-s4">
                <img src={img1} alt=""/>
            </div>
        </div>
    </section>

    </>
  );
}
