import React from 'react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';


export default function TostBox(Props) {
  return (
    <>
   <div className="z-50 fixed top-2 md:px-[30%] w-full ">
        <div className="flex  items-center w-fit  px-4  py-3 space-x-4  text-gray-500 bg-white divide-x  divide-gray-200 rounded-md shadow-md border space-x " role="alert">
            <div className={`mx-auto flex  flex-shrink-0 items-center justify-center rounded-full ${Props.success? "bg-green-100":(Props.error? "bg-red-100":"")}  p-2`}>
                {Props.success? <CheckIcon className="h-5 w-5 text-green-600" aria-hidden="true" />:null}
                {Props.error? <ExclamationTriangleIcon className="h-5 w-5 text-red-600" aria-hidden="true" />:null}
            </div>
            <div className="px-3 text-sm font-normal">{Props.message}</div>
        </div>
   </div>

    </>
  )
}
