import React from 'react'
import img1 from "./images-app/cube-img-1.jpg";

export default function Section01() {
  return (
    <>
    <section className="section-2">
        <div className="whole-2">
        <div className="whole">
            <div className="lft-sec-2">
                
                <div className="hd-1"><h2>Exploring Cubes with Algorithms with it</h2>
                    <h4>Evaluate Your Technological Problem-Solving Skills</h4>
                </div>
                <a href="#Cubes-new">
                <div className="btn-sec-2">Begin with 3x3 cube</div></a>
            </div>
            <div className="rgt-sec-2"><img src={img1} alt="cube"/></div>

        </div>
        </div>
    </section>
    
    </>
  );
}
