
import { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';
import product from "../Data/products.json";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function QuickPreview(Props) {
  // const [open, setOpen] = useState(false)
 


  return (
   <> 
   
   <Transition.Root show={Props.open} as={Fragment}>
      <Dialog as="div" className="relative z-999" onClose={Props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"                             
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0   bg-gray-500 bg-opacity-75 transition-opacity " />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full  justify-center text-center items-center px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className=" p-[1rem] pt-[5rem] sm:mt-0 flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className=" relative flex w-full  items-center overflow-hidden bg-white rounded-md px-8 pb-8 pt-0 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button
                    type="button"
                    className="  absolute right-9 top-10 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => Props.setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  
                  {product.filter(product => product.id === Props.CategoryId).map(product => (

                    <div key={product.id} >
                      {product.data.filter(dataItem => dataItem.id === Props.CubeId).map(dataItem => (
                          <div key={dataItem.id} className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                            <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                            <Link to={`/productview/${product.id}/${dataItem.id}`} onClick={() => Props.setOpen(false)}>
                              <img src={dataItem.imageSrc} alt={dataItem.imageAlt} className="cursor-pointer object-cover object-center" />
                            </Link>
                            </div>
                            <div className="sm:col-span-8 lg:col-span-7">
                              <h2 className="text-2xl font-bold text-gray-900 sm:pr-12 py-8">Puzzle Category : {product.name}</h2>
                              {/* Nested map function to iterate over data array */}
                                
                                  <div key={dataItem.id}>
                                    <h3>{dataItem.name}</h3>
                                    <p>{dataItem.price}</p>
                                  </div>
                                
                              <section aria-labelledby="options-heading" className="mt-10">
                                <h3 id="options-heading" className="sr-only">Product options</h3>
                                <form>
                                  {/* Colors */}
                                  {/* Sizes */}
                                  <button
                                    type="submit"
                                    className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                    Add to bag
                                  </button>
                                </form>
                              </section>
                            </div>
                          </div>
                       ))}
                    </div>
                  ))}

                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
   </> 
  )
}


