import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate ,Link, useParams} from 'react-router-dom';
import { PencilSquareIcon,PlusIcon,CheckIcon} from '@heroicons/react/24/outline';
// import { FaArrowUpRightFromSquare } from "react-icons/fa6";
// import { MdKeyboardDoubleArrowRight } from "react-icons/md";


const MdKeyboardDoubleArrowRight=({className})=>{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
  </svg>
  );
}

const FaArrowUpRightFromSquare=({className})=>{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>
  );
}

const CheckoutForm = () => {

  // const {prdid}=useParams();
  // const productidforcheckout= window.atob(prdid)/721426;
  const [buynowProductData, setbuynowProductData] = useState([]);

  const [voucher, setVoucher] = useState('');
  const [changeAddres, setchangeAddres] = useState(false);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  // user address put 

  const [userData, setUserData] = useState({
    username: '',
    name: '',
    auth: false,
    password: '',
    date_of_birth: '',
    country: '',
    security_question: '',
    security_answer: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    shipping_country: '',
    mobile_number: '',
    last_activity: null
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userDetails = await response.json();
          
          setUserData(userDetails);
        } else {
          const errorData = await response.json();
          console.log(errorData.message || 'Error retrieving user');
        }
      } catch (error) {
        console.log('An error occurred, please try again later');
      }
    };

    if (userId && token) {
      fetchUser();
    }
  }, [userId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Updating ${name} to ${value}`);
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedData = {
      username: userData.username,
      name: userData.name,
      auth: userData.auth,
      date_of_birth: userData.date_of_birth ? userData.date_of_birth.split('T')[0] : null,
      country: userData.country,
      security_question: userData.security_question,
      security_answer: userData.security_answer,
      shipping_address: {
        street: userData.street,
        city: userData.city,
        state: userData.state,
        zipcode: userData.zipcode,
        country: userData.shipping_country,
      },
      mobile_number: userData.mobile_number,
    };


    axios.put(`http://localhost:5000/users/${userId}`, updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`
    }
     
    })
      .then(response => {
        console.log('User updated successfully', response.data);
        setchangeAddres(false);
        setTimeout(() => {
          
        }, 1100);
      })
      .catch(error => {
        console.log('There was an error updating the user');
        console.error('Error:', error);
      });
  };

  // shopping cart mirror 

  const [productdata, setProductdata] = useState([]);
    const [checkoutPrice, setCheckoutPrice] = useState(0);

    const [cartItems, setCartItems] = useState([]);
    const [message, setMessage] = useState(false);
    const [errors, setErrors] = useState([]);

    const RemoveFromMyCart = async (productId) => {
        const cartItem = cartItems.find(cart => cart.productId === productId);
        if (!cartItem) {
            console.error('Cart item not found for productId:', productId);
            return;
        }

        const cartId = cartItem.id;

        try {
            await axios.delete(`http://localhost:5000/users/${userId}/shopping_cart/${cartId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setProductdata(prevProductData => {
                const updatedProductData = prevProductData.filter(product => product.id !== productId);
                const totalPrice = updatedProductData.reduce((total, product) => total + parseFloat(product.price), 0);
                setCheckoutPrice(totalPrice.toFixed(2));
                return updatedProductData;
            });

            setCartItems(prevCartItems => prevCartItems.filter(cart => cart.productId !== productId));

            console.log('Cart item removed:', cartItem);

        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };

    const fetchCartItems = async () => {
      try {
       
            const response = await axios.get(
                `http://localhost:5000/users/${userId}/shopping_cart`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            const cartItemsData = response.data.map((cart) => ({
                id: cart.id,
                productId: cart.productId,
                shopId: cart.shopId,
                quantity:cart.quantity,
            }));
        
          setCartItems(cartItemsData);
          console.log('Cart items fetched successfully');
          setErrors([]);
      } catch (error) {
          console.error('Error fetching cart items:', error);
          if (error.response && error.response.data.errors) {
              setErrors(error.response.data.errors);
          } else {
              console.log(`Error: ${error.message}`);
          }
      }
  };

    useEffect(() => {
        fetchCartItems();
    }, [userId, token]);

    // geting products as the cart stores id;

    useEffect(() => {
      const fetchCategories = async () => {
          try {

              if (Array.isArray(cartItems) && cartItems.length > 0) {
                  const responses = await Promise.all(cartItems.map(product => 
                      fetch(`http://localhost:5000/products/${product.productId}`, {
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
                          console.log("Error retrieving product:", errorData);
                          return null;
                      }
                  }));
  
                  const validData = productsDataArray.filter(data => data !== null);
  
                  const totalPrice = validData.reduce((total, product) => {
                      const cartItem = cartItems.find(cart => cart.productId === product.id);
                      const quantity = cartItem ? cartItem.quantity : 0;
                      return total + quantity * parseFloat(product.price);
                  }, 0);
                                      // const intoprice= cartItems.find(cart => cart.productId === product.id)?.quantity || 0;
                  setCheckoutPrice(totalPrice.toFixed(2));
  
                  setProductdata(validData);

              }
          } catch (error) {
              console.error('An error occurred, please try again later:', error);
          }
      };
  
      fetchCategories();
  }, [cartItems, token]);


    // quantity chceck for products
    
    const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const newQuantities = {};

    productdata.forEach((product) => {
      const cartItem = cartItems.find(cart => cart.productId === product.id);
      newQuantities[product.id] = cartItem ? cartItem.quantity : 1;
    });

    setQuantities(newQuantities);
  }, [productdata, cartItems]);
   
  const increment = (id) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[id] || 1;
      if (currentQuantity < 10) {
        const newQuantity = currentQuantity + 1;
        const newQuantities = {
          ...prevQuantities,
          [id]: newQuantity,
        };

        // Call quntUpdate with the new quantity
        setTimeout(() => {
          quntUpdate(id, newQuantity);
        }, 3000);

        return newQuantities;
      } else {
        return prevQuantities;
      }
    });
  };


  
  
    const decrement = (id) => {
      setQuantities((prevQuantities) => {
        const currentQuantity = prevQuantities[id] || 1;
        if (currentQuantity >1) {
          const newQuantity = currentQuantity - 1;
          const newQuantities = {
            ...prevQuantities,
            [id]: newQuantity,
          };
  
          // Call quntUpdate with the new quantity
          setTimeout(() => {
            quntUpdate(id, newQuantity);
          }, 3000);
         
  
          return newQuantities;
        } else {
          return prevQuantities;
        }
      });
    };
    const quntUpdate = (id, quantity) => {
      const PId = id;
  
      // Data to be sent to the backend
      const data = {
        quantity: quantity,
      };
  
      // Update the backend
      axios.put(`http://localhost:5000/users/${userId}/shopping_cart/${PId}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('Item updated successfully', response.data);
      })
      .catch(error => {
        console.log('There was an error updating the item');
        console.error('Error:', error.response ? error.response.data : error.message);
      });
    };
  


   // Get the current date
    let today = new Date();

    // Add 5 days to the current date
    today.setDate(today.getDate() + 5);

    // Define an array of month names and day names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Extract the necessary parts of the date
    let dayOfWeek = dayNames[today.getDay()];
    let day = today.getDate().toString().padStart(2, '0');
    let month = monthNames[today.getMonth()];
    let year = today.getFullYear();

    // Print the formatted date
    const formattedDate = `${dayOfWeek}, ${day} ${month} ${year}`;

    


    // Proceed to Payment
    
    // const navigate=useNavigate();

    const OrderPlaced = async () => {
      const usrAddress = `${userData.street}, ${userData.city}, ${userData.state}, pin-${userData.zipcode}, ${userData.country}`;
    
      const orderData = productdata.map(product => ({
        customerId: userId,
        productId: product.id,
        quantity: quantities[product.id],
        sellerId: product.shop_id,
        userAddress: usrAddress,
        productName: product.name,
        productImageSrc: `http://localhost:5000/${product.product_image}`,
        productPrice: (product.price *quantities[product.id]),
        userName: userData.name,
        userMobileNumber: userData.mobile_number
      }));
    
      console.log('Order Data:', orderData); // Log the order data
    
      try {
        const responses = await Promise.all(orderData.map(data =>
          axios.post('http://localhost:5000/place-order', data)
        ));
        console.log('All orders placed successfully:', responses);
        setMessage(true);
        setTimeout(() => {
          setMessage(false);
          
        }, 5000);
    
        // Optionally, show success message to the user
      } catch (error) {
        if (error.response) {
          console.error('Error placing orders:', error.response.data);
          alert('Error placing orders: ' + error.response.data.message);
        } else if (error.request) {
          console.error('No response received:', error.request);
          alert('No response received from the server. Please try again.');
        } else {
          console.error('Error:', error.message);
          alert('An error occurred: ' + error.message);
        }
      }
    };

    // pagination
