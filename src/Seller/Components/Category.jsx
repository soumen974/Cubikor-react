import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Slider from "react-slick";

import axios from 'axios';
export default function Category() {
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const shopId = localStorage.getItem('ShopId');
    const token = localStorage.getItem('SellerToken');
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/shops/${shopId}/categories`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          const categoriesData = response.data.map(category => ({
            id: category.id,
            name: category.name,
            href: category.href,
          }));
          setCategories(categoriesData);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
  
      fetchCategories();
    }, [shopId, token]);
    
  return (
    <div className='flex pt-5 overflow-hidden '>
        {categories.map(category => (
            <Slider {...settings} key={category.id} value={category.id} className=" w-full  m-2">           
             <div  class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                <div class="flex justify-end px-4 pt-4">
                    <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                        <span class="sr-only">Open dropdown</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                        </svg>
                    </button>

                    <div id="dropdown" class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul class="py-2" aria-labelledby="dropdownButton">
                        <li>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                        </li>
                        </ul>
                    </div>
                </div>

                <div class="flex flex-col items-center pb-10">
                    <h5 class="mb-1 text-xl font-medium text-gray-900 "> {category.name}</h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{category.href}</span>
                    
                </div>
            </div>
        </Slider>
        ))}
    </div>
  )
}
