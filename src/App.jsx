import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./Customer/Component/Layout";
import Home from "./Customer/Pages/Home";
import NotFound from './Customer/Component/NotFound';
import NewProduct from './Product/NewProduct';


export default function App() {

 
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewProduct/>} />

          <Route path="*" element={<NotFound/>} />
        </Route>
        

      </Routes>
    </Router>
      
    
    </>
  );
}
