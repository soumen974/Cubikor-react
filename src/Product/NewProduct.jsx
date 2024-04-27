import React from 'react'

export default function NewProduct() {

    const product = {
        name: '3x3 cubes',
        breadcrumbs: [
          { id: 1, name: 'Home', href: '/' },
          { id: 2, name: 'New', href: '/new' },
        ]};
  return (
    <>
    <div className='h-screen px-[8rem] py-[5rem] flex'>
        {product.breadcrumbs.map((breadcrumb) => (
            <div key={breadcrumb.id}>
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
            </div>
            ))}
            <div className="text-sm">
            <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
            </a>
            </div>
    </div>
    </>
  )
}
