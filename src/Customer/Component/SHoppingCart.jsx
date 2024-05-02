import { Fragment, useState ,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import products from "./Data/products.json";
import userData from "./Data/user.json";

export default function SHoppingCart(Props) {
//   const [open, setOpen] = useState(true)
const { Shopping_bag } = userData;
const [categoryIds, setCategoryIds] = useState([2,4]);
const [productIds, setProductIds] = useState([2,1]);

// Initialize arrays to hold product_ids and Category_ids
const productIds1 = [];
const categoryIds1 = [];

// Iterate through Shopping_bag and extract product_ids and Category_ids
userData.Shopping_bag.forEach(item => {
  if (item && item.product_id) {
    productIds1.push(item.product_id);
  }
  if (item && item.Category_id) {
    categoryIds1.push(item.Category_id);
  }
});

console.log("Product IDs:", productIds1);
console.log("Category IDs:", categoryIds1);



 
  return (
    <Transition.Root show={Props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={Props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
           </Transition.Child>

            <div className="fixed inset-0 overflow-hidden ">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white pt-[6.5rem] shadow-xl">
                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                <div className="ml-3 flex h-7 items-center">
                                <button
                                    type="button"
                                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                    onClick={() => Props.setOpen(false)}
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Close panel</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flow-root">
                               
                                <div  className="">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {products.filter(product => [1,2].includes(product.id)).map(product => (
                                                <div key={product.id} className="">
                                                    {product.data .filter(item => [1,2].includes(item.id)).map(item => (
                                                            <li key={item.id} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                        src={item.imageSrc}
                                                                        alt={item.imageAlt}
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>
                                                                            <a href={item.href}>{item.name}</a>
                                                                        </h3>
                                                                        <p className="ml-4">{item.price}</p>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                                                                    
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <p className="text-gray-500">Qty 1</p>
                                                                        <div className="flex">
                                                                            <button
                                                                                type="button"
                                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                            >
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                </div>
                                        ))}
                                    </ul>
                                </div>
                              

                                </div>
                            </div>
                            </div>

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>$262.00</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <a
                                href="#"
                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                Checkout
                                </a>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                or{' '}
                                <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() => Props.setOpen(false)}
                                >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                                </p>
                            </div>
                            </div>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </div>
      </Dialog>
    </Transition.Root>
  )
}
