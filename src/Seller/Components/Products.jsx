import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PlusIcon} from '@heroicons/react/24/outline';




const Products = () => {
    const [productdata, setProductdata] = useState([]);
    const shopId = localStorage.getItem('ShopId');
    const token = localStorage.getItem('SellerToken');
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/shops/${shopId}/products`, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            const categoriesData = response.data.map(product => ({
              id: product.id,
              name: product.name,
                imageSrc: product.imageSrc,
                price: product.price,
                product_image:product.product_image
            }));
            setProductdata(categoriesData);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories();
      }, [shopId, token]);
      const navigate=useNavigate();

      // product action

      // const [categories, setCategories] = useState([]);
        const [dropdown, setDropdown] = useState(null);

      const handleDropdown = (id) => {
        setDropdown(dropdown === id ? null : id);
    };

  return (
    <>
     <span onClick={()=>{setDropdown(!dropdown)}} className={` h-screen ${dropdown?"flex":"hidden"} fixed w-full    z-40 overflow-hidden  -mt-80`}></span>
    <div  className="relative mt-6 mx-auto max-w-2xl px-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
      
            <h2 className="text-2xl tracking-tight text-gray-900 flex item-center gap-3 pb-2 ">Products
              <button
              onClick={() => navigate('/seller/productadd')}
              className={`inline-block text-gray-500 hover:bg-indigo-100 bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5`}
          >
              <PlusIcon className="h-6 w-6 text-indigo-700"/>
          </button>
            </h2>

      <div className="mt-6 flex items-center justify-start gap-3 flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white ">
       
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search for users"
          />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className={`text-xs text-gray-700 uppercase bg-gray-50 ${productdata.length === 0 ? "hidden":""}`}>
          <tr>
            
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
            Price
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>

        {productdata.length === 0 ? (
                  <div className="w-full m-2">
                      <div className="sm:w-full w-[33vw] max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                          <div className="relative flex justify-center px-4 pt-4">
                              <button
                                  onClick={() => navigate('/seller/productadd')}
                                  className={`inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5`}
                              >
                                  <PlusIcon className="h-6 w-6 text-indigo-700"/>
                              </button>
                              
                          </div>
                          <div className="flex flex-col items-center pb-10">
                              <h5 className="mb-1 text-xl font-medium text-gray-900">No Product Available</h5>
                              <span className="text-sm text-gray-500">Please add a Product</span>
                          </div>
                      </div>
                  </div>
               ) : (

                productdata.map((product) => (
                  <tr
                    key={product.id}
                    className="bg-white border-b "
                  >
                    
                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
                      <img className="w-10 h-10 rounded-full" src={`http://localhost:5000/${product.product_image}`} alt={`${product.name} image`} />

                      <div className="ps-3 truncate">
                        <div className="text-base font-semibold truncate">{product.name}</div>
                        <div className="font-normal text-gray-500">{product.price}</div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-6 py-4 truncate">3x3</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center truncate">
                        <div
                          className={`h-2.5 w-2.5 rounded-full truncate ${product.name === 'YJ MGC 3x3 Magnetic Speedcube' ? 'bg-green-500' : 'bg-red-500'} me-2`}
                        ></div>{' '}
                        <h1 className='truncate'>{product.name === 'YJ MGC 3x3 Magnetic Speedcube' ?"Instock":"Out of Stock"}</h1>
                      </div>
                    </td>
                    <td className="px-6 py-4"> 
                    <div className="relative flex justify-end px-4 pt-4">
                        <button
                            onClick={() => handleDropdown(product.id)}
                            className={`inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5`}
                        >
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                        </button>
                        <div className={`z-50 ${dropdown === product.id ? 'block' : 'hidden'} absolute right-10 top-5 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                            <ul className="py-2" aria-labelledby="dropdownButton">
                                <li >
                                    <h1 className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</h1>
                                </li>
                                <li>
                                    <h1  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Export Data</h1>
                                </li>
                                <li >
                                    <h1  className="cursor-pointer block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</h1>
                                </li>
                            </ul>
                        </div>
                    </div>
                      
                    </td>
                  </tr>
                ))
              
              )
            }



          
        </tbody>
      </table>
      
    </div>
    </>
    
    
  );
};

export default Products;
