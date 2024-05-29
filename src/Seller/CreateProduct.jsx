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
  const shopId = 2;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const token = localStorage.getItem('token');
  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      const response = await axios.post(`http://localhost:5000/shops/${shopId}/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Replace with actual token
          'Content-Type': 'application/json'
        },
      });
      console.log('Product created with ID:', response.data.id);
      // Handle success (e.g., clear form, show success message)
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error creating product:', error.message);
      }
    }
  };

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

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      categoryId: e.target.value,
    });
  };

  return (
    <form className='mt-20' onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Href:</label>
        <input type="text" name="href" value={formData.href} onChange={handleChange} />
      </div>
      <div>
        <label>Image Source:</label>
        <input type="text" name="imageSrc" value={formData.imageSrc} onChange={handleChange} />
      </div>
      <div>
        <label>Image Alt:</label>
        <input type="text" name="imageAlt" value={formData.imageAlt} onChange={handleChange} />
      </div>
      <div>
        <label>Price:</label>
        <input type="text" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Color:</label>
        <input type="text" name="color" value={formData.color} onChange={handleChange} />
      </div>
      <div>
        <label>Rating:</label>
        <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} />
      </div>
      <div>
        <label>Review Count:</label>
        <input type="number" name="reviewCount" value={formData.reviewCount} onChange={handleChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Details:</label>
        <textarea name="details" value={formData.details} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Highlights:</label>
        <textarea name="highlights" value={formData.highlights} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Category:</label>
        <select name="categoryId" value={formData.categoryId} onChange={handleCategoryChange} required>
          <option value="">Select</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
      {errors.length > 0 && (
        <div>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default CreateProduct;
