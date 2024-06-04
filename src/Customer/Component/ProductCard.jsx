import { useState,useEffect } from "react";
import products from "./Data/products.json";
import QuickPreview from "./Product/QuickPreview";
import axios from 'axios';


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
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          const showOwners = response.data.map(shop => ({
            id: shop.id,
            // Other fields if needed
          }));
          setShopId(showOwners);
        } catch (error) {
          console.error('Error fetching shops:', error);
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
      if (shopId.length > 0 && token) {
        fetchProducts();
      }
    }, [shopId, token]);
    
    
    // Render your UI using productdata and errorMessage
    


  
  return (
    <>
      <QuickPreview ShopIDsend={ShopIDsend} CubeId={CubeId} catId={catId} setOpen={setOpen} open={open} />
      <div className="mx-auto max-w-2xl px-0 py- sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">New Arrival</h2>
        
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-3 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {productdata.map((product) => (
          <div  key={product.id} className="">
            <div
              onClick={() => {
                setOpen(true);
                setCubeId(product.id);
                setShopIDsend(product.shop_id);
                setcatId(product.category_id);
                
                // setCubeId(product.data[product.data.length - 1].id);
              }}
              className="group cursor-pointer bg-gray-100 hover:bg-indigo-500 transition duration-500 px-2 py-2 rounded-lg relative"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover object-center lg:w-full lg:h-full transition-transform duration-500 group-hover:scale-105 rounded-sm"
                />
                
              </div>
              <div className="mt-4  justify-between">
                  <div>
                    <h3 className="text-sm group-hover:text-white text-gray-700">
                      {product.name}
                    </h3>
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


        </div>
      </div>
    </>
  );
}

// {products.map((product) => (
//   <div key={product.id} className="">
//    {product.data[product.data.length - 1] && (
//       <div
//         key={product.data[product.data.length - 1].id}
//         onClick={() => {
//           setOpen(true);
//           setPuzzleId(product.id);
//           setCubeId(product.data[product.data.length - 1].id);
//         }}
//         className="group  cursor-pointer bg-gray-100  hover:bg-indigo-500 transform-bg duration-500 group px-2 py-2 rounded-lg relative"
//       >
//         <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
//           <img
//             src={product.data[product.data.length - 1].imageSrc}
//             alt={product.data[product.data.length - 1].imageAlt}
//             className="h-full w-full object-cover object-center lg:h-full lg:w-full scale-[1] group-hover:scale-[1.1] rounded-sm transform-scale duration-500"
//           />
//         </div>
//         <div className="mt-4 justify-between">
//           <div>
//             <h3 className="text-sm group-hover:text-white transform-text duration-500 text-gray-700">
//               <span
//                 aria-hidden="true"
//                 className="absolute inset-0 group-hover:text-white transform-text duration-500 text-gray-900"
//               />
//               {product.data[product.data.length - 1].name}
//             </h3>
//             <p className="mt-1 py-1 text-sm group-hover:text-yellow-300 transform-text duration-500 text-gray-500">
//               {product.data[product.data.length - 1].color}
//             </p>
//           </div>
//           <p className="text-sm w-fit px-4 py-2 font-medium bg-yellow-400 rounded-md text-gray-900">
//             {product.data[product.data.length - 1].price}
//           </p>
//         </div>
//       </div>
//    )}
//   </div>
// ))}
