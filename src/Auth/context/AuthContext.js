
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/${userId}`);
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };

    checkLoggedIn();
  }, [userId]);

  const login = async (email, password) => {
    const res = await axios.post('/api/login', { email, password });
    setUser(res.data);
  };

  const logout = async () => {
    await axios.post('/api/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
