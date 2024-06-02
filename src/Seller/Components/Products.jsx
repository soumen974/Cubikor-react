import React, { useState, useEffect } from 'react';
import axios from 'axios';

const users = [
  {
    id: 1,
    name: 'Neil Sims',
    email: 'neil.sims@flowbite.com',
    position: 'React Developer',
    status: 'Online',
    imageUrl: '/docs/images/people/profile-picture-1.jpg',
  },
  {
    id: 2,
    name: 'Bonnie Green',
    email: 'bonnie@flowbite.com',
    position: 'Designer',
    status: 'Online',
    imageUrl: '/docs/images/people/profile-picture-3.jpg',
  },
  {
    id: 3,
    name: 'Jese Leos',
    email: 'jese@flowbite.com',
    position: 'Vue JS Developer',
    status: 'Online',
    imageUrl: '/docs/images/people/profile-picture-2.jpg',
  },
  {
    id: 4,
    name: 'Thomas Lean',
    email: 'thomes@flowbite.com',
    position: 'UI/UX Engineer',
    status: 'Online',
    imageUrl: '/docs/images/people/profile-picture-5.jpg',
  },
  {
    id: 5,
    name: 'Leslie Livingston',
    email: 'leslie@flowbite.com',
    position: 'SEO Specialist',
    status: 'Offline',
    imageUrl: '/docs/images/people/profile-picture-4.jpg',
  },
];

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
            }));
            setProductdata(categoriesData);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories();
      }, [shopId, token]);
    

  return (
    <div className="relative overflow-hidden shadow-md sm:rounded-lg pt-10">
            <h1 className="text-xl  tracking-tight text-gray-900">Products</h1>
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white ">
       
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
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Position
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
          {productdata.map((product) => (
            <tr
              key={product.id}
              className="bg-white border-b"
            >
              
              <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
                <img className="w-10 h-10 rounded-full" src={product.imageSrc} alt={`${product.name} image`} />
                <div className="ps-3">
                  <div className="text-base font-semibold">{product.name}</div>
                  <div className="font-normal text-gray-500">{product.price}</div>
                </div>
              </th>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${product.name === 'Online' ? 'bg-green-500' : 'bg-red-500'} me-2`}
                  ></div>{' '}
                  {product.name}
                </div>
              </td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 hover:underline">
                  Edit user
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Products;
