import React, { useState } from 'react';
import axios from 'axios';

const PasswordAdd = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrors([{ msg: 'Passwords do not match' }]);
      return;
    }

    try {
      const response = await axios.post(`${REACT_APP_API_URL}/addpassword`, {
        email: formData.email,
        password: formData.password
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors([{ msg: 'An error occurred while creating the user' }]);
      }
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} style={{ color: 'red' }}>{error.msg}</p>
          ))}
        </div>
      )}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default PasswordAdd;
