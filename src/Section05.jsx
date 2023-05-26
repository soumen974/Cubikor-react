import React from 'react'
import img1 from "./images-app/cube-pyr-img-s5.jpg";


export default function Section05() {


  return (
    <>
    
    <section id="comunity"className="section-5">
        <div className="whole-s5-1">
            <div className="whole-s5-2">
                <div className="lft-s5">
                    <img src={img1} alt=""/>
                    <h2>How to join our community</h2>
                    <h3>Welcome to the Cubikor! Our mission is to help you find the perfect cube for your needs and connect you with the Cube Community. 
                    </h3>
                    With just three simple steps, you'll be well on your way to <br/> becoming a part of our community of cube enthusiasts.
                    <a href="signup_page.html"><div className="btn-s5">Sign up now</div></a>
                </div>
                <div className="rgt-s5">
                    <div className="st-1">
                        <h2>Step 1</h2>
                        <h4>Explore our Cube Collection,and buy one .</h4>
                        <hr/>
                    </div>

                    <div className="st-1">
                        <h2>Step 2</h2>
                        <h4>Join the Cube Community</h4>
                        <hr/>
                    </div>
                    <div className="st-1">
                        <h2>Step 3</h2>
                        <h4>Enjoy Your Cube with our community</h4>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>

    </>
  );
}
