import React, { useState } from 'react'
import pagelogo from "../../Customer/Component/Data/images-app/page-logo.jpg";
import { useNavigate } from 'react-router-dom';
import DialogBox from '../../Customer/DialogBox';

export default function Head() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [Dialogopen, setDialogopenOpen] = useState(false);
  const [Loading, setLoader] = useState(false);


    const handleLogout = () => {
        localStorage.removeItem('SellerToken');
        localStorage.removeItem('ShopId');
        localStorage.removeItem('isAdmin');
        navigate('/seller/categoriesadd');
        setLoader(true);
        setTimeout(() => {
          navigate('/seller/Login')
        }, 1500);
        
        
      };
  return (
    <>
        <div className=" fixed w-full z-40 ">
            
            <nav aria-label="Top" className=" bg-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
              <div className="flex border-b border-gray-200 h-16 items-center">
                

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <a href="/" className='flex justify-center items-center gap-3 '>
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto rounded-full"
                      src={pagelogo}
                      alt=""
                    />
                  
                  <h1 className='font-semibold text-xl'>CUBIKOR -seller</h1>

                  </a>
                </div>

               

                <div className="ml-auto flex items-center">
                <button 
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={()=>{setDialogopenOpen(true)}}
                >
                    logout
                </button>
                 
                </div>
              </div>
            
          </nav>
            
        </div>
       

        <DialogBox 
         open={Dialogopen}
         setOpen={setDialogopenOpen} 
         title={"Session Logout"}
         message={"Are you sure you want to Logout your account ,then you have to Login agin to access your account."}
         ActionButtonName={"Logout"}
         ActionButtonColor={"bg-red"}
         IconName={false}
         handleLogic={handleLogout}
         Loading={Loading}
         />

    </>
  )
}
