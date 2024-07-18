import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    await axios.post('/logout');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
