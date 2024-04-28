import { useState } from "react";
import products from "./Data/products.json";
import QuickPreview from "./Product/QuickPreview";

  export default function ProductCard() {
    const [open, setOpen] = useState(false);
    const [GetId, setGetId] = useState(0)
    
    return (
      <>
      <QuickPreview productId={GetId} setOpen={setOpen} open={open} />
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">New Arrival</h2>
  
          <div onClick={()=>setOpen(true)} className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} onClick={()=>setGetId(product.id)}  className="group  bg-gray-100 px-2 py-2 rounded-md relative">
                <div className="aspect-h-1 aspect-w-1 w-full  overflow-hidden rounded-md bg-gray-200 lg:aspect-none  lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover  object-center lg:h-full lg:w-full scale-[1] group-hover:scale-[1.1] rounded-sm transform-scale duration-500"
                  />
                </div>
                <div className="mt-4  justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <div >
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </div>
                    </h3>
                    <p className="mt-1 py-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm w-fit px-4 py-2 font-medium bg-yellow-400  rounded-md  text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </>

    )
  }
  