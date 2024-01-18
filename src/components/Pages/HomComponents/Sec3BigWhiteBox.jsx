import React from 'react'

import CubeImg from "../..//../images-app/cube-img-1.jpg"
export default function Sec3BigWhiteBox() {
  return (
    <>
      
      <div className='h-[100vh]  grid place-content-center'>
        <div className='bg-white p-10 w-[80vw] flex justify-end gap-5'>
            <div className="left">
                <header>Exploring Cubes with Algorithms with it</header>
                <div className="smltg">Evaluate Your Technological Problem-Solving Skills</div>
                <button>Begin with 3x3 cube</button>
            </div>
            <div className="img">
                <img className='h-[20rem] rounded-full' src={CubeImg} alt="" />
            </div>
        </div>
      </div>
      
    
    </>
  )
}
