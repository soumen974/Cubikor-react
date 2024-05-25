import React, { useState } from 'react'
import Hero from '../Component/Hero';
import Promotion from "../Component/Promotion";
import Stats from '../Stats';
import CompanyWhoGet from '../Component/CompanyWhoGet';
import Collection from '../Component/Collection';
import NewProduct from '../Component/Product/NewProduct';

export default function Home() {
  const [page, setpage] = useState(false);

  return (
    <>
    
    <div className=" ">
        
        {[
          <Hero/>,
          <NewProduct page={true}/>,
          <Promotion/>,
          <Stats/>,
          <Collection/>,
          <CompanyWhoGet/>,
        ].map((item,index)=>
          (
          <div key={index} className={` mt-32 ${index===2&& "h-screen"} ${index===0&& "mt-6 md:mt-32"}`}>{item}</div>
          ))
        }

    </div>
   
    </>
  )
}
