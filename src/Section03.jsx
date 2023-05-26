import React from 'react'
import img1 from "./images-app/sec-3-lft-img.jpg";

export default function Section03() {
  return (
    <>
     <section className="section-3">
        <div className="whole-s3">
            <div className="lft-s3"> 
               <img src={img1} alt="rgt-img"/>
            </div>
            <div className="rgt-s3">
                   <h6>SmartSave</h6>
                   <h2>You can easily access a variety of cube options right at your fingertips.</h2>
                   <h5>Experience hassle-free cube buying like never before with our seamless and secure.</h5>
                  <a href="#Cubes-new"><div className="btn-s3">Get yours</div></a> 
            </div>
        </div>
    </section>
    
    </>
  );
}
