
import Products from './Components/Products'
import Category from './Components/Category'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DashBoard() {
  const product = {
    name: '3x3 cubes',
    breadcrumbs: [
      { id: 1, name: 'Dashboard', href: '/seller' },
    ]};

  return (
    <>
     
      <div className=" ">
        <header className="pb-6">
          <ol role="list" className="mx-auto flex  items-center space-x-2  lg:px-5">
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
          </ol>
        </header>
        <main className=' grid'>
          <div className="">
            <Category/>
          </div>
          <div className=" overflow-x-auto">
          <Products/>
          </div>
        </main>
      </div>
    </>
  )
}
