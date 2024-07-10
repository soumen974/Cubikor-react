
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import CloseIcon from '@mui/icons-material/Close';
import pagelogo from "../Data/images-app/page-logo.jpg";
import SearchBox from '../../SearchBox';
import SHoppingCart from "../SHoppingCart";
import navigation from "../Data/navigation.json";
import UserEntry from '../../../Auth/UserEntry';
import Avatar from '../Avatar';
import axios from 'axios';
// import { RiSignalWifiErrorLine } from "react-icons/ri";
// import { MdOutlineCancel } from "react-icons/md";
// import { MdFavoriteBorder } from "react-icons/md";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const CloseIcon=({className})=>{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />

 </svg>
  );

}


const RiSignalWifiErrorLine=({className})=>{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="m3 3 8.735 8.735m0 0a.374.374 0 1 1 .53.53m-.53-.53.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 0 1 0 5.304m2.121-7.425a6.75 6.75 0 0 1 0 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 0 1-1.06-2.122m-1.061 4.243a6.75 6.75 0 0 1-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12Z" />

 </svg>
  );

}

const IoIosArrowDown=({className})=>{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />

 </svg>
  );

}


export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [Ad, setAd] = useState(true);
  const[SearchBar,SetSearchBar]=useState(false);
  const [shoppingCart, setshoppingCart] = useState(false);
  const [signin, setsignin] = useState(false);
  const [signinUp, setsignUp] = useState(false);
  const[error,seterrror]=useState(null);

  const token = localStorage.getItem('token');
  // const token = Cookies.get('UserToken');
  // const userId = Cookies.get('userId');
  const isAuthenticated=  token;
  const userId = localStorage.getItem('userId');
  
   // open ctrl+k search bar

   const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      SetSearchBar(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

 

  // ----shopping-cart-item-count-
  const [itemCount, setItemCount] = useState(0);
  const [cartData,setcartData]=useState([]);
  
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
        }));
        setcartData(cartItemsData);
        setItemCount(cartItemsData.length); 
        
    } catch (error) {
        console.error('Error fetching cart items:', error);
        if (error.response && error.response.data.errors) {
            console.log(error.response.data.errors);
        } else {
            console.log(`Error: ${error.message}`);
            // seterrror(error.message);
        }
    }
};

