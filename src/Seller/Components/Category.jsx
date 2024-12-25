import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PlusIcon} from '@heroicons/react/24/outline';
import Drawer from './DrawerCat';


export default function Category() {
    const [categories, setCategories] = useState([]);
        const [dropdown, setDropdown] = useState(null);

    const shopId = localStorage.getItem('ShopId');
    const token = localStorage.getItem('SellerToken');

    const navigate=useNavigate();
  
  

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${REACT_APP_API_URL}/shops/${shopId}/categories`, {
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

    const handleDropdown = (id) => {
        setDropdown(dropdown === id ? null : id);
    };

    const deletecategory = async (id) => {
        try {
            const response = await axios.delete(`${REACT_APP_API_URL}/shops/${shopId}/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setDropdown(false);
            navigate('/seller');
        } catch (error) {
          setDropdown(true);
            console.error('Error deleting categories:', error);
        }
   
    };

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [ProductIdforEdit, setProductIdforEdit] = useState();
    const handleEditOpenDrawer = (id) => {
        setDropdown(dropdown === id ? null : id);
        setProductIdforEdit(id);
    };

    return (
        <>
        <Drawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} ProductIdforEdit={ProductIdforEdit} />
         <span onClick={()=>{setDropdown(!dropdown)}} className={` h-screen ${dropdown?"flex":"hidden"} fixed w-full  z-40 overflow-hidden  -mt-40`}></span>
        <div  className="mx-auto max-w-2xl px-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl tracking-tight text-gray-900 flex item-center gap-3 ">Categories
                  <button
                  onClick={() => navigate('/seller/categoriesadd')}
                  className={`inline-block text-gray-500 hover:bg-indigo-100 bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5`}
              >
                  <PlusIcon className="h-6 w-6 text-indigo-700"/>
              </button>
            </h2>
            
            
            <div className="mt-6 grid grid-cols-2 sm:gap-x-3 sm:gap-y-3 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {categories.length === 0 ? (
                  <div className="w-full m-2">
                      <div className="sm:w-full w-[33vw] max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                          <div className="relative flex justify-center px-4 pt-4">
                              <button
                                  onClick={() => navigate('/seller/categoriesadd')}
                                  className={`inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5`}
                              >
                                  <PlusIcon className="h-6 w-6 text-green-600"/>
                              </button>
                              
                          </div>
                          <div className="flex flex-col items-center pb-10">
                              <h5 className="mb-1 text-xl font-medium text-gray-900">No Categories Available</h5>
                              <span className="text-sm text-gray-500">Please add a category</span>
                          </div>
                      </div>
                  </div>
               ) : (
               categories.map(category => (
                  <div key={category.id} value={category.id} className="w-full m-2">
                    
                          <div className="sm:w-full w-[33vw] max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                              <div className="relative flex justify-end px-4 pt-4">
                                  <button
                                      onClick={() => handleDropdown(category.id)}
                                      className={`inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5`}
                                  >
                                      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                      </svg>
                                  </button>
                                  <div className={`z-50 ${dropdown === category.id ? 'block' : 'hidden'} absolute -right-2 top-5 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                                      <ul className="py-2" aria-labelledby="dropdownButton">
                                          <li onClick={()=>{setDrawerOpen(true);handleDropdown(category.id);handleEditOpenDrawer(category.id)}}>
                                              <h1 className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</h1>
                                          </li>
                                          <li>
                                              <h1  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Export Data</h1>
                                          </li>
                                          <li onClick={() => deletecategory(category.id)}>
                                              <h1  className="cursor-pointer block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</h1>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                              <div className="flex flex-col items-center pb-10">
                                  <h5 className="mb-1 text-xl font-medium text-gray-900">{category.name}</h5>
                                  <span className="text-sm text-gray-500">{category.href}</span>
                              </div>
                          </div>
                    
                  </div>
                  ))
              )
            }

            </div>
        </div>
        </>
    );
}
