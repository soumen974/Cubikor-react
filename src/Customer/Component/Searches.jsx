import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PageLoder from '../../Loaders/PageLoder';
import { Link } from 'react-router-dom';
import Favorite from "../Component/Fav";




export default function Searches() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q');

  const [productIds, setProductIds] = useState([]);
  const [error, setError] = useState('');
  const [isloading, setisloading] = useState(false)
  const token = localStorage.getItem('token');


  const handleSearch = async () => {
    setisloading(true);
    
   
    try {
      const response = await axios.get(`http://localhost:5000/products?q=${searchTerm}`);
      setProductIds(response.data); // Assuming response.data is an array of product IDs
      fetchCategories();
      setError(false)
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setError(error.response.data.message);
        } else {
          setError(`Error fetching products: ${error.response.data.message}`);
        }
      } else {
        setError('Error fetching products');
      }
      setisloading(false);
    }
  };

  useEffect(() => {handleSearch()}, [searchTerm]);


    // get the products from ids 
   
    const [productdata, setProductdata] = useState([]);
  
   
      const fetchCategories = async () => {
          try {
              if (Array.isArray(productIds) && productIds.length > 0) {
                  const responses = await Promise.all(productIds.map(id => 
                      fetch(`http://localhost:5000/products/${id}`, {
                          method: 'GET',
                          headers: {
                              'Authorization': `Bearer ${token}`
                          }
                      })
                  ));
  
                  const productsDataArray = await Promise.all(responses.map(async (response) => {
                      if (response.ok) {
                          return response.json();
                      } else {
                          const errorData = await response.json();
                          setError("Error retrieving product:", errorData);
                          return null;
                      }
                  }));
  
                  const validData = productsDataArray.filter(data => data !== null);
                  setisloading(false);
                  setProductdata(validData);
              }
          } catch (error) {
            setError('An error occurred, please try again later:', error);
            setisloading(false);
          }
      };
  return (
    <div>Searches: {searchTerm}
    <div className="">
        {isloading && 
        <li className="flex items-center truncate justify-center p-4" id="headlessui-combobox-option-:rp:" role="option" tabindex="-1" aria-selected="false" data-headlessui-state="">
            <span className="whitespace-nowrap font-semibold truncate flex justify-center "> <h1><PageLoder/></h1></span>
        </li> }

        {error}
       

{productdata.map((product) => (
          <div  key={product.id} className="slider-item">
            <div
              onClick={() => {
                
                
              }}
              className="group cursor-pointer group  bg-gray-100 hover:bg-indigo-500 transition duration-500 px-2 py-2  rounded-lg relative"
            >  
            
              <div className="p-2 absolute hidden group-hover:block  top-3 z-40 text-gray-200 group hover:text-indigo-500">
                <span className="sr-only">Favorite</span>
                <Favorite prdId={product.id} prdName={product.name} prdImage_src={product.product_image} prdPrice={product.price}/>
              </div>
              
              <div className="aspect-w-1 relative aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:w-[14rem] lg:h-[17rem]">
                 <Link to={`/productview/${window.btoa(product.id*721426)}`}>
                <img
                  src={`http://localhost:5000/${product.product_image}`}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover object-center lg:w-full lg:h-full transition-transform duration-500 group-hover:scale-105 rounded-sm"
                />
                </Link>
               
                
              </div>

              <div className="mt-4   justify-between">
                  <div className="  " >
                    <p className="text-sm md:w-[14rem] truncate overflow-hidden group-hover:text-white text-gray-700 w-full ">
                    {product.name}
                    </p>
                
                    <p className="mt-1 py-1 text-sm group-hover:text-yellow-300 text-gray-500">
                      {product.color}
                    </p>
                  </div>
                <p className="text-sm w-fit px-4 py-2 font-medium bg-yellow-400 rounded-md text-gray-900">
                ₹{parseFloat(product.price)}
                </p>
              </div>
            </div>
          </div>
        ))}

    </div>
    
    </div>
  )
}
