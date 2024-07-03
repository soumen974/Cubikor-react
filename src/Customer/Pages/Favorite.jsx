import React, { useState,useEffect } from 'react';
import axios from 'axios';
import ProductBox from "../Component/Product/ProductBoxComponent";
export default function Favorite(Props) {


  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/protected', {
          withCredentials: true  // Ensure credentials (cookies) are sent
        });
        setUser(response.data);
        console.log(response.data);  // Log the response data
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);


  // favorite/:userid/all

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/favorite/all`, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setFavorites(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  
    const product = {
        name: '3x3 cubes',
        breadcrumbs: [
          { id: 1, name: 'Home', href: '/' },
        ]};
  return (
    <div className=''>
      { !Props.page ? 
      <div className='  pb-7'>
         <div className="  ">
            <div className="  text-gray-900">
              <nav aria-label="Breadcrumb">
              <ul  className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                {product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              
                <li className="text-sm">
                      <a href="/new" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                      New
                      </a>
                    </li>
                
              </ul>
              </nav>
            </div>
            
          </div>
          

              
      </div> : null}

    


     {favorites.length === 0 ? (
        <p>No favorite products found.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-3 md:grid-cols-2 lg:grid-cols-4 ">
          {favorites.map((favorite, index) => (
            <div key={index} className="">
                  <div  className=" mt-6 grid grid-cols-2 gap-x-3 gap-y-3 md:grid-cols-2 lg:flex xl:overflow-x-auto scrollbar-hide   xl:gap-x-8">
                    <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-3 md:grid-cols-2 lg:flex xl:overflow-x-auto scrollbar-hide   xl:gap-x-8">
                      
                    <ProductBox image={favorite.image_src} name={favorite.product_name} price={favorite.price} id={favorite.product_id} />
                    </div>
                  </div>
            </div>
          ))}
        </div>
      )}
    
    </div>
  )
}
