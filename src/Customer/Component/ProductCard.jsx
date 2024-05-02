import { useState } from "react";
import products from "./Data/products.json";
import QuickPreview from "./Product/QuickPreview";

export default function ProductCard() {
  const [open, setOpen] = useState(false);
  const [PuzzleId, setPuzzleId] = useState(0);
  const [CubeId, setCubeId] = useState(0);


 
  const lastDataItems = products.map(item => {
    const lastDataItem = item.data[item.data.length - 1];
    return { [`id${item.id}`]: lastDataItem };
  });
  
  console.log(lastDataItems);
  
  
  return (
    <>
      <QuickPreview CategoryId={PuzzleId} CubeId={CubeId} setOpen={setOpen} open={open} />
      <div className="mx-auto max-w-2xl px-0 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">New Arrival</h2>
        
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="">
             {product.data[product.data.length - 1] && (
                <div
                  key={product.data[product.data.length - 1].id}
                  onClick={() => {
                    setOpen(true);
                    setPuzzleId(product.id);
                    setCubeId(product.data[product.data.length - 1].id);
                  }}
                  className="group  cursor-pointer bg-gray-100  hover:bg-indigo-500 transform-bg duration-500 group px-2 py-2 rounded-lg relative"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                    <img
                      src={product.data[product.data.length - 1].imageSrc}
                      alt={product.data[product.data.length - 1].imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full scale-[1] group-hover:scale-[1.1] rounded-sm transform-scale duration-500"
                    />
                  </div>
                  <div className="mt-4 justify-between">
                    <div>
                      <h3 className="text-sm group-hover:text-white transform-text duration-500 text-gray-700">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 group-hover:text-white transform-text duration-500 text-gray-900"
                        />
                        {product.data[product.data.length - 1].name}
                      </h3>
                      <p className="mt-1 py-1 text-sm group-hover:text-yellow-300 transform-text duration-500 text-gray-500">
                        {product.data[product.data.length - 1].color}
                      </p>
                    </div>
                    <p className="text-sm w-fit px-4 py-2 font-medium bg-yellow-400 rounded-md text-gray-900">
                      {product.data[product.data.length - 1].price}
                    </p>
                  </div>
                </div>
             )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
