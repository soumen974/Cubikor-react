import { useState} from "react";
import productData from "../Data/products.json";
import QuickPreview from "./QuickPreview";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";

export default function CategoryProduct() {
  const [open, setOpen] = useState(false);
  const [PuzzleId, setPuzzleId] = useState(0);
  const [CubeId, setCubeId] = useState(0);

  const { CategoryPageID } = useParams();

  const categoryId = parseInt(CategoryPageID);

  const selectedProduct = productData.find(product => product.id === categoryId);

if (!selectedProduct ) {
  return <NotFound/>;
}
  else{
    document.title = `Cubikor | ${selectedProduct.name} `;

  }

  const product = {
    name: '3x3 cubes',
    breadcrumbs: [
      { id: 1, name: 'Home', href: '/' },
    ]};


    

  
  return (
    <>
      <QuickPreview CategoryId={PuzzleId} CubeId={CubeId} setOpen={setOpen} open={open} />
      <div className="mx-auto max-w-2xl px-2 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        
        <nav aria-label="Breadcrumb" className="mt-10 md:mt-20">
          <ol  className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
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
                    {productData.filter(product => product.id === categoryId).map(product => (
                      <div key={productData.id} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                      {product.name}
                      </div>
                     ))}
                </li>
            
          </ol>
        </nav>
        

        <div className="">
          {productData.filter(product => product.id === categoryId).map(product => (
            <div key={product.id}  className="">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 py-5">Category : {product.name} </h2>
                <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-3 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
