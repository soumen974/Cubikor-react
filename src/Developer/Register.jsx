import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    auth: '',
    email: '',
    password: '',
    date_of_birth: '',
    country: '',
    security_question: '',
    security_answer: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    shipping_country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <form className='pt-20 mt-20 h-screen' onSubmit={handleSubmit}>
      {/* Render input fields for each form field */}
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="text" name="name" placeholder="name" onChange={handleChange} required />
      <input type="text" name="email" placeholder="email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="password" onChange={handleChange} required />
      <input type="text" name="date_of_birth" placeholder="date_of_birth" onChange={handleChange} required />
      <input type="text" name="country" placeholder="country" onChange={handleChange} required />
      <input type="text" name="security_question" placeholder="security_question" onChange={handleChange} required />
      <input type="text" name="security_answer" placeholder="security_answer" onChange={handleChange} required />
      <input type="text" name="street" placeholder="street" onChange={handleChange} required />
      <input type="text" name="city" placeholder="city" onChange={handleChange} required />
      <input type="text" name="state" placeholder="state" onChange={handleChange} required />
      <input type="number" name="zipcode" placeholder="zipcode" onChange={handleChange} required />
      <input type="text" name="shipping_country" placeholder="shipping_country" onChange={handleChange} required />

      {/* Add other input fields similarly */}
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
