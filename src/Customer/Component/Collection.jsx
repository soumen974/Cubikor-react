
const callouts = [
    {
      name: '2x2 Rubics Cube',
      description: 'Embrace the YJ MGC 2x2, a distinguished addition as the second gem in the revered MGC line',
      imageSrc: 'https://www.cubelelo.com/cdn/shop/products/03_3_66f1599e-ac9f-4a20-82fb-1c4373a9504a_600x.jpg?v=1647949949',
      imageAlt: '3x3 Rubics Cube on white background.',
      href: 'products/1',
    },
    {
      name: '3x3 Rubics Cube',
      description: 'Introducing the X-Man Tornado V3, the pinnacle of 3x3 speed cubes from QiYi.',
      imageSrc: 'https://www.cubelelo.com/cdn/shop/files/41JmOabTyeL_1_500x.jpg?v=1711091131',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: 'products/2',
    },
    {
      name: ' Pyraminx',
      description: ' surpasses expectations, delivering an unexpectedly elevated ',
      imageSrc: 'https://www.cubelelo.com/cdn/shop/files/1_36dd8724-241a-4ebc-8a04-cc7819e49a40_600x.png?v=1710159108',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: 'products/4',
    },
  ]
  
  export default function Collection() {
    return (
      <div id="GetYours" className="">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-2 lg:max-w-none lg:py-3">
            <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
  
            <div className=" mt-6 space-y-12 content-box grid md:grid-cols-3  lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 bg-gray-00 p-3 rounded-md">
              {callouts.map((callout) => (
                <div key={callout.name} className="bg-white content-box overflow-hidden  border-[1px] hover:border-none hover:shadow-md  border-gray-200 scale-[1] hover:scale-[1.02] group relative transform-bg duration-500   rounded-md">
                  <div className="relative h-40 w-full group-hover:blur-sm  blur-none  overflow-hidden rounded-md bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-2 lg:aspect-w-1  sm:h-64 ">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center "
                    />
                  </div>

                  <div className=" p-2 group-hover:block  hidden transform-display duration-500   absolute md:top-14 top-1  justify-center">
                    <h3 className=" mt-6 text-sm text-black   p-1 rounded-md   transform-bg duration-500 ">
                      <a  href={callout.href}>
                        <span className="absolute inset-0" />
                        <h1 className="p-1 items-center  flex justify-center ">
                           <h1 className="bg-yellow-300 rounded-full px-5  p-3"> {callout.name}</h1>
                        </h1>
                      </a>
                    </h3>
                    <p className="text-base font-light text-gray-800 px-1 py-1">{callout.description}</p>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  