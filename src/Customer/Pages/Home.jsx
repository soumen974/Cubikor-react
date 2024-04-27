import React from 'react'
import Hero from '../Component/Hero'
import ProductCard from '../Component/ProductCard'
import Promotion from "../Component/Promotion";
import Stats from '../Stats';
import CompanyWhoGet from '../Component/CompanyWhoGet';
import Collection from '../Component/Collection';

export default function Home() {
  return (
    <>
    
    <div className=" gap-10">
        
        {[
          <Hero/>,
          <ProductCard/>,
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
