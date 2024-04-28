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
    
    <div className=" gap-10">
        
        {[
          <Hero/>,
          <NewProduct page={true}/>,
          <Promotion/>,
          <Stats/>,
          <Collection/>,
          <CompanyWhoGet/>
        ].map((item,index)=>
          (
          <div key={index} className={` mt-32 ${index===2&& "h-"}`}>{item}</div>
          ))
        }

    </div>
   
    </>
  )
}
