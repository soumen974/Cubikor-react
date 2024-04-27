import ProductOverview from "./ProductOverviews"

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
    {
      id: 1,
      name: '3*3 speed cube | rubics cube',
      href: '#',
      imageSrc: 'https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: "3*3 speed cube | rubics cube.",
      price: '$35',
      color: 'Black',
    },
    {
        id: 2,
        name: '3*3 speed cube | rubics cube',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: "3*3 speed cube | rubics cube.",
        price: '$35',
        color: 'Black',
      },
      {
        id: 3,
        name: '3*3 speed cube | rubics cube',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: "3*3 speed cube | rubics cube.",
        price: '$35',
        color: 'Black',
      },
      {
        id: 4,
        name: '3*3 speed cube | rubics cube',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: "3*3 speed cube | rubics cube.",
        price: '$35',
        color: 'Black',
      }
   ]
  export default function ProductCard() {
    return (
      <>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">New Arrival</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ProductOverview/>
      </>

    )
  }
  