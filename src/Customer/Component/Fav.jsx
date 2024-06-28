import React from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import axios from 'axios';

export default function Fav({prdId,prdName,prdImage_src,prdPrice}) {

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  // add to favorite

  const addToFavorite = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`http://localhost:5000/favorite/${userId}`,
        {
          product_id: prdId,
          product_name: prdName,
          image_src: prdImage_src,
          price: prdPrice,
        },{

          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      // res.status(400).json({ message: 'This product is already in the favorites' });
      
      if(response.status === 200){
        console.log('Added to favorite:', response.data);
      }
      

    }catch(error){
      console.error('Error adding to favorite:', error.response.data);
    }

  }


  return (
    <>
        <form onSubmit={addToFavorite} className="flex z-50 ">
          <button type="submit" className=" text-transparent">
            <span className="sr-only">Favorite</span>
            <HeartIcon className="h-7 w-7 rounded-full fill-indigo-400" aria-hidden="true" />
          </button>
        </form>
    </>
  )
}
