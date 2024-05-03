
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import CloseIcon from '@mui/icons-material/Close';
import pagelogo from "../Data/images-app/page-logo.jpg";
import SearchBox from '../../SearchBox';
import SHoppingCart from "../SHoppingCart";
import { Hidden } from '@mui/material';
import navigation from "../Data/navigation.json";
import UserEntry from '../../../Auth/UserEntry';
import userDAta from "../Data/user.json";
import { Block } from '@mui/icons-material';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [Ad, setAd] = useState(true);
  const[SearchBar,SetSearchBar]=useState(false);
  const [shoppingCart, setshoppingCart] = useState(false);
  const [signin, setsignin] = useState(false);
  const [signinUp, setsignUp] = useState(false);

  const Authenticated = userDAta.Auth;

  return (
    <>
    <SearchBox open={SearchBar} setOpen={SetSearchBar}/>
    <SHoppingCart open={shoppingCart} setOpen={setshoppingCart}/>
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
                  {Authenticated ?
                    <div className="flex justify-between">
                      <div className={`px-4 py-2 text-white rounded-full bg-yellow-400 uppercase cursor-pointer w-fit ${!Authenticated ? "hidden" : "Block"} `}>{userDAta.name.charAt(0) }</div>
                      <div  className='bg-indigo-500 rounded-md flex w-100 justify-center items-center text-white p-1 px-3' >Logout</div>
                    </div>
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
       <p className={`${Ad? "h-10": "h-0 hidden" } transform-h flex relative  items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8`}>
            <h1>Get 20% Discount on orders over ₹ 599/-</h1> 
            <div className="item-right absolute right-10 w-0 md:right-40 md:w-10 cursor-pointer " onClick={()=>setAd(false)}>
            <CloseIcon/>
            </div>
          </p>

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
                    {navigation.categories.map((category) => (
                      <Popover key={category.name} className="flex">
                        {({ open }) => (
                          <>
                            <div className="relative flex">
                              <Popover.Button
                                className={classNames(
                                  open
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-none text-gray-700 hover:text-gray-800',
                                  'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                )}
                              >
                                {category.name}
                              </Popover.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                <div className="relative bg-white">
                                  <div className="mx-auto max-w-7xl px-8">
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                      <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                        {category.featured.map((item) => (
                                          <div key={item.name} className="group relative text-base sm:text-sm">
                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
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
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ))}

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
                  {Authenticated ? 

                  (
                    <div  className={` place-content-center hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6`}>
                      <div className={`px-4 py-2 text-white rounded-full bg-yellow-400 uppercase cursor-pointer  `}>{userDAta.name.charAt(0) }</div>
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

                  <div className="hidden lg:ml-8 lg:flex">
                    <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                      <span className="ml-3 block text-sm font-medium">INR</span>
                      <span className="sr-only">, change currency</span>
                    </a>
                  </div>

                  {/* Search */}
                  <div className="flex lg:ml-6" onClick={()=>SetSearchBar(true)}>
                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6" onClick={Authenticated ? () => setshoppingCart(true) : () => setsignin(true)}  >
                    <a href="#" className="group -m-2 flex items-center p-2">
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
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
