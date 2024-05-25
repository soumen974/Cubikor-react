import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, loadStoredAuth } from "../../redux/authSlice";

function NowTry() {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const { username, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
    const storedUser = localStorage.getItem('username');
    if (storedAuth && storedUser) {
      dispatch(loadStoredAuth({ username: storedUser, isAuthenticated: true }));
    }
  }, []);

  const handleLogin = () => {
    if (usernameInput === 'user' && passwordInput === 'password') {
      dispatch(login(usernameInput));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', usernameInput);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  };

  if (isAuthenticated) {
    return (
      <div className='mt-20'>
        <h1>Welcome, {username}!</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className='mt-20'>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default NowTry;
