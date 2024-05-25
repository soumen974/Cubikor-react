import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./Customer/Component/Layout";
import Home from "./Customer/Pages/Home";
import NotFound from './Customer/Component/NotFound';
import NewProduct from './Customer/Component/Product/NewProduct';
import SIgnIn from './Customer/Component/SignIn';
import ProductOverview from './Customer/Component/Product/ProductOverviews';
import CategoryProduct from './Customer/Component/Product/CategoryProduct';
import Learn from './Customer/Component/Learn';
import NowTry from './Customer/Component/Now Try';


export default function App() {

 
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewProduct/>}/ >
          <Route path="/learn" element={<Learn/>}/ >
          <Route path="/productview/:CategoryId/:CubeId" element={<ProductOverview/>}/ >
          <Route path="/productview/" element={<ProductOverview/>}/ >
          <Route path="/products" element={<CategoryProduct/>}/ >
          <Route path="/products/:CategoryPageID" element={<CategoryProduct/>}/ >
          <Route path="*" element={<NotFound/>} />
        </Route>
        

      </Routes>
    </Router>
      
    
    </>
  );
}
