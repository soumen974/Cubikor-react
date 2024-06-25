import { useState,useEffect,useRef } from "react";
import products from "./Data/products.json";
import QuickPreview from "./Product/QuickPreview";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";



export default function ProductCard() {
  const [open, setOpen] = useState(false);
  const [ShopIDsend, setShopIDsend] = useState(0);
  const [CubeId, setCubeId] = useState(0);


 
  const lastDataItems = products.map(item => {
    const lastDataItem = item.data[item.data.length - 1];
    return { [`id${item.id}`]: lastDataItem };
  });
  
  // console.log(lastDataItems);

  // get-method


  const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); 

    // ----------------shops-all
    const [shopId, setShopId] = useState([]);
    const [productdata, setProductdata] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [catId, setcatId] = useState([]);
    
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/shops`, {
            method: 'GET', 
              headers: {
                'Authorization': `Bearer ${token}`
              }
          });
          
          const showOwners = response.data.map(shop => ({
            id: shop.id,
            // Other fields if needed
          }));
          setShopId(showOwners);
        } catch (error) {
          console.log('Error fetching shops:', error);
        }
      };
    
      fetchCategories();
    }, [token]);
    
    // Use another useEffect for fetching products for each shop
   
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          // Iterate over each shop and fetch products
          await Promise.all(shopId.map(async (shop) => {
            const response = await fetch(`http://localhost:5000/shops/${shop.id}/products`, {
              method: 'GET', 
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
    
            if (response.ok) {
              const userData = await response.json();
              // Append the products to the existing productdata
              setProductdata(prevData => [...prevData, ...userData]);
            } else {
              const errorData = await response.json();
              setErrorMessage(errorData.message || 'Error retrieving products');
            }
          }));
          
        } catch (error) {
          setErrorMessage('An error occurred, please try again later');
        }
      };
    
      // Fetch products when shopId or token changes
      if (shopId.length > 0 ) {
        fetchProducts();
      }
    }, [shopId]);

   
    // slider
    const sliderRef = useRef(null);

    const handleNextClick = () => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: 1090, behavior: 'smooth' }); // Adjust the scroll amount as needed
      }
      
    };

    const handlePrevClick = () => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: -1090, behavior: 'smooth' }); // Adjust the scroll amount as needed
      }
    };
    
    
   

  
  return (
    <>
    <style jsx>{`
      .scrollbar-hide::-webkit-scrollbar {
        display: none; 
      }
      .scrollbar-hide {
        -ms-overflow-style: none; 
        scrollbar-width: none; 
      } 
    `}</style>
       

      <QuickPreview ShopIDsend={ShopIDsend} CubeId={CubeId} catId={catId} setOpen={setOpen} open={open} />
      
      <div className="  relative  isolate mx-auto max-w-2xl px-0 py- sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">New Arrival</h2>
        <abbr title="scroll right  " className="no-underline  hidden cursor-pointer absolute top-20 right-0 h-[2vw] w-6 hover:bg-indigo-500  bg-indigo-600 text-gray-100 px-4 py-5 justify-center lg:flex items-center " onClick={handleNextClick}>
          <button>
            <MdKeyboardArrowRight className="h-6 w-6"/>
          </button> 
        </abbr>

        <abbr title="scroll right  " className="no-underline  hidden cursor-pointer absolute top-40 right-0 h-[2vw] w-6 hover:bg-indigo-500  bg-indigo-600 text-gray-100 px-4 py-5 justify-center lg:flex items-center " onClick={handlePrevClick}>
          <button>
            <MdKeyboardArrowRight className="h-6 w-6 rotate-180"/>
          </button> 
        </abbr>
        {productdata ?
        <div ref={sliderRef} className=" mt-6 grid grid-cols-2 gap-x-3 gap-y-3 md:grid-cols-2 lg:flex xl:overflow-x-auto scrollbar-hide   xl:gap-x-8">
        
        {productdata.map((product) => (
          <div  key={product.id} className="slider-item">
            <div
              onClick={() => {
                setOpen(true);
                setCubeId(product.id);
                setShopIDsend(product.shop_id);
                setcatId(product.category_id);
                
              }}
              className="group cursor-pointer  bg-gray-100 hover:bg-indigo-500 transition duration-500 px-2 py-2  rounded-lg relative"
            >
              
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:w-[14rem] lg:h-[17rem]">
                 <Link to={`/productview/${window.btoa(product.id*721426)}`}>
                <img
                  src={`http://localhost:5000/${product.product_image}`}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover object-center lg:w-full lg:h-full transition-transform duration-500 group-hover:scale-105 rounded-sm"
                />
                </Link>
                
              </div>
              <div className="mt-4   justify-between">
                  <div className="  " >
                    <p className="text-sm md:w-[14rem] truncate overflow-hidden group-hover:text-white text-gray-700 w-full ">
                    {product.name}
                    </p>
                
                    <p className="mt-1 py-1 text-sm group-hover:text-yellow-300 text-gray-500">
                      {product.color}
                    </p>
                  </div>
                <p className="text-sm w-fit px-4 py-2 font-medium bg-yellow-400 rounded-md text-gray-900">
                ₹{parseFloat(product.price)}
                </p>
              </div>
            </div>
          </div>
        ))}


        </div>:
        <>
        <div className="mt-6 animate-pulse grid grid-cols-2 gap-x-3 gap-y-3 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div  className="">
            <div
              
              className="group cursor-pointer bg-gray-100 hover:bg-indigo-500 transition duration-500 px-2 py-2 rounded-lg relative"
            >
              
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                
                <div
                  className="w-full h-full object-cover object-center lg:w-full lg:h-full transition-transform duration-500 group-hover:scale-105 rounded-sm"
                />
              
                
              </div>
              <div className="mt-4  justify-between">
                  <div>
                    <h3 className="text-sm group-hover:text-white w-fit px-[6vw] py-[0.3rem] rounded-full bg-gray-300">
                      
                    </h3>
                    <p className="mt-1  text-sm group-hover:text-yellow-300 px-9 py-[0.3rem] w-fit rounded-full bg-gray-300">
                    </p>
                  </div>
                <p className="mt-2 text-sm w-fit px-8 py-4 font-medium bg-yellow-400 rounded-md text-gray-900">
                
                </p>
              </div>
            </div>
          </div>

          <div  className="">
            <div
              
              className="group cursor-pointer bg-gray-100 hover:bg-indigo-500 transition duration-500 px-2 py-2 rounded-lg relative"
            >
              
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                
                <div
                  className="w-full h-full object-cover object-center lg:w-full lg:h-full transition-transform duration-500 group-hover:scale-105 rounded-sm"
                />
              
                
              </div>
              <div className="mt-4  justify-between">
                  <div>
                    <h3 className="text-sm group-hover:text-white w-fit px-[6vw] py-[0.3rem] rounded-full bg-gray-300">
                      
                    </h3>
                    <p className="mt-1  text-sm group-hover:text-yellow-300 px-9 py-[0.3rem] w-fit rounded-full bg-gray-300">
                    </p>
                  </div>
                <p className="mt-2 text-sm w-fit px-8 py-4 font-medium bg-yellow-400 rounded-md text-gray-900">
                
                </p>
              </div>
            </div>
          </div>

          <div  className="">
            <div
              
              className="group cursor-pointer bg-gray-100 hover:bg-indigo-500 transition duration-500 px-2 py-2 rounded-lg relative"
            >
              
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                
                <div
                  className="w-full h-full object-cover object-center lg:w-full lg:h-full transition-transform duration-500 group-hover:scale-105 rounded-sm"
                />
              
                
              </div>
              <div className="mt-4  justify-between">
                  <div>
                    <h3 className="text-sm group-hover:text-white w-fit px-[6vw] py-[0.3rem] rounded-full bg-gray-300">
                      
                    </h3>
                    <p className="mt-1  text-sm group-hover:text-yellow-300 px-9 py-[0.3rem] w-fit rounded-full bg-gray-300">
                    </p>
                  </div>
                <p className="mt-2 text-sm w-fit px-8 py-4 font-medium bg-yellow-400 rounded-md text-gray-900">
                
                </p>
              </div>
            </div>
          </div>

          <div  className="">
            <div
              
              className="group cursor-pointer bg-gray-100 hover:bg-indigo-500 transition duration-500 px-2 py-2 rounded-lg relative"
            >
              
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                
                <div
                  className="w-full h-full object-cover object-center lg:w-full lg:h-full transition-transform duration-500 group-hover:scale-105 rounded-sm"
                />
              
                
              </div>
              <div className="mt-4  justify-between">
                  <div>
                    <h3 className="text-sm group-hover:text-white w-fit px-[6vw] py-[0.3rem] rounded-full bg-gray-300">
                      
                    </h3>
                    <p className="mt-1  text-sm group-hover:text-yellow-300 px-9 py-[0.3rem] w-fit rounded-full bg-gray-300">
                    </p>
                  </div>
                <p className="mt-2 text-sm w-fit px-8 py-4 font-medium bg-yellow-400 rounded-md text-gray-900">
                
                </p>
              </div>
            </div>
          </div>
        </div>
        </>}

      </div>
      
    </>
  );
}

