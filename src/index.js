import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Nav from './nav'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  
  <React.StrictMode>
    <App />
  </React.StrictMode>
  
  </>
);

reportWebVitals();
