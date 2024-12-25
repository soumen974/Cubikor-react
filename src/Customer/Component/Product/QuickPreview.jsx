import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearErrors, clearMessage } from '../../../redux/cartSlice';
import PageLoder from "../../../Loaders/PageLoder";
import Favorite from "../../Component/Fav";
import AddtoCart from "../../Component/AddtoCart";



export default function QuickPreview({ open, setOpen, ShopIDsend, CubeId, catId }) {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const Authenticated = token;
  
  const ShopID = ShopIDsend;
  const productID = CubeId;
  const [productData, setProductData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [errors, setErrors] = useState([]);
  // const [message, setMessage] = useState('');
  const navigate =useNavigate();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/shops/${ShopID}/products/${productID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [token, productID, ShopID]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/shops/${ShopID}/categories/${catId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setCategoryData(response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [ShopID, token, catId]);

  const [messages, setmessages] = useState({success:false, error:false});
  const SuccessSound = () => {
    const audio = new Audio(process.env.PUBLIC_URL + '/Sounds/success_bell-6776.mp3');
    audio.play();
  };
  const errorSound= () => {
    const audio = new Audio(process.env.PUBLIC_URL + '/Sounds/windows-error-sound-effect-35894.mp3');
    audio.play();
  }
  
  const AddingToBag = async (e) => {
    e.preventDefault();
    if(Authenticated){
      try {
        const response = await axios.post(
          `${REACT_APP_API_URL}/users/${userId}/shopping_cart`,
          {
            CategoryId: catId,
            productId: productID,
            shopId: ShopID,
            quantity: 1
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        // navigate("/")
        // window.location.reload();
        setTimeout(() => {
          setmessages({success:false});
        }, 3000);
        setmessages({success:true});
        SuccessSound();
        setOpen(false)
      } catch (error) {
        console.error('Already added to cart:', error);
        setTimeout(() => {
          setmessages({error:false});
        }, 3000);
        setmessages({error:true});
        errorSound();
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
          
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    }else{
      navigate("/seller/Login")
    }
   
  };

  // updated add to cart from redux
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { status, error, message } = cart;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (Authenticated) {
      dispatch(addToCart({ userId, catId, productID, ShopID, token }));
      if (message) {
        navigate('/');
        
      }
      else{
        setOpen(false)
      }
    } else {
      navigate('/seller/Login');
    }
  };




  return (
    <>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center text-center items-center px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="p-[1rem] pt-[5rem] sm:mt-0 flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white rounded-md px-8 pb-8 pt-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-9 top-10 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  
                  {productData && categoryData ? (
                    <div>
                      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                        
                      <div className="p-2 absolute   top-9 z-40 text-gray-200 group hover:text-indigo-500">
                        <span className="sr-only">Favorite</span>
                        <Favorite  prdId={productData.id} prdName={productData.name} prdImage_src={productData.product_image} prdPrice={productData.price}/>
                      </div>

                        <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                          <Link to={`/productview/${window.btoa(productData.id*721426)}`} onClick={() => setOpen(false)}>
                            <img src={`${REACT_APP_API_URL}/${productData.product_image}`} alt={productData.name} className="cursor-pointer object-cover object-center" />
                          </Link>
                        </div>

                        <div className="sm:col-span-8 lg:col-span-7">
                          <h2 className="text-2xl font-bold text-gray-900 sm:pr-12 py-8">Puzzle Category: {categoryData.name}</h2>
                          <div>
                            <h3>{productData.name}</h3>
                            <p>₹{productData.price}</p>
                          </div>

                          <section aria-labelledby="options-heading" className="mt-10">
                            <h3 id="options-heading" className="sr-only">Product options</h3>
                            <AddtoCart ShopID={ShopID} productID={productID} catId={catId} />
                          </section>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='p-40  '><PageLoder/></div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  );
}







