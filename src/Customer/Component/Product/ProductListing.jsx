import { useState } from "react";
import products from "../Data/products.json";
import QuickPreview from "./QuickPreview";

export default function ProductListing() {
  const [open, setOpen] = useState(false);
  const [PuzzleId, setPuzzleId] = useState(0);
  const [CubeId, setCubeId] = useState(0);

  
  return (
    <>
      <QuickPreview CategoryId={PuzzleId} CubeId={CubeId} setOpen={setOpen} open={open} />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        
        <div className="">
          {products.map((product) => (
            <div key={product.id} className="">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 py-5">Category : {product.name}</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    { product.data.map((item) => (
                        <div key={item.id} onClick={() => { setOpen(true); setPuzzleId(product.id);setCubeId(item.id); }} className="group cursor-pointer bg-gray-100 hover:bg-indigo-500 transform-bg duration-500 group px-2 py-2 rounded-lg relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                            <img
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full scale-[1] group-hover:scale-[1.1] rounded-sm transform-scale duration-500"
                            />
                            </div>
                            <div className="mt-4 justify-between">
                            <div>
                                <h3 className="text-sm group-hover:text-white transform-text duration-500 text-gray-700">
                                <span aria-hidden="true" className="absolute inset-0 group-hover:text-white transform-text duration-500 text-gray-900" />
                                {item.name}
                                </h3>
                                <p className="mt-1 py-1 text-sm group-hover:text-yellow-300 transform-text duration-500 text-gray-500">{item.color}</p>
                            </div>
                            <p className="text-sm w-fit px-4 py-2 font-medium bg-yellow-400 rounded-md text-gray-900">{item.price}</p>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
