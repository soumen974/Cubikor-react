import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CategoryForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const shopId=2;
  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:5000/shops/${shopId}/categories`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('Category created:', response.data);
      reset();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };






  return (
    <form className='mt-20' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name', { required: true })} />
      </div>
      <div>
        <label htmlFor="href">Href</label>
        <input id="href" {...register('href')} defaultValue="#" />
      </div>
      <button type="submit">Create Category</button>
    </form>
  );
};

export default CategoryForm;
