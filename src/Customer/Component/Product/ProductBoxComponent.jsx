import React from 'react'
import { Link } from 'react-router-dom'

{/* <ProductBox image={favorite.image_src} name={favorite.product_name} price={favorite.price} /> */}


export default function ProductBoxComponent({image,name,price,id}) {
  return (
    <>
       
    
    
       
        <div
        //   onClick={() => {
        //     setOpen(true);
        //     setCubeId(product.id);
        //     setShopIDsend(product.shop_id);
        //     setcatId(product.category_id);
            
        //   }}
            className="group cursor-pointer group  bg-gray-100 hover:bg-indigo-500 transition duration-500 px-2 py-2  rounded-lg relative"
        >  
        
            <div className="p-2 absolute hidden group-hover:block  top-3 z-40 text-gray-200 group hover:text-indigo-500">
            <span className="sr-only">Favorite</span>
            {/* <Favorite prdId={product.id} prdName={product.name} prdImage_src={product.product_image} prdPrice={product.price}/> */}
            </div>
            
            <div className="aspect-w-1 relative aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:w-[14rem] lg:h-[17rem]">
                <Link to={`/productview/${window.btoa(id*721426)}`}>
            <img
                src={`http://localhost:5000/${image}`}
                alt={"product.imageAlt"}
                className="w-full h-full object-cover object-center lg:w-full lg:h-full transition-transform duration-500 group-hover:scale-105 rounded-sm"
            />
            </Link>
            
            
            </div>

            <div className="mt-4   justify-between">
                <div className="  " >
                <p className="text-sm md:w-[14rem] truncate overflow-hidden group-hover:text-white text-gray-700 w-full ">
                {name}
                </p>
            
                <p className="mt-1 py-1 text-sm group-hover:text-yellow-300 text-gray-500">
                    product.color
                </p>
                </div>
            <p className="text-sm w-fit px-4 py-2 font-medium bg-yellow-400 rounded-md text-gray-900">
            ₹{parseFloat(price)}
            </p>
            </div>
        </div>

    


    
    </>
  )
}
