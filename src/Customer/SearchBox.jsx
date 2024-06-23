import { Fragment, useRef, useState ,useEffect} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
import { Link} from 'react-router-dom';


export default function SearchBox(Props) {
  const cancelButtonRef = useRef(null)

  const open =Props.open;
  const setOpen=Props.setOpen;
 


  // search bar logic 

  const [searchTerm, setSearchTerm] = useState('');
  const [productIds, setProductIds] = useState([]);
  const [error, setError] = useState('');


  const handleSearch = async () => {
    
    try {
      const response = await axios.get(`http://localhost:5000/products?q=${searchTerm}`);
      setProductIds(response.data); // Assuming response.data is an array of product IDs
    } catch (error) {
      console.error('Error fetching products:', error);
      // setError(error);
      // Handle error, e.g., show a message to the user
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-70 items-center justify-center p-4 text-center  sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg shadow-sm shadow-gray-400 text-left   transition-all sm:my-8 w-full max-w-md">
              <form className="max-w-md mx-auto w-full">
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
    Search
  </label>
  <div className="relative">
    <input
      id="default-search"
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="block w-full sm:max-w-lg px-4 py-4 placeholder:text-gray-500 text-md text-gray-900 border-b-[1px] bg-gray-50 focus:outline-none focus:ring-yellow-500"
      placeholder="Find cubes..."
      required
    />
    <button
      type="button" // Specify type="button" to prevent form submission
      onClick={handleSearch}
      className="absolute right-2.5 bottom-3.5 pr-2 font-medium text-sm text-gray-400"
    >
      <IoSearchOutline className="h-6 w-6" />
    </button>
  </div>
</form>

                {/* search things */}
                <div className="bg-gray-50  py-0 px- pb-0 overflow-y-auto max-h-60">
                    <ul className="divide-y divide-gray-200">
                      {error && 
                        <li className="flex items-center truncate justify-between p-4" id="headlessui-combobox-option-:rp:" role="option" tabindex="-1" aria-selected="false" data-headlessui-state="">
                          <span className="whitespace-nowrap font-semibold truncate text-red-500"> <h1>{error}</h1></span>
                          <span className="ml-4 text-right text-xs text-slate-600 truncate"></span>
                        </li>
                        }

                      {productIds.map((id) => (
                      <li key={id} className="flex items-center truncate justify-between p-4" id="headlessui-combobox-option-:rp:" role="option" tabindex="-1" aria-selected="false" data-headlessui-state="">
                        <span className="whitespace-nowrap font-semibold truncate text-slate-900">
                        <Link
                         to={`/productview/${window.btoa(id*721426)}`} > Cube {id}</Link>
                          </span>
                        <span className="ml-4 text-right text-xs text-slate-600 truncate">Category / 3x3 cubes</span>
                      </li>
                      ))}
                    
                     
                     
                    </ul>
                </div>
              </Dialog.Panel>
              
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
