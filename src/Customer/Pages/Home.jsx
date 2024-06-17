import React from 'react'
import Hero from '../Component/Hero';
import Promotion from "../Component/Promotion";
import Stats from '../Stats';
import CompanyWhoGet from '../Component/CompanyWhoGet';
import Collection from '../Component/Collection';
import NewProduct from '../Component/Product/NewProduct';

export default function Home() {

  return (
    <>
    
    <div className="grid grid-cols-1 gap-20 ">
        
        {[
          <Hero/>,
          <NewProduct page={true}/>,
          <Promotion/>,
          <Stats/>,
          <Collection/>,
          <CompanyWhoGet/>,
        ].map((item,index)=>
          (
          <div key={index}  className={`${index===(1||2)? "mt-0":"mt-20"} `}>{item}</div>
          ))
        }

    </div>
   
    </>
  )
}
