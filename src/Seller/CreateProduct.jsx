import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    href: '/',
    imageSrc: '',
    imageAlt: '',
    price: '',
    color: '',
    rating: '',
    reviewCount: '',
    description: '',
    details: '',
    highlights: '',
    categoryId: ''
  });

  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState([]);
  const shopId=  localStorage.getItem('ShopId');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const token = localStorage.getItem('SellerToken');
  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      const response = await axios.post(`http://localhost:5000/shops/${shopId}/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Replace with actual token
          'Content-Type': 'application/json'
        },
      });
      // console.log('Product created with ID:', response.data.id);
      // Handle success (e.g., clear form, show success message)
    } catch (error) {
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
  // http://localhost:5000/shops
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/shops/${shopId}/categories`,
         {
            headers: {
            Authorization: `Bearer ${token}`, // Replace with actual token
            'Content-Type': 'application/json'
            }
          }
        );
        
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
  }, [shopId]);

  const [ShopName, setShopName] = useState('');
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/shops/${shopId}`,
         {
            headers: {
            Authorization: `Bearer ${token}`, // Replace with actual token
            'Content-Type': 'application/json'
            }
          }
        );
        
        // const ShopName = response.data.name;
        setShopName(response.data.name);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [shopId]);


  

  return (
    <div className="relative isolate px-6 pt-0 lg:pt-0">
      <div className="mx-auto max-w-2xl py-32 sm:py-10 lg:py-10">
      <form className='' onSubmit={handleSubmit}>
        <div className="space-y-8 mt-20">
          <div className="border-b border-gray-900/10 pb-7">
              <h2 className="text-md font-semibold leading-7 text-gray-900">Product Adding :{ShopName} </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will help us to send your purchase.
              </p>
          </div>
            
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-6">
              <label>Category:</label>
              <div className="mt-2">
              <select 
              name="categoryId"
               value={formData.categoryId}
                onChange={handleCategoryChange}
                 required
                 className=" w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
            <div className="sm:col-span-6">
              <label>Image Source:</label>
              <div className="mt-2">
                 <input 
                 type="text" 
                 name="imageSrc" 
                 value={formData.imageSrc} 
                 onChange={handleChange} 
                 className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                 />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label>Image Alt:</label>
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
            <div className="sm:col-span-3" >
              <label>Review Count:</label>
             <div>
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
            <div className="sm:col-span-6">
              <label>Highlights:</label>
              <div className="mt-2">
              <textarea 
              name="highlights"
               value={formData.highlights}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>
            
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
              <a href='/'  className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </a>
           
              <button 
               className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit">Submit</button>
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
      
    </div>
  );
};

export default CreateProduct;
