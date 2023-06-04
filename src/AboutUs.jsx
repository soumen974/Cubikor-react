import  React from 'react';

import  img1 from "./images-app/front-about-image.png";
import  img2 from "./images-app/favi-icon-logo.png";
import  img3 from "./images-app/my-img-yllo.png";
import  img4 from "./images-app/souvahya-yllo-img.png";
import  img5 from "./images-app/ritesh-yello-img.png";


export default function AboutUs() {
  return (

   <>
document.title = 'Redirected Page';
<section className="abt-section-1">
        <div className="abt-sec-1-back">
            <div className="abt-article">
                <h2>About us</h2>
                <h5>Welcome to Cubikor! We're dedicated to providing you with the best selection of cubes and accessories. Our team is passionate about all things cube-related, and we're always here to help. Shop with us today and experience the Cube E-commerce difference!</h5>
                <div className="abt-front-image">
                    <img src={img1} alt=""/>
                </div>
                <h2>Our mission</h2>
                <h5>At Cube E-commerce, our mission is to make the world of cubes accessible to everyone, from beginners to experts. We strive to provide high-quality products at affordable prices, while also offering exceptional customer service. We believe that anyone can learn to solve a cube with the right resources and guidance, and we're committed to helping our customers achieve their cube-related goals. Join us on this journey and let's cube together!</h5>
                <hr/>
            </div>
        </div>
    </section>

    <section className="abt-section-2">
        <div className="abt-white-back">
            <div className="abt-sec-2-back">
                <h2>Let's start working more efficiently with us!</h2>
                
                
                <img src={img2} alt=""/>
            </div>
            <button type='submit'>Join us </button>

        </div>
        
    </section>

    <section className="abt-team">
        <div className="abt-team-back">
            <h1>Team</h1>
            <h6>Meet the people behind our project</h6>
            <div className="abt-images">
                <div className="abt-img-with-details">
                    <img src={img3} alt=""/>
                    <h4>Soumen Bhunia</h4>
                    <h5>UI/UX designer</h5>
                    <h5>Full stack developer</h5>
                    <h5> Product Designer </h5>
                    
                </div>

                <div className="abt-img-with-details">
                    <img src={img4} alt=""/>
                    <h4>Souvagya R Dash</h4>
                    <h5>UI/UX designer</h5>
  
                   
                </div>

                <div className="abt-img-with-details">
                    <img src={img5} alt=""/>
                    <h4>Ritesh Das</h4>
                    <h5>UI/UX designer</h5>
                </div>
                {/* <div className="abt-img-with-details">
                    <img src="subash-yllo-img.png" alt=""/>
                    <h4>Subhash Mahato</h4>
                    <h6></h6>
                </div> */}

                
                
            </div>
        </div>
    </section>

    </>
  );
}
