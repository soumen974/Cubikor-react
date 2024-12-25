import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import PageLoder from '../Loaders/PageLoder';


const IoSearchOutline = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
};


export default function SearchBox(Props) {
  const cancelButtonRef = useRef(null)


  // search bar logic 

  const [searchTerm, setSearchTerm] = useState('');
  const [productIds, setProductIds] = useState([]);
  const [error, setError] = useState('');
  const [isloading, setisloading] = useState(false)
  const Navigate = useNavigate();

  


  const handleSearch = async () => {
    setisloading(true);
   
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/products?q=${searchTerm}`);
      setProductIds(response.data); // Assuming response.data is an array of product IDs
      fetchCategories();
      setError(false)
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setError(error.response.data.message);
        } else {
          setError(`Error fetching products: ${error.response.data.message}`);
        }
      } else {
        setError('Error fetching products');
      }
      setisloading(false);
    }
  };

  // fire the search on cheage on field 
  const handleChangeField = (e) => {
    setSearchTerm(e.target.value);
    handleSearch();
    if (e.key === 'Enter') {
      e.preventDefault();
      Navigate(`/result?q=${searchTerm}`);
      Props.setOpen(false);
    }
  };


  // get the products from ids 
  const token = localStorage.getItem('token');
  const [productdata, setProductdata] = useState([]);

 
    const fetchCategories = async () => {
        try {
            if (Array.isArray(productIds) && productIds.length > 0) {
                const responses = await Promise.all(productIds.map(id => 
                    fetch(`${REACT_APP_API_URL}/products/${id}`, {
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
                        setError("Error retrieving product:", errorData);
                        return null;
                    }
                }));

                const validData = productsDataArray.filter(data => data !== null);
                setisloading(false);
                setProductdata(validData);
            }
        } catch (error) {
          setError('An error occurred, please try again later:', error);
          setisloading(false);
        }
    };

   

  

  return (
    <Transition.Root show={Props.open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={Props.setOpen}>
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
              <form onSubmit={handleSearch} className="max-w-md mx-auto w-full">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
                  Search
                </label>
                <div className="relative">
                  <input
                    id="default-search"
                    type="text"
                    value={searchTerm}
                    onChange={handleChangeField}
                    onKeyDown={handleChangeField}
                    className="block w-full sm:max-w-lg px-4 py-4 placeholder:text-gray-500 text-md text-gray-900 border-b-[1px] bg-gray-50 focus:outline-none focus:ring-yellow-500"
                    placeholder="Find cubes..."
                    required
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-2.5 bottom-3.5 pr-2 font-medium text-sm text-gray-400"
                  >
                    <IoSearchOutline className=" size-6" />
                  </button>
                </div>
              </form>

                {/* search things */}
                <div className="bg-gray-50  py-0 px- pb-0 overflow-y-auto max-h-60">
                    <ul className="divide-y divide-gray-200">
                      {error && 
                        <li className="flex items-center truncate justify-between p-4" >
                          <span className="whitespace-nowrap font-semibold truncate text-red-500"> <h1>{error}</h1></span>
                          <span className="ml-4 text-right text-xs text-slate-600 truncate"></span>
                        </li>
                        }
                      {isloading && 
                        <li className="flex items-center truncate justify-center p-4" >
                          <span className="whitespace-nowrap font-semibold truncate flex justify-center "> <h1><PageLoder/></h1></span>
                        </li> }

                     

                      {productdata.map((product) => (
                        <li key={product.id} className="flex items-center truncate justify-between p-4" id="headlessui-combobox-option-:rp:" role="option" tabindex="-1" aria-selected="false" data-headlessui-state="">
                        <span className="whitespace-nowrap font-semibold truncate text-slate-900">
                        <Link onClick={()=>{Props.setOpen(false)}} className='flex' to={`/productview/${window.btoa(product.id*721426)}`} >
                        
                          <img
                              src={`${REACT_APP_API_URL}/${product.product_image}`}
                              alt={product.name}
                              className="h-6 w-6 rounded-full object-cover object-center"
                          />
                          
                         {product.name}
                         </Link>
                          </span>
                        <span className="ml-4 text-right text-xs text-slate-600 truncate">
                          Category / 3x3 cubes
                          

                        </span>
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
