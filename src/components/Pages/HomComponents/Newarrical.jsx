import React from 'react'
import NewArriveCubeData from "./Jsons-data/cube.json"
import Star from './Star'

export default function Newarrical() {
  return (
    <>
       <div className='h-[100vh] grid   '>
        <div className=''>
            <header className='text-3xl font-semibold '>NEW ARRIVALS</header>

            <div className="cubes pt-[5rem] grid gap-10 sm:justify-between w-full" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))' }}>            
                  {NewArriveCubeData.map((NewArriveCubeData, index) => (
                    
                    <div key={index} className='  w-fit rounded-md gap-0 grid  '>
                       <h3 className='mb-[-2rem] mr-[2rem] z-10 bg-[#04f06a]  w-fit h-fit p-1 px-2' >{NewArriveCubeData.cubeTage}</h3>
                       <img className='rounded-md z-0 shadow-md ' src={NewArriveCubeData.imgSrc} alt="cube imag" />
                       <div className='bg-white shadow-md p-2 px-3  rounded-md grid gap-2'>
                          <h3 className='text-[#04f] text-[13px] underline underline-offset-1  hover:no-underline w-full '>{NewArriveCubeData.CubeCaption}</h3>
                          <div className='flex justify-between'>
                              <h3 className='bg-[#ff4b3e] w-fit h-fit text-white px-2'>{NewArriveCubeData.CubePrice}</h3>
                              <h3 className='line-through text-gray-400'>{NewArriveCubeData.CubeCutPrice}</h3>
                              <h3 className='border border-[#ff4b3e] text-[14px] w-fit h-fit text-[#ff4b3e] px-1 rounded-sm'>{NewArriveCubeData.CubeDiscount}</h3>
                          </div>
                          <Star/>
                          <h3 className='text-[#04f06a]'>&#8226; {NewArriveCubeData.StockUpdate}</h3>
                       </div>
                    </div>
                  ))}            
            </div>
        </div>
      </div>
    </>
  )
}


