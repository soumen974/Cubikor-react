import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DialogBox from "../Customer/DialogBox";
import { useNavigate } from 'react-router-dom';
import useConfirmExit from "../message/useConfirmExit";

const CreateProduct = () => {
  const [Dialogopen, setDialogopenOpen] = useState(false);

  useConfirmExit('Are you sure you want to leave this page?');
  // post--method
  const [formData, setFormData] = useState({
    name: '',
    href: '/',
    // imageSrc: '',
    imageAlt: '',
    price: '',
    color: '',
    rating: '',
    reviewCount: '',
    description: '',
    details: '',
    highlights: '',
    categoryId: '',
    product_image: null
  });

  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shopName, setShopName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const shopId = localStorage.getItem('ShopId');
  const token = localStorage.getItem('SellerToken');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file' && files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      product_image: null,
    });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== '') {
        data.append(key, formData[key]);
      }
    }

    try {
      await axios.post(
        `${REACT_APP_API_URL}/shops/${shopId}/products`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setFormData({
        name: '',
        href: '/',
        // imageSrc: '',
        imageAlt: '',
        price: '',
        color: '',
        rating: '',
        reviewCount: '',
        description: '',
        details: '',
        highlights: '',
        categoryId: '',
        product_image: null
      });
      setImagePreview(null);
      
      setDialogopenOpen(false);
      navigate("/seller");
    } catch (error) {
      setDialogopenOpen(true);
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error creating product:', error.message);
      }
    }
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      categoryId: e.target.value,
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/shops/${shopId}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const categoriesData = response.data.map(category => ({
          id: category.id,
          name: category.name
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [shopId, token]);

  useEffect(() => {
    const fetchShopName = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/shops/${shopId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setShopName(response.data.name);
      } catch (error) {
        console.error('Error fetching shop name:', error);
      }
    };

    fetchShopName();
  }, [shopId, token]);


  

  const product = {
    name: '3x3 cubes',
    breadcrumbs: [
      { id: 1, name: 'Dashboard', href: '/seller' },
      { id: 2, name: 'Add Product', href: '/seller/productadd' },
    ]
  };

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
       <div className="border-b border-gray-900/10 pb-4">
              <h2 className="text-md font-semibold leading-7 text-gray-900">Product Adding : {shopName} </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will help us to send your purchase.
              </p>
        </div>
      <div className="mx-auto max-w-2xl sm:py-10 lg:py-10">
        
        <form className='' onSubmit={(e) => { e.preventDefault(); setDialogopenOpen(true); }}>
          <div className="space-y-8 mt-20">
           

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label>Category:</label>
                <div className="mt-2">
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleCategoryChange}
                    required
                    className="w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Select</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label>Name:</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label>Href:</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="href"
                    value={formData.href}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              
              {/* <div className="sm:col-span-3">
                <label>imageSrc</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="imageSrc"
                    value={formData.imageSrc}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div> */}


              <div className="flex  sm:col-span-3 justify-center items-center  ">
                  <label htmlFor="dropzone-file" className="w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative">
                      {imagePreview && (
                          <>
                              <img src={imagePreview} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                              <button className="absolute top-2 right-2 p-1 bg-white rounded-full text-gray-500 hover:text-red-500" onClick={handleRemoveImage}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                              </button>
                          </>
                      )}
                      {!imagePreview && (
                          <div className="flex flex-col items-center justify-center  h-full ">
                              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload Image</span> or drag and drop</p>
                              <p className="text-xs text-gray-500">Image (MAX. 800x400px)</p>
                          </div>
                      )}
                      <input id="dropzone-file" name='product_image' type="file" accept="image/*" className="hidden"  onChange={handleChange} />
                  </label>
              </div>

              <div className="sm:col-span-3">
                <label>Highlights on this product:</label>
                <div className="mt-2">
                  <textarea
                    name="highlights"
                    value={formData.highlights}
                    onChange={handleChange}
                    className="block w-full md:min-h-48 md:max-h-60 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>

             
             
              <div className="sm:col-span-6">
                <label> Alter name for this image:</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="imageAlt"
                    value={formData.imageAlt}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label>Price:</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label>Color:</label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label>Rating:</label>
                <div className="mt-2">
                  <input
                    type="number"
                    step="0.1"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label>Review Count:</label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="reviewCount"
                    value={formData.reviewCount}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label>Description:</label>
                <div className="mt-2">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label>Details:</label>
                <div className="mt-2">
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>

              
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <a href="/seller" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </a>

              <button
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
              >
                Submit
              </button>
              {errors.length > 0 && (
                <div>
                  <ul>
                    {errors.map((error, index) => (
                      <li key={index}>{error.msg}</li>
                    ))}
                  </ul>
                </div>
              )}
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
        handleLogic={handleSubmit}
        
      />
    </div>
  );
};

export default CreateProduct;
