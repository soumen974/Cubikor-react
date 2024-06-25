import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Head from './Components/Head'



export default function LayoutSeller() {
  const shopId = localStorage.getItem('ShopId');
  const Navigate=useNavigate();
useEffect(() => {
 if(!shopId){
  Navigate('/seller/Login')
 }
}, [shopId])

  return (
    <>
     <Head/>
      <div className="p-4  pt-20 sm:ml-64">
        <div className="p-0">
        <Outlet />
        </div>
      </div>
      
      
    </>
  )
}
