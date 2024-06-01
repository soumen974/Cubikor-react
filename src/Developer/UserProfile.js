import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/users/1', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  return user ? (
    <div>
      <h1>{user.name}</h1>
      {/* Display other user details */}
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default UserProfile;