const product = {
  breadcrumbs: [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'checkout', href: '/checkout' }
  ]};
    
    


  return (
    <>
    
    <section className="mx-auto max-w-6xl   ">
    <header className=" ">
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
      
      {!message?
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 space-y-4">
        <div className="lg:col-span-2 space-y-4">
            <div className="space-y-4 px-4 py-5">
              <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    
                    {
                    
                      productdata.length === 0 ? (
                          <div className="sm:col-span-2 mb-5">
                            <Link
                            to={"/"}
                                
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                            >
                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                                </svg>
                                Add Product
                            </Link>
                            </div>

                        ):(
                      productdata.map((product) => (
                        <li key={product.id} className="flex py-6">
                          
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <Link to={`/productview/${window.btoa(product.id*721426)}`}>
                              <img
                                src={`http://localhost:5000/${product.product_image}`}
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </Link>
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to={`/productview/${window.btoa(product.id*721426)}`}>{product.name}</Link>
                              </h3>
                              <p className="ml-4">₹{product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">color</p>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">
                                  <form className="max-w-xs pt-2 mx-auto flex gap-5">
                                      <label htmlFor="">
                                      Qty:                                                                    
                                        </label>
                                      <div className="relative flex items-center">
                                          <button
                                          type="button"
                                          onClick={() => decrement(product.id)}
                                          className={`${(quantities[product.id])<=1? "cursor-not-allowed":""} flex-shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none`}
                                          >
                                          <svg className="w-2.5 h-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                          </svg>
                                          </button>
                                          <input
                                              type="text"
                                              id="counter-input"
                                              className="flex-shrink-0  text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                                              placeholder=""
                                              value={quantities[product.id] ||0}
                                              readOnly
                                          />
                                          <button
                                          type="button"
                                          onClick={() => increment(product.id)}
                                          
                                          className={`flex-shrink-0 ${(quantities[product.id])>=10? "cursor-not-allowed":""}  bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none`}
                                          >
                                          <svg className="w-2.5 h-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                          </svg>
                                          </button>
                                      </div>
                                  </form>
                              </p>
                              <div className="flex">
                                <button
                                  onClick={() => RemoveFromMyCart(product.id)}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove 
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))

                    ) }
                    
                    
                  </ul>
              </div>
            </div>


            {changeAddres ?
           (
             <form className="group relative rounded-xl border border-indigo-200 bg-indigo-50 py-7 px-5 space-y-4">
                <h3 className="text-xl font-semibold text-indigo-600">Contact Information</h3>

               <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-indigo-600">
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      id="name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="mobile_number" className="block text-sm font-medium leading-6 text-indigo-600">
                    Mobile Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="mobile_number"
                      value={userData.mobile_number}
                      onChange={handleChange}
                      id="mobile_number"
                      autoComplete="mobile number"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 sm:col-start-1">
                  <label htmlFor="street" className="block text-sm font-medium leading-6 text-indigo-600">
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street"
                      value={userData.street}
                      onChange={handleChange}
                      id="street"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="shipping_country" className="block text-sm font-medium leading-6 text-indigo-600">
                    Shipping Country
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="shipping_country"
                      value={userData.shipping_country}
                      onChange={handleChange}
                      id="shipping_country"
                      autoComplete="shipping-country"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-indigo-600">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      value={userData.city}
                      onChange={handleChange}
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="state" className="block text-sm font-medium leading-6 text-indigo-600">
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="state"
                      value={userData.state}
                      onChange={handleChange}
                      id="state"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="zipcode" className="block text-sm font-medium leading-6 text-indigo-600">
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="zipcode"
                      value={userData.zipcode}
                      onChange={handleChange}
                      id="zipcode"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <button onClick={handleSubmit}  className=' absolute top-3 right-3  ms-auto  hover:bg-gray-50 inline-flex justify-center items-center w-8 h-8 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 bg-blue-200 '>
                  <PlusIcon className="h-6 w-6 "/>
                </button>

              </div>

               
            </form>):(
              <div className="group relative rounded-md border border-indigo-200 bg-indigo-50 p-4 ps-0">
                 <div className="px-4 py-2 sm:grid sm:grid-rows sm:gap-2 ">
                  
                    <dt className="text-xl font-semibold text-indigo-600">Shipping Address</dt>
                    <dd className="mt-1 text-sm leading-6 text-indigo-600 sm:col-span-2 sm:mt-0 capitalize">
                      {userData.street}, {userData.city}, {userData.state}, Pin-{userData.zipcode}, {userData.country}
                    </dd>
                  </div>
                  <div onClick={()=>{setchangeAddres(true)}} className='hidden cursor-pointer group-hover:block absolute bottom-3 right-3   text-indigo-400'>
                    <PencilSquareIcon className="h-6 w-6 mr-2"/>
                  </div>
              </div>
            )}

            <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Delivery Methods</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                
                <label htmlFor="dhl"  className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                  <div  className="flex items-start">
                      <div className="flex h-5 items-center">
                      <input
                          id="dhl"
                          aria-describedby="dhl-text"
                          type="radio"
                          name="delivery-method"
                          value=""
                          className="h-4 w-4 border-gray-300 bg-white text-indigo-600  "
                          checked
                      />
                      </div>

                      <div  className="ms-4 text-sm">
                      <div  className="font-medium leading-none text-gray-900">
                          Cash on  Delivery
                      </div>
                      <p id="dhl-text" className="mt-1 text-xs font-normal text-gray-500">
                          Get it by  {formattedDate}
                      </p>
                      </div>
                  </div>
                </label>

                <label  htmlFor="fedex" className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                  <div className="flex items-start">
                      <div className="flex h-5 items-center">
                      <input
                          id="fedex"
                          aria-describedby="fedex-text"
                          type="radio"
                          name="delivery-method"
                          value=""
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 "
                      />
                      </div>

                      <div className="ms-4 text-sm">
                      <div className="font-medium leading-none text-gray-900">
                          UPI payment
                      </div>
                      <p id="fedex-text" className="mt-1 text-xs font-normal text-gray-500">
                          Get it by {formattedDate}
                      </p>
                      </div>
                  </div>
                </label>

                <label htmlFor="express"  className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                  <div className="flex items-start">
                      <div className="flex h-5 items-center">
                      <input
                          id="express"
                          aria-describedby="express-text"
                          type="radio"
                          name="delivery-method"
                          value=""
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 "
                      />
                      </div>

                      <div className="ms-4 text-sm">
                      <div className="font-medium leading-none text-gray-900">
                          Card Payment
                      </div>
                      <p id="express-text" className="mt-1 text-xs font-normal text-gray-500">
                          Get it by {formattedDate}
                      </p>
                      </div>
                  </div>
                </label>
            </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Payment</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                Voucher code
                </div>

                <div>
                
                <div className="flex">
                    <div className="relative w-full">
                    <input
                        type="text"
                        id="voucher"
                        className="block w-full rounded-none rounded-s-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Voucher code"
                        value={voucher}
                        onChange={(e) => setVoucher(e.target.value)}
                    />
                    </div>
                    <button
                    type="button"
                    className="rounded-e-lg border border-indigo-700 bg-indigo-700 px-5 py-2.5 text-sm font-medium text-gray-100 hover:bg-indigo-600  focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                    >
                    Apply
                    </button>
                </div>
                </div>
            </div>

        </div>

          <div>
            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200">
                <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">Subtotal</dt>
                    <dd className="text-base font-medium text-gray-900">₹{checkoutPrice}</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">Savings</dt>
                    <dd className="text-base font-medium text-green-500">₹0</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">Store Pickup</dt>
                    <dd className="text-base font-medium text-gray-900">₹0</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">Tax</dt>
                    <dd className="text-base font-medium text-gray-900">₹0</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">₹{checkoutPrice}</dd>
                </dl>
                </div>
            </div>

            <div  className="space-y-3">
                <div
                onClick={OrderPlaced}
                className="flex cursor-pointer w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                >
                Proceed to Payment
                </div>

                <p className="text-sm font-normal text-gray-500">
                One or more items in your cart require an account.{' '}
                <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline">
                    Sign in or create an account now.
                </a>
                .
                </p>
            </div>
            </div>
         </div>

        </div>
      </form>:
      <div className=" mx-auto h-[70vh] flex justify-center items-center">
          <div className=' md:flex  gap-10 justify-center items-center text-green-400 '>
            <CheckIcon className=' animate-bounce bg-green-100 md:p-5 p-2  mx-auto flex justify-center rounded-full md:h-40 h-20 md:w-40'/> 
            <div className='grid  py-2 text-gray-700 ' >
              <h1 className='flex justify-center md:justify-start text-gray-700 text-xl font-bold' >Thank You!</h1>
              <h1 className='flex justify-center md:justify-start py-2 text-gray-700 ' >Your Order has successfully placed.</h1>
              <div className='flex gap-5 justify-center md:justify-start py-2  ' >
                <Link to={'/myorders'} className='bg-indigo-100 px-6 py-2 rounded-full text-indigo-600 flex justify-center item-center gap-2 ' >Track your Order <FaArrowUpRightFromSquare className='h-6' /></Link>
                <Link to={'/'} className='flex justify-center items-center gap-2 group'>Continue shopping <MdKeyboardDoubleArrowRight className=' group-hover: text-indigo-300 w-6 h-6' /> </Link>
              </div>

            </div>
          </div>

      </div>}
      
    </section>
    </>
  );
};

export default CheckoutForm;
