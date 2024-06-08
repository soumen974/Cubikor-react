import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NotFound from '../NotFound';
import SuggestedProduct from './SuggestedProduct';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductOverview() {
  const { CubeId } = useParams();
  const cubeId = parseInt(CubeId);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [productdata, setProductdata] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${cubeId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setProductdata(userData);
        } else {
          const errorData = await response.json();
          console.log(errorData.message || 'Error retrieving products');
        }
      } catch (error) {
        console.error('An error occurred, please try again later:', error);
      }
    };

    fetchCategories();
  }, [cubeId, token]);

  const userId = localStorage.getItem('userId');
  const Authenticated = localStorage.getItem('isUserAuthenticated');
  const CategoryId = productdata?.category_id;
  const productId = productdata?.id;
  const shopId = productdata?.shop_id;
  const quantity = 1;

  const AddingToBag = async (e) => {
    e.preventDefault();
    if (Authenticated) {
      try {
        const payload = {
          CategoryId: CategoryId,
          productId: productId,
          shopId: shopId,
          quantity: quantity 
        };
        const response = await axios.post(
          `http://localhost:5000/users/${userId}/shopping_cart`, payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        setErrors([]);
      } catch (error) {
        console.error('Error adding item to cart:', error);
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/shops/${shopId}/categories/${CategoryId}`, {
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

    if (shopId && CategoryId) {
      fetchCategory();
    }
  }, [shopId, token, CategoryId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (productdata) {
      document.title = `Cubikor - ${productdata.name}`;
    }
  }, [productdata]);

  if (!productdata) {
    return <div>Loading...</div>;
  }

  const pagenation = {
    name: '3x3 cubes',
    breadcrumbs: [
      { id: 1, name: 'Home', href: '/' },
    ]
  };

  return (
    <div className="bg-white">
      <div>
        <div className="mt-20 text-gray-900">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {pagenation.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                      {breadcrumb.name}
                    </a>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a href={pagenation.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                  {categoryData?.name}
                </a>
              </li>
            </ol>
          </nav>
        </div>

        <div className="pt-20">
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:-mt-5 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={productdata.imageSrc}
                alt={productdata.imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={productdata.imageSrc}
                  alt={productdata.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={productdata.imageSrc}
                  alt={productdata.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={productdata.imageSrc}
                alt={productdata.imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{productdata.name}</h1>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">₹{productdata.price}</p>
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          productdata.rating > rating ? 'text-gray-900' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{productdata.rating} out of 5 stars</p>
                  <a href="/new" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {productdata.reviewCount} reviews
                  </a>
                </div>
              </div>

              <form onSubmit={AddingToBag} className="mt-1">
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to bag
                </button>
                <button
                  className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-300 px-8 py-3 text-base font-medium text-black hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  Buy Now
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">{productdata.description}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-400">
                      <span className="text-gray-600">{productdata.highlights}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{productdata.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <SuggestedProduct categoryName={categoryData?.name} catID={categoryData?.id} />
        </div>
      </div>
    </div>
  );
}


// ----------------------------------


// {productData .filter(product => product.id === categoryId).map(filteredProduct => (
//   <div key={filteredProduct.id}>
//      {/* pagination */}
//     <div className=" mt-20 text-gray-900">
//       <nav aria-label="Breadcrumb">
//         <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
//           {pagenation.breadcrumbs.map((breadcrumb) => (
//             <li key={breadcrumb.id}>
//               <div className="flex items-center">
//                 <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
//                   {breadcrumb.name}
//                 </a>
//                 <svg
//                   width={16}
//                   height={20}
//                   viewBox="0 0 16 20"
//                   fill="currentColor"
//                   aria-hidden="true"
//                   className="h-5 w-4 text-gray-300"
//                 >
//                   <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
//                 </svg>
//               </div>
//             </li>
//           ))}
//           <li className="text-sm">
//             <a href={pagenation.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
//               {filteredProduct.name}
//             </a>
//           </li>
//         </ol>
//       </nav>
//     </div>

//      {filteredProduct.data.filter(dataItem => dataItem.id === cubeId).map(dataItem => (
//           <div key={dataItem.id}  className="pt-20">
//                <div className="hidden">{ document.title = `Cubikor- ${filteredProduct.name} | ${dataItem.name}`}</div>

              
//               <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:-mt-5 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
//                   <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
//                           <img
//                               src={dataItem.imageSrc} alt={dataItem.imageAlt} 
//                               className="h-full w-full object-cover object-center"
//                             />
//                   </div>
//                   <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
//                     <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
//                           <img
//                               src={dataItem.imageSrc} alt={dataItem.imageAlt} 
//                               className="h-full w-full object-cover object-center"
//                             />
//                     </div>
//                     <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
//                           <img
//                               src={dataItem.imageSrc} alt={dataItem.imageAlt} 
//                               className="h-full w-full object-cover object-center"
//                             />
//                     </div>
//                   </div>
//                   <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
//                           <img
//                               src={dataItem.imageSrc} alt={dataItem.imageAlt} 
//                               className="h-full w-full object-cover object-center" />
//                   </div>
//                </div>
              
//               {/* details */}
//               <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                
//                 <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
//                   <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{dataItem.name}</h1>
//                 </div>

//                 {/* Options */}
//                 <div className="mt-4 lg:row-span-3 lg:mt-0">
//                   <h2 className="sr-only">Product information</h2>
//                   <p className="text-3xl tracking-tight text-gray-900">{dataItem.price}</p>
//                 {/* Reviews */}
//                     <div className="mt-6">
//                       <h3 className="sr-only">Reviews</h3>
//                       <div className="flex items-center">
//                                   <div className="flex items-center">
//                                     {[0, 1, 2, 3, 4].map((rating) => (
//                                       <StarIcon
//                                         key={rating}
//                                         className={classNames(
//                                           dataItem.rating > rating ? 'text-gray-900' : 'text-gray-200',
//                                           'h-5 w-5 flex-shrink-0'
//                                         )}
//                                         aria-hidden="true"
//                                       />
//                                     ))}
//                                   </div>
//                                   <p className="sr-only">{dataItem.rating} out of 5 stars</p>
//                                   <a href="/new" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
//                                     {dataItem.reviewCount} reviews
//                                   </a>
//                       </div>
//                     </div>

//                     <form className="mt-1">
//                       <button
//                         type="submit"
//                         className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                       >
//                         Add to bag
//                       </button>
//                       <button
//                         type="submit"
//                         className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-300 px-8 py-3 text-base font-medium text-black hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
//                       >
//                         Buy Now
//                       </button>
//                     </form>
                                  
//                 </div>

//                 <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                  
//                   {/* Description and details */}
//                   <div>
//                     <h3 className="sr-only">Description</h3>

//                     <div className="space-y-6">
//                       <p className="text-base text-gray-900">{dataItem.description}</p>
//                     </div>
//                   </div>

//                   <div className="mt-10">
//                     <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

//                     <div className="mt-4">
//                       <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
//                         {dataItem.highlights.map((highlight) => (
//                           <li key={highlight} className="text-gray-400">
//                             <span className="text-gray-600">{highlight}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
                
//                   <div className="mt-10">
//                     <h2 className="text-sm font-medium text-gray-900">Details</h2>

//                     <div className="mt-4 space-y-6">
//                       <p className="text-sm text-gray-600">{dataItem.details}</p>
//                     </div>
//                   </div>
                  
//                 </div>

//               </div>
              

//           </div>
        
            
//         ))}
    
//       <div className="">
//         <SuggestedProduct categoryName={filteredProduct.name} catID={categoryId}/>
//       </div>
//     </div> 
//   ))}