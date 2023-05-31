import React from 'react'
import CubeTower from "./images-app/cubes-tow.png";

export default function ContactUs() {
  return (
    <div className='whole-ContactUs'>
        <div className='whole-top-upper-CntUs'>
            <div className='back-upper-CntUs'>
                <div className='main-content-CntUs'>
                    <div className='cube-tower-img'><img src={CubeTower}/></div>
                    <div className='contactingUs-details'>
                        <h1>Contact Us</h1>
                        <h5>Come along with us to investigate the Smoothest Cubes. Your input is highly valued.</h5>
                        <form className='form'>
                            <label >Name</label>
                            <br/>
                            <input type='text/name'placeholder='Full Name'/>
                            <br/>
                            <label >Email</label>
                            <br/>
                            <input type='text/Email'placeholder='Email address'/>
                            <br/>
                            <label >Message</label>
                            <br/>
                            <textarea type=''placeholder='How can we get better?'/>
                            <br/>
                            <button type='submit'>Send message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>

  );
}
