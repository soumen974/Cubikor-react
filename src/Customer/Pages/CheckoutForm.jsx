import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';

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
          navigate('/');
        }, 1100);
      })
      .catch(error => {
        setErrorMessage('There was an error updating the user');
        console.error('Error:', error);
      });
  };

  // shopping cart mirror 

  const [productdata, setProductdata] = useState([]);
    const [checkoutPrice, setCheckoutPrice] = useState(0);

    const [cartItems, setCartItems] = useState([]);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const [prdcArray, setprdcArray] = useState([]);
    const [ShopsArray, setShopsArray] = useState([]);

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
          setMessage('Cart items fetched successfully');
          setErrors([]);
      } catch (error) {
          console.error('Error fetching cart items:', error);
          if (error.response && error.response.data.errors) {
              setErrors(error.response.data.errors);
          } else {
              setMessage(`Error: ${error.message}`);
          }
      }
  };

    useEffect(() => {
        fetchCartItems();
    }, [userId, token]);

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
                          console.error("Error retrieving product:", errorData);
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
        setErrorMessage('There was an error updating the item');
        console.error('Error:', error.response ? error.response.data : error.message);
      });
    };
  
   
  return (
    <section className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-20">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 space-y-4">
        <div className="lg:col-span-2 space-y-4">
            <div className="space-y-4 px-4 py-5">
              <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    
                    {productdata.length === 0 ? (
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
                            <Link to={`/productview/${window.btoa(product.id)}`}>
                              <img
                                src={product.imageSrc}
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </Link>
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href="#">{product.name}</a>
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

               
            </div>

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
                          Get it by Tomorrow
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
                          Get it by Friday, 13 Dec 2023
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
                          Get it today
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
