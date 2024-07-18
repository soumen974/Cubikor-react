import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/protected', {
            withCredentials: true  // Ensure credentials (cookies) are sent
          });
        setUser(response.data);
      } catch (error) {
        setError('Access denied');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return user ? <div className='mt-[20rem] flex'>Welcome, {user.name}</div> : <div>Loading...</div>;
};

export default ProtectedRoute;
