import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DialogBox from '../../Customer/DialogBox';
import { PencilSquareIcon} from '@heroicons/react/24/outline';


export default function DrawerCat({ drawerOpen, setDrawerOpen, ProductIdforEdit }) {
  const categoryId = ProductIdforEdit;

  const { register, handleSubmit, reset, setValue } = useForm();
  const [Dialogopen, setDialogopenOpen] = useState(false);
  const shopId = localStorage.getItem('ShopId');
  const token = localStorage.getItem('SellerToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!categoryId) {
    //   console.error('CategoryId is null or undefined');
      return;
    }

    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/shops/${shopId}/categories/${categoryId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const categoryData = response.data;
        setValue('name', categoryData.name);
        setValue('href', categoryData.href);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, [shopId, categoryId, token, setValue]);

  const onSubmit = async (data) => {
    if (!categoryId) {
      console.error('CategoryId is null or undefined');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/shops/${shopId}/categories/${categoryId}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setDialogopenOpen(false);
      setDrawerOpen(!drawerOpen);
      navigate('/seller');
      reset();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDialogClose = () => {
    setDialogopenOpen(false);
  };

  const handleDialogConfirm = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <>
      {/* Drawer component */}
      <div className={`${drawerOpen ? 'translate-y-[2rem] block' : 'translate-y-[51rem] hidden opacity-0 '} h-screen transition ease-in-out delay-150 fixed z-50 w-full overflow-y-auto bg-white border-t border-gray-200 rounded-t-lg dark:border-gray-700 dark:bg-gray-800 left-0 right-0`}>
        <div onClick={() => setDrawerOpen(!drawerOpen)} className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
          <span className="absolute w-8 h-1 -translate-x-1/2 bg rounded-lg top-3 left-1/2 dark:bg-gray-500"></span>
          <h5 id="drawer-swipe-label" className="inline-flex items-center text-base text-indigo-700 dark:text-gray-400 font-medium">
            <PencilSquareIcon className="h-6 w-6 mr-2" />
            Edit Categories:
          </h5>
        </div>

          <div className="mx-auto max-w-2xl px-10 py-10 sm:py-10 lg:py-10">
            <form className='' onSubmit={(e) => { e.preventDefault(); setDialogopenOpen(true); }}>
              <div className="space-y-8 mt-20">
                <div className="sm:col-span-3">
                  <label className='text-sm font-medium leading-6 text-gray-100'>Name:</label>
                  <div className="mt-2">
                    <input
                      id="name"
                      {...register('name', { required: true })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className='text-sm font-medium leading-6 text-gray-100'>Href</label>
                  <div className="mt-2">
                    <input
                      id="href"
                      {...register('href')}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-center sm:justify-end gap-2">

                  <button
                    className=" w-full sm:w-fit rounded-md bg-indigo-600 px-3 py-3 sm:py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="submit"
                  >
                    Update Category
                  </button>
                </div>
              </div>
            </form>
          </div>
       

        <DialogBox
          open={Dialogopen}
          setOpen={setDialogopenOpen}
          title={"Save changes Permanently"}
          message={"Are you sure you want to update your category data? All of your data will be permanently changed. This action cannot be undone."}
          ActionButtonName={"Save changes"}
          ActionButtonColor={"bg-indigo"}
          IconName={"CheckIcon"}
          handleLogic={handleDialogConfirm}
          handleClose={handleDialogClose}
        />
      </div>
    </>
  );
}
