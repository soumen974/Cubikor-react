// src/components/Logout.js
import React from 'react';
import axios from 'axios';
const Logout = () => {
  const handleLogout = async () => {
    try {
      await axios.post(`${REACT_APP_API_URL}/logout`); // Implement logout in backend if needed
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      // Redirect to login or home
    } catch (error) {
      console.error('Logout failed:', error.response.data);
    }
  };

  return <button className='mt-44' onClick={handleLogout}>Logout</button>;
};

export default Logout;
