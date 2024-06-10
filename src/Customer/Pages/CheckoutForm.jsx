import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [voucher, setVoucher] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [deliveryMethod, setDeliveryMethod] = useState('dhl');

 

  const [Dialogopen, setDialogopenOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [Loading, setLoader] = useState(false);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

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
          localStorage.setItem('isUserAuthenticated', 'true');
          setUserData(userDetails);
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Error retrieving user');
        }
      } catch (error) {
        setErrorMessage('An error occurred, please try again later');
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

   const navigate =useNavigate();

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
        setTimeout(() => {
          setDialogopenOpen(false);
          navigate('/profile');
        }, 1100);
      })
      .catch(error => {
        setErrorMessage('There was an error updating the user');
        console.error('Error:', error);
      });
  };

  return (
    <section className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-20">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <div className="space-y-4 border p-2 bg-gray-300">
              <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                      

                  
                      <li  className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={"product.imageSrc"}
                                  alt={"product.name"}
                                  className="h-full w-full object-cover object-center"
                              />
                              
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                      <a href="#">{"product.name"}</a>
                                  </h3>
                                  <p   className="ml-4">₹{"product.price"}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">color</p>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty 1</p>
                                  <div className="flex">
                                      <button
                                      
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                          Remove
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </li>
                  </ul>
              </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>

               <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
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
                  <label htmlFor="mobile_number" className="block text-sm font-medium leading-6 text-gray-900">
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
                  <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
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
                  <label htmlFor="shipping_country" className="block text-sm font-medium leading-6 text-gray-900">
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
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
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
                  <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
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
                  <label htmlFor="zipcode" className="block text-sm font-medium leading-6 text-gray-900">
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

               

               
              </div>

                <div className="sm:col-span-2">
                <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                >
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                    </svg>
                    Add new address
                </button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Payment</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Payment method radio buttons */}
                </div>

                <div>
                <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900">
                    Voucher code
                </label>
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
                    className="rounded-e-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                    >
                    Apply
                    </button>
                </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Delivery method</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Delivery method radio buttons */}
                </div>
            </div>

            <div className="sm:col-span-2">
                <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                >
                Complete Purchase
                </button>
            </div>

            <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Delivery Methods</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                <div className="flex items-start">
                    <div className="flex h-5 items-center">
                    <input
                        id="dhl"
                        aria-describedby="dhl-text"
                        type="radio"
                        name="delivery-method"
                        value=""
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                        checked
                    />
                    </div>

                    <div className="ms-4 text-sm">
                    <label htmlFor="dhl" className="font-medium leading-none text-gray-900">
                        $15 - DHL Fast Delivery
                    </label>
                    <p id="dhl-text" className="mt-1 text-xs font-normal text-gray-500">
                        Get it by Tomorrow
                    </p>
                    </div>
                </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                <div className="flex items-start">
                    <div className="flex h-5 items-center">
                    <input
                        id="fedex"
                        aria-describedby="fedex-text"
                        type="radio"
                        name="delivery-method"
                        value=""
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                    />
                    </div>

                    <div className="ms-4 text-sm">
                    <label htmlFor="fedex" className="font-medium leading-none text-gray-900">
                        Free Delivery - FedEx
                    </label>
                    <p id="fedex-text" className="mt-1 text-xs font-normal text-gray-500">
                        Get it by Friday, 13 Dec 2023
                    </p>
                    </div>
                </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                <div className="flex items-start">
                    <div className="flex h-5 items-center">
                    <input
                        id="express"
                        aria-describedby="express-text"
                        type="radio"
                        name="delivery-method"
                        value=""
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                    />
                    </div>

                    <div className="ms-4 text-sm">
                    <label htmlFor="express" className="font-medium leading-none text-gray-900">
                        $49 - Express Delivery
                    </label>
                    <p id="express-text" className="mt-1 text-xs font-normal text-gray-500">
                        Get it today
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div>
                <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900">
                    Enter a gift card, voucher or promotional code
                </label>
                <div className="flex max-w-md items-center gap-4">
                    <input
                    type="text"
                    id="voucher"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                    placeholder=""
                    required
                    />
                    <button
                    type="button"
                    className="flex items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                    >
                    Apply
                    </button>
                </div>
            </div>
        </div>

          <div>
            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200">
                <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">Subtotal</dt>
                    <dd className="text-base font-medium text-gray-900">$8,094.00</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">Savings</dt>
                    <dd className="text-base font-medium text-green-500">0</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">Store Pickup</dt>
                    <dd className="text-base font-medium text-gray-900">$99</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">Tax</dt>
                    <dd className="text-base font-medium text-gray-900">$199</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">$8,392.00</dd>
                </dl>
                </div>
            </div>

            <div className="space-y-3">
                <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                >
                Proceed to Payment
                </button>

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
      </form>
      
    </section>
  );
};

export default CheckoutForm;
