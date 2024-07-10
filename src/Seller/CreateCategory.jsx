import React, {  useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import DialogBox from "../Customer/DialogBox";
import { useNavigate } from 'react-router-dom';
import useConfirmExit from "../message/useConfirmExit";

const CategoryForm = () => {
  useConfirmExit('Are you sure you want to leave this page? Changes that you made may not be saved.');
  const { register, handleSubmit, reset } = useForm();
  const [Dialogopen, setDialogopenOpen] = useState(false);

  const shopId = localStorage.getItem('ShopId');

  const onSubmit = async (data) => {
    const token = localStorage.getItem('SellerToken');
    try {
       await axios.post(`http://localhost:5000/shops/${shopId}/categories`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log('Category created:', response.data);
      setDialogopenOpen(false);
      navigate('/seller');
      reset();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleDialogClose = () => {
    setDialogopenOpen(false);
  };

  const navigate=useNavigate();
  const handleDialogConfirm = () => {
    handleSubmit(onSubmit)();
    
    
  };

  
  // -------------pagination----------------
  const product = {
    name: '3x3 cubes',
    breadcrumbs: [
      { id: 1, name: 'Dashboard', href: '/seller' },
      { id: 2, name: 'Add Category', href: '/seller/categoriesadd' },
    ]};


  
  return (
    <div className="relative isolate px-6 pt-0 lg:pt-0">
      <header className="pb-6">
          <ol  className="mx-auto flex   ">
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
       <div className="border-b border-gray-900/10 pb-7">
              <h2 className="text-md font-semibold leading-7 text-gray-900">Product Adding : </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will help us to send your purchase.
              </p>
        </div>
      <div className="mx-auto max-w-2xl py-10 sm:py-10 lg:py-10">
        
            
        <form className='' onSubmit={(e) => { e.preventDefault(); setDialogopenOpen(true); }} >
          
          <div className="space-y-8 mt-20">
           

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
              <button
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
              >
                Create Category
              </button>
            </div>
          </div>
        </form>
      </div>
         
      <DialogBox
        open={Dialogopen}
        setOpen={setDialogopenOpen}
        title={"Save changes Permanently"}
        message={"Are you sure you want to update your account data? All of your data will be permanently changed. This action cannot be undone."}
        ActionButtonName={"Save changes"}
        ActionButtonColor={"bg-indigo"}
        IconName={"CheckIcon"}
        handleLogic={handleDialogConfirm}
        handleClose={handleDialogClose}
      />
    </div>
  );
};

export default CategoryForm;
