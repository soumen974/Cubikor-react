import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { Link} from 'react-router-dom';
import EmptyCartImag from "../Component/Data/images-app/undraw_empty_cart_co35.svg";

export default function ShoppingCart(Props) {
    const [productdata, setProductdata] = useState([]);
    const [checkoutPrice, setCheckoutPrice] = useState(0);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const [cartItems, setCartItems] = useState([]);

    const RemoveFromMyCart = async (productId) => {
        const cartItem = cartItems.find(cart => cart.productId === productId);
        if (!cartItem) {
            console.error('Cart item not found for productId:');
            return;
        }

        const cartId = cartItem.id;

        try {
            await axios.delete(`${REACT_APP_API_URL}/users/${userId}/shopping_cart/${cartId}`, {
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

            console.log('Cart item removed:');

        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(
                `${REACT_APP_API_URL}/users/${userId}/shopping_cart`,
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
        } catch (error) {
            console.error('Error fetching cart items:', error);
            if (error.response && error.response.data.errors) {
                console.log(error.response.data.errors);
            } else {
                console.log(`Error: ${error.message}`);
            }
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [userId, Props.open]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                if (Array.isArray(cartItems) && cartItems.length > 0) {
                    const responses = await Promise.all(cartItems.map(product => 
                        fetch(`${REACT_APP_API_URL}/products/${product.productId}`, {
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

    // quantity update

    const [quantities, setQuantities] = useState({});

    useEffect(() => {
      const newQuantities = {};
  
      productdata.forEach((product) => {
        const cartItem = cartItems.find(cart => cart.productId === product.id);
        newQuantities[product.id] = cartItem ? cartItem.quantity : 1;
      });
  
      setQuantities(newQuantities);
    }, [productdata, cartItems]);

      
 
    
   
    

   
    

    return (
       
       <Transition.Root show={Props.open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={Props.setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white pt-[6.5rem] shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => Props.setOpen(false)}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    
                                                    {productdata.map((product) => (
                                                        <li key={product.id} className="flex py-6">
                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                               <Link to={`/productview/${window.btoa(product.id*721426)}`} onClick={() => Props.setOpen(false)} > <img
                                                                    src={`${REACT_APP_API_URL}/${product.product_image}`}
                                                                    alt={product.name}
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                                </Link>
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <Link to={`/productview/${window.btoa(product.id*721426)}`} >{product.name}</Link>
                                                                    </h3>
                                                                    <p   className="ml-4">₹{product.price}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">color</p>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <p className="text-gray-500 "> 
                                                                      Qty:  {quantities[product.id]}  
                                                                    </p>
                                                                    <div className="flex">
                                                                        <button
                                                                        onClick={()=>{RemoveFromMyCart(product.id)}}
                                                                            type="button"
                                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                        >
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                    {productdata.length === 0 && (
                                                        <div className='flex items-center justify-center h-[50vh]' >
                                                            <img className='h-40 w-40' src={EmptyCartImag} alt="" />
                                                        </div>
                                                    )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                <p>₹{checkoutPrice}</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <Link to={"/checkout"}  
                                                 onClick={() => {Props.setOpen(false)}}        
                                                 className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                >
                                                    Checkout
                                                </Link>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    or{' '}
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() => Props.setOpen(false)}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}