useEffect(() => {
    fetchCartItems();
}, [userId,itemCount]);


  

  return (
    <>
    <SearchBox open={SearchBar} setOpen={SetSearchBar}/>
    <SHoppingCart open={shoppingCart} setOpen={setshoppingCart}/>
    {/* error */}
    {error&&
    <div className="z-50 fixed top-[48rem] md:top-2 md:px-[30%] px-[10%]   w-full flex justify-center ">
        <div className="flex relative items-center w-fit  px-4  py-3 space-x-4  text-gray-500 bg-white divide-x  divide-gray-200 rounded-md shadow-md border space-x " role="alert">
            <div className={`mx-auto flex  flex-shrink-0 items-center justify-center rounded-full  bg-red-100  p-2`}>
                <RiSignalWifiErrorLine className="h-5 w-5 text-red-600" aria-hidden="true" />
            </div>
            <div className="px-3 text-sm font-normal">{error}</div>
           
        </div> 
        
        
   </div>}

    <UserEntry SignInopen={signin} setOpenSignIn={setsignin} open={signinUp} setOpen={setsignUp}/>
      <div className="bg-white fixed w-full z-40">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden " onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex ">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pt-[6rem] pb-12 shadow-xl" style={{ '&::WebkitScrollbar': { width: 0, height: 0, display: "hidden" } }}>
                 

                  {/* Links */}
                  <Tab.Group as="div" className="mt-0">
                    <div className="border-b border-gray-200">
                    <button
                    type="button"
                    className="  absolute right-9 top-10 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                      <Tab.List className="-mb-px flex space-x-8 px-4">
                        {navigation.categories.map((category) => (
                          <Tab
                            key={category.name}
                            className={({ selected }) =>
                              classNames(
                                selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                              )
                            }
                          >
                            {category.name}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {navigation.categories.map((category) => (
                        <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                          <div className="grid grid-cols-2 gap-x-4">
                            {category.featured.map((item) => (
                              <div key={item.name} className="group relative text-sm">
                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-800 group-hover:opacity-75">
                                  <img src={item.imageSrc} alt={item.imageAlt} className="object-cover w-fit object-center" />
                                </div>
                                <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                  <span className="absolute inset-0 z-10" aria-hidden="true" />
                                  {item.name}
                                </a>
                                <p aria-hidden="true" className="mt-1">
                                  Shop now
                                </p>
                              </div>
                            ))}
                          </div>
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                {section.name}
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                className="mt-6 flex flex-col space-y-6"
                              >
                                {section.items.map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                          {page.name}
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className={` space-y-6 border-t border-gray-200 px-4 py-6`}>
                  {isAuthenticated ?
                    <Avatar/>
                    :(
                   <> <div onClick={()=>{setsignin(true);setOpen(!open);}}   className={` flow-root`}>
                      <a href="#" className=" -m-2 flex justify-center border-[2px] border-indigo-500 hover:bg-indigo-500 hover:text-white p-2 font-medium text-indigo-500">
                        Sign in 
                      </a>
                    </div>
                    <div onClick={()=>setsignUp(true)} className={` flow-root justify-center item-center`}>
                      <a href="#" className="-m-2 flex justify-center p-2 font-medium bg-yellow-400 hover:bg-yellow-300 text-gray-900">
                        Create account 
                      </a>
                    </div> </>)}
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6">
                    <a href="#" className="-m-2 flex items-center p-2">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                      <span className="ml-3 block text-base font-medium text-gray-900">INR</span>
                      <span className="sr-only">, change currency</span>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-white text-indigo-600" >
       <div className={`${Ad? "h-10": "h-0 hidden" } transform-h flex relative  items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8`}>
            <h1>Get 20% Discount on orders over ₹ 599/-</h1> 
            <div className="item-right absolute right-10 w-0 md:right-40 md:w-10 cursor-pointer " onClick={()=>setAd(false)}>
            <CloseIcon className='w-6 h-6' />
            </div>
          </div>

          <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(!open)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <a href="/" className='flex justify-center items-center gap-3 '>
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto rounded-full"
                      src={pagelogo}
                      alt=""
                    />
                  
                  <h1 className='font-semibold text-xl'>CUBIKOR</h1>

                  </a>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    <div className="flex group h-full space-x-8">
                    {navigation.categories.slice(0, 1).map((category) => (
                      <Popover key={category.name} className="flex">
                       
                          <div className='group hover:bg-red-00 flex'>
                            <div className="group relative flex">
                              <Popover.Button
                                className={
                                  
                                    'group-hover:border-indigo-600 gap-x-2  group-hover:text-indigo-600 border-b-2 border-transparent text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center  pt-px text-sm font-medium transition-colors duration-200 ease-out'}
>
                                {category.name}
                                <div className='flex   items-center '>
                                 <IoIosArrowDown className='group-hover:rotate-180 transition-rotate transition ease-out duration-200 h-4 w-4' />
                                </div>
                              </Popover.Button>
                              
                            </div>

                            <div
                              // group-hover:translate-x-full translate-y-[4rem] translate-y-[-30rem] transform hidden group-hover:block transition ease-in-out duration-500 sm:duration-700
                              className='transition ease-in-out delay-200 duration-500  group-hover:block hidden    fixed mx-auto left-0 -z-10 top-20 w-full   '
                            >
                              <div className="absolute inset-x-0 top-full text-sm text-gray-500">
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                <div className="relative bg-white">
                                  <div className="mx-auto max-w-7xl px-8">
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                      <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                        {category.featured.map((item) => (
                                          <div key={item.name} className="group/img relative text-base sm:text-sm">
                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover/img:opacity-75">
                                              <img
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                className="object-cover w-full object-center"
                                              />
                                            </div>
                                            <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                              <span className="absolute inset-0 z-10" aria-hidden="true" />
                                              {item.name}
                                            </a>
                                            <p aria-hidden="true" className="  mt-1">
                                              <button className='bg-yellow-400 text-black px-2 py-1 '>Shop now</button>
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                        {category.sections.map((section) => (
                                          <div key={section.name}>
                                            <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                              {section.name}
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${section.name}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {section.items.map((item) => (
                                                <li key={item.name} className="flex">
                                                  <a href={item.href} className="hover:text-gray-800">
                                                    {item.name}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        
                      </Popover>
                    ))}
                    </div>

                    

                    


                    {navigation.pages.map((page) => (
                      <a
                        key={page.name}
                        href={page.href}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {page.name}
                      </a>
                    ))}
                  </div>
                </Popover.Group>

                <div className="ml-auto flex items-center">
                  {isAuthenticated ? 

                  (
                    <div  className={` place-content-center hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6`}>

                      <Avatar/>
                      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />

                    </div>
                    
                  )
                  
                  : 
                  
                  (
                    <div  className={` place-content-center hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6`}>
                      <div onClick={()=>setsignin(true)}  className={` cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-800`}>
                        Sign in
                      </div>
                      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                      <div onClick={()=>setsignUp(true)}  className={` cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-800`}>
                        Create account
                      </div>
                    </div>
                  )}


                  {/* fav */}
                  {/* <div className="flex lg:ml-6" onClick={isAuthenticated ? () => setshoppingCart(true) : () => setsignin(true)}>
                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Favorite</span>
                      <HeartIcon className="h-6 w-6 rounded-full" aria-hidden="true" />
                    </a>
                  </div> */}

                  

                  {/* Search */}
                  <div className="flex lg:ml-6" onClick={()=>SetSearchBar(true)}>
                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Cart */}
                  <div className="relative ml-4 flow-root lg:ml-6" onClick={isAuthenticated ? () => setshoppingCart(true) : () => setsignin(true)}  >
                    <a href="#" className="group -m-2 flex items-center p-2">
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="absolute left-1 bottom-2 ml-2 text-[0.8rem] font-medium text-gray-100 group-hover:text-gray-800 bg-indigo-500  px-[0.4rem] py-0 rounded-full">{isAuthenticated ? itemCount : null}</span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        
      </div>
     </>
  )
}
