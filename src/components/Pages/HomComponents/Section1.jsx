import React from 'react'
// import HeadImage from "../src/svg/HeadImage.svg";
import HeadImage from "./HeadImage.svg";


export default function Section1() {
  return (
    <div className='h-[100vh]  grid place-content-center'>
     <div className=' flex  justify-around  '>
        <div className="left py-0 flex flex-col gap-11">
            <div className="Tags grid gap-6">
                <h1 className='text-md'>~ New month, new purchase, free delivery!</h1>
                <div className="bigTag w-[30rem] text-[#04f] text-[5.2rem] font-semibold">Find your best Cube</div>
                <div className="smallTag w-[34vw] text-xl">
                A speed cube is a Rubik's Cube that has been specifically designed to be solved faster, with improved corner cutting and smoother turning.
                </div>
            </div>
            <div className="Buttons flex  gap-4">
                <button className='bg-[#ff4b3e] text-white p-4 px-8 rounded-md'>Get your own</button>
                <button className='rounded-md p-4 px-8 border-[1.8px] border-black '>Check out other cubes</button>
            </div>
        </div>
        
        <div className="right  flex">
          <img className='w-max h-max' src={HeadImage} alt="" />
        </div>
     </div>
    </div>
  )
}
