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
          <div key={index} className={` mt-20`}>{item}</div>
          ))
        }

    </div>
   
    </>
  )
}
