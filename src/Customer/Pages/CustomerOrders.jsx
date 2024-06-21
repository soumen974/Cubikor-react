import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CheckCircleIcon,ClockIcon} from '@heroicons/react/24/outline';


const CustomerOrders = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const customerId = userId;
  const [orders, setOrders] = useState([]);
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

  const extractTime = (Timing) => {
    const date = new Date(Timing);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
  
  // update order status

  const UpdateStatus = async (order_id,newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/update-order-status/${order_id}`, { status: newStatus });
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response ? error.response.data.message : 'Error updating order status');
    }
  };

  // drop down to update the order status

  const [dropdown, setDropdown] = useState(null);
  const handleDropdown = (id) => {
    setDropdown(dropdown === id ? null : id);
};

  // Fetching the orders items
  useEffect(() => {
    const fetchCustomerOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/customer-orders/${customerId}`);
        setOrders(response.data.orders);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching customer orders');
      }
    };

    fetchCustomerOrders();
  }, [customerId,dropdown]);





// pagination
const product = {
  breadcrumbs: [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'My orders', href: '/myorders' }

  ]};



  return (  
    <>
    <span onClick={()=>{setDropdown(!dropdown)}} className={` h-screen ${dropdown?"flex":"hidden"} fixed w-full  overflow-hidden  -mt-30`}></span>
    <div className="mx-auto max-w-6xl py-32 sm:py-10 lg:py-10 min-h-screen ">
        <header className="pb-1">
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
        

        <h3 className="text-4xl pt-5 pb-3 font-semibold leading-7 text-gray-800 capitalize">Order history</h3>
        <h3 className="text-md pb-8 font-medium  leading-7 text-gray-400 capitalize">Check the status of recent orders, manage returns, and discover similar products.</h3>

        
        <div className="px-4 pt-2 sm:px-0">     
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul className='flex flex-col-reverse gap-x-4   border border-gray-200 rounded-[1rem]  divide-y divide-gray-200 '>
          {orders.map((product) => (
            <li key={product.order_id} className=" flex  py-8 px-8">
                
                <div className="h-30 w-[9rem] item-ce flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    
                    <Link to={`/productview/${window.btoa(product.product_id*721426)}`}  > <img
                        src={product.product_imageSrc}
                        alt={product.Product_name}
                        className="h-full w-full object-cover object-center"
                    />
                    </Link>
                </div>

                <div className="ml-4 flex flex-1 flex-col">

                <div className="flex flex-1 items-end justify-between text-sm">
                   <p className="mt-1 text-[11px]  w-fit  text-indigo-400 border-[1px]  border-indigo-300 bg-indigo-100 rounded-sm px-2 flex gap-1"> <ClockIcon className='h-4 w-4' />  {expectedDeleveryDate(product.order_date)}</p>
                   
                      <div className="relative flex justify-end px-4 pt-4">
                            <button
                                onClick={() => handleDropdown(product.order_id)}
                                className={`inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5`}
                            >
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                            </button>
                            <div className={` ${dropdown === product.order_id ? 'block' : 'hidden'}  absolute -right-2 top-12 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-36`}>
                                <ul id="status"
                                    onClick={() => {UpdateStatus(product.order_id,'Canceled')}}>
                               
                                    <li >
                                        <h1 value="Canceled" className="cursor-pointer block pl-4 py-2 text-sm text-red-600 hover:bg-gray-100">Cancel Order</h1>
                                    </li>
                                </ul>
                            </div>
                        </div>
                      
                </div>

                    <div className="mt-1 flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <Link to={`/productview/${window.btoa(product.product_id*721426)}`} >{product.Product_name}</Link>
                        </h3>
                        <p   className="ml-4">₹{product.product_price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">color </p>
                    <p className="text-gray-500 ">  Qty:  {product.quantity} </p>
                    <p className="mt-1 text-sm text-gray-500 "> Order Date: {formatDate(product.order_date)}</p>

                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="mt-1 text-sm text-gray-500 "> {extractTime(product.order_date)}</p>
                      <p className={`${product.status==="Shipped"?"text-yellow-400  bg-yellow-100": product.status==="Canceled"? "text-red-400  bg-red-100" : product.status==="Delivered"? "text-indigo-400  bg-indigo-100" : "text-green-400  bg-green-100"} mt-1 text-sm  rounded-full px-2 flex justify-center items-center gap-1`}> <CheckCircleIcon className={`h-2 w-2  ${product.status==="Shipped"? "fill-yellow-400": product.status==="Canceled"? "fill-red-400" : product.status==="Delivered"? "fill-indigo-400" :"fill-green-400" }`} /> 
                      {product.status}
                      </p>
                      
                    </div>

                </div>
            </li>
        ))}
          </ul>
        </div> 
        
    </div>
    </>
  );
};

export default CustomerOrders;
