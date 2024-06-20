import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CheckCircleIcon,ClockIcon,CubeIcon} from '@heroicons/react/24/outline';


const SellerOrders = () => {
    const token = localStorage.getItem('token');
    const shopId = localStorage.getItem('ShopId');
    const sellerId=shopId;

  const [error, setError] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [productData, setProductData] = useState([]);

    // Helper function to format the date
    const formatDate = (dateString) => {
      const today = new Date(dateString);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      
      const dayOfWeek = dayNames[today.getDay()];
      const day = today.getDate().toString().padStart(2, '0');
      const month = monthNames[today.getMonth()];
      const year = today.getFullYear();
      
      return `${dayOfWeek}, ${day} ${month} ${year}`;
    };
  
    // expected delevery date
    const expectedDeleveryDate = (dateString) => {
      const today = new Date(dateString);
      today.setDate(today.getDate() + 5);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      
      const dayOfWeek = dayNames[today.getDay()];
      const day = today.getDate().toString().padStart(2, '0');
      const month = monthNames[today.getMonth()];
      const year = today.getFullYear();
      
      return `${dayOfWeek}, ${day} ${month} ${year}`;
    }

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/seller-orders/${sellerId}`);       
        setOrderItems(response.data.orders);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching seller orders');
      }
    };

    fetchSellerOrders();
  }, [sellerId]);

 

 // pagination
const product = {
  breadcrumbs: [
    { id: 1, name: 'Dashboard', href: '/seller' },
    { id: 2, name: 'Orders', href: '/seller/orders' }

  ]};
  // {orders.map((order) => (
  //   <tr key={order.order_id}>
  //     <td>{order.order_id}</td>
  //     <td>{order.customer_id}</td>
  //     <td>{order.product_id}</td>
  //     <td>{order.quantity}</td>
  //     <td>{order.order_date}</td>
  //     <td>{order.status}</td>
  //     <td>{order.user_address}</td>
  //     <td>{order.Product_name}</td>
  //     <td><img src={order.product_imageSrc} alt={order.Product_name} width="50" /></td>
  //     <td>{order.product_price}</td>
  //     <td>{order.user_name}</td>
  //     <td>{order.user_mobileNumber}</td>
  //   </tr>
  // ))}

  return (
    <div className="relative isolate px-6 pt-0 lg:pt-0">
      <header className="pb-6">
          <ol  className="mx-auto flex   ">
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
          </ol>
      </header>
      
    
      <div className="mx-auto max-w-6xl py-32 sm:py-10 lg:py-10 h-screen ">

        <h3 className="text-4xl pt-5 pb-3 font-semibold leading-7 text-gray-800 capitalize">Order history</h3>
        <h3 className="text-md  font-medium  leading-7 text-gray-400 capitalize">Check the status of recent orders, manage returns, and discover similar products.</h3>
        
        <div className="grid pb-8 grid-cols-2 gap-y-5 lg:grid-cols-3 xl:grid-cols-4   pt-8">
          <div className="flex relative gap-x-3 border-gray-200 hover:border-indigo-300  border-[1.7px] w-fit ps-3 pr-20 py-3 rounded-xl">
            <div  className='cursor-pointer  bg-indigo-100 rounded-full flex justify-center items-center p-4   text-indigo-400'>
              <CubeIcon className="h-8 w-8   "/>
            </div>
            <div className="grid grid-cols-1  items-center">
              <h1 className='font-semibold text-xl' >36</h1>
              <h1 className='text-gray-400'>Total Order</h1>
            </div>
          </div>

          <div className="flex relative gap-x-3 border-gray-200 hover:border-indigo-300  border-[1.7px] w-fit ps-3 pr-20 py-3 rounded-xl">
            <div  className='cursor-pointer  bg-green-100 rounded-full flex justify-center items-center p-4   text-green-400'>
              <CubeIcon className="h-8 w-8   "/>
            </div>
            <div className="grid grid-cols-1  items-center">
              <h1 className='font-semibold text-xl' >36</h1>
              <h1 className='text-gray-400'>Active Order</h1>
            </div>
          </div>

          <div className="flex relative gap-x-3 border-gray-200 hover:border-indigo-300  border-[1.7px] w-fit ps-3 pr-20 py-3 rounded-xl">
            <div  className='cursor-pointer  bg-yellow-100 rounded-full flex justify-center items-center p-4   text-yellow-400'>
              <CubeIcon className="h-8 w-8   "/>
            </div>
            <div className="grid grid-cols-1  items-center">
              <h1 className='font-semibold text-xl' >36</h1>
              <h1 className='text-gray-400'>Completed </h1>
            </div>
          </div>

          <div className="flex relative gap-x-3 border-gray-200 hover:border-indigo-300  border-[1.7px] w-fit ps-3 pr-20 py-3 rounded-xl">
            <div  className='cursor-pointer  bg-red-100 rounded-full flex justify-center items-center p-4   text-red-400'>
              <CubeIcon className="h-8 w-8   "/>
            </div>
            <div className="grid grid-cols-1  items-center">
              <h1 className='font-semibold text-xl' >36</h1>
              <h1 className='text-gray-400'>Canceled</h1>
            </div>
          </div>

          
          
        </div>
        
        <div className="px-4 pt-2 sm:px-0">     
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <ul className='grid  gap-x-4 md:grid-cols-1 border border-gray-200 rounded-[1rem]  divide-y divide-gray-200 '>
          {orderItems.map((product) => (
            <li key={product.order_id} className=" flex py-8 px-8">
                
                <div className="h-30 w-[9rem] item-ce flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    
                    <Link to={`/productview/${window.btoa(product.product_id*721426)}`}  > <img
                        src={product.product_imageSrc}
                        alt={product.Product_name}
                        className="h-full w-full object-cover object-center"
                    />
                    </Link>
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                <p className="mt-1 text-[11px]  w-fit  text-indigo-400 border-[1px]  border-indigo-300 bg-indigo-100 rounded-sm px-2 flex gap-1"> <ClockIcon className='h-4 w-4' /> {expectedDeleveryDate(product.order_date)} </p>

                    <div className="mt-1 flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <Link to={`/productview/${window.btoa(product.product_id*721426)}`} >{product.Product_name} , order Id :{product.order_id}</Link>
                        </h3>
                        
                        <p   className="ml-4">₹{product.product_price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">color </p>
                    <p className="text-gray-500 ">  Qty:  {product.quantity} </p>
                    <p className="mt-1 text-sm text-gray-500 "> {formatDate(product.order_date)}</p>
                    <p className="mt-1 text-sm text-gray-500 "> {expectedDeleveryDate(product.order_date)}</p>              

                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="mt-1 text-sm text-gray-500 "> {product.Address}</p>
                      <p className="mt-1 text-sm text-green-400  bg-green-100 rounded-full px-2 flex justify-center items-center gap-1"> <CheckCircleIcon className='h-2 w-2 fill-green-400' /> {product.status}</p>
                    </div>
                    CustomerId: {product.customer_id} ,
                    name: {product.user_name} ,
                    mobile Number: {product.user_mobileNumber} , <br />
                    Addres: {product.user_address}


                </div>
            </li>
        ))}
          </ul>
        </div> 
      </div>
</div>
  );
};

export default SellerOrders;
