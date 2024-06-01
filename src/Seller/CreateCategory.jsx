import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import DialogBox from "../Customer/DialogBox";

const CategoryForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [Dialogopen, setDialogopenOpen] = useState(false);

  const shopId=  localStorage.getItem('ShopId');
  

  const onSubmit = async (data) => {
    const token = localStorage.getItem('SellerToken');
    try {
      const response = await axios.post(`http://localhost:5000/shops/${shopId}/categories`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
       
      });
      // console.log('Category created:', response.data);
      setDialogopenOpen(false);
      reset();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };






  return (
    <div className="relative isolate px-6 pt-0 lg:pt-0">
      <div className="mx-auto max-w-2xl py-32 sm:py-10 lg:py-10">
          <form className='' onSubmit={handleSubmit(onSubmit)} >
             <div className="space-y-8 mt-20">              
               <div className="border-b border-gray-900/10 pb-7">
                    <h2 className="text-md font-semibold leading-7 text-gray-900">Product Adding : </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      This information will help us to send your purchase.
                    </p>
                  </div>

                  <div className="sm:col-span-3">
                <label>Name:</label>
                <div className="mt-2">
                  <input 
                    id="name" 
                    {...register('name', { required: true })}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                      />
                </div> 
                  </div>
        
                  <div className="sm:col-span-3">
                      <label>Href</label>
                      <div className="mt-2">
                        <input 
                          id="href"
                            {...register('href')} defaultValue="#"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                            />
                      </div> 
                  </div>
              
             
              <div className="flex justify-end">
              <button onClick={()=>{setDialogopenOpen(true)}}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit">Create Category</button>
              </div>
            </div>
            
          </form>
         
        </div>
        <DialogBox 
        open={Dialogopen}
         setOpen={setDialogopenOpen} 
         title={"Save changes Permanently"}
         message={"Are you sure you want to update your account data All of your data will be permanently changes. This action cannot be undone."}
         ActionButtonName={"Save changes"}
         ActionButtonColor={"bg-indigo"}
         IconName={"CheckIcon"}
         handleLogic={handleSubmit(onSubmit)}
         
         />
   </div>
  );
};

export default CategoryForm;
