import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./Customer/Component/Layout";
import Home from "./Customer/Pages/Home";
import NotFound from './Customer/Component/NotFound';
import NewProduct from './Customer/Component/Product/NewProduct';
import ProductOverview from './Customer/Component/Product/ProductOverviews';
import CategoryProduct from './Customer/Component/Product/CategoryProduct';
import Learn from './Customer/Component/Learn';
import Profile from "./Customer/Profile";
import EditProfile from './Customer/Pages/EditProfile';
import CreateCategory from './Seller/CreateCategory';
import CreateProduct from "./Seller/CreateProduct";
import Login from "./Seller/Login";
import SignUp from "./Seller/SignUp";
import LayoutSeller from './Seller/LayoutSeller';
import Image from "./Seller/Image_uploder/Image";
import ImageList from "./Seller/Image_uploder/ImageList";
import ImageUploader from "./Seller/Image_uploder/ImageUploader";
import DashBoard from './Seller/DashBoard';
import CheckoutForm from './Customer/Pages/CheckoutForm';
import SellerOrders from './Seller/SellerOrders';
import CustomerOrders from './Customer/Pages/CustomerOrders';
import DemoApp from './Demo/DemoApp';
import Favorite from './Customer/Pages/Favorite';
import Searches from './Customer/Component/Searches';



export default function App() {
  const token = localStorage.getItem('token');
  const Authenticated =  token;
  const Seller =  localStorage.getItem('SellerToken');
  

  
 


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/images" element={<Image/>} />
          <Route path="/ImageList" element={<ImageList/>} />
          <Route path="/ImageUploader" element={<ImageUploader/>} />
          
          <Route path="/new" element={<NewProduct/>}/ >
          <Route path="/favorites" element={<Favorite/>}/ >
          <Route path="/learn" element={<Learn/>}/ >
          <Route path="/productview/:CubeId" element={<ProductOverview/>}/ >
          <Route path="/products" element={<CategoryProduct/>}/ >
          <Route path="/products/:CategoryPageID" element={<CategoryProduct/>}/ >
          {Authenticated ? (<Route path="/profile" element={<Profile/>} />): null}
          {Authenticated ? (<Route path="/profileEdit" element={<EditProfile/>} />): null}
          {Authenticated ? (<Route path="/checkout" element={<CheckoutForm/>} />): null}
          {Authenticated ? (<Route path="/checkout/:prdid" element={<CheckoutForm/>} />): null}
          {Authenticated ? (<Route path="/myorders" element={<CustomerOrders/>} />): null}

          <Route path="/result" element={<Searches/>}/ >

          <Route path="/demouser" element={<DemoApp/>}/ >

          

          <Route path="*" element={<NotFound/>} />
        </Route>


        
        <Route path="/seller" element={<LayoutSeller/>}>
          <Route path="/seller" element={<DashBoard/>} />
          <Route path="/seller/categoriesadd" element={<CreateCategory/>} />
          <Route path="/seller/productadd" element={<CreateProduct/>} />
          <Route path="/seller/orders" element={<SellerOrders/>} />
        </Route>
        
        
        {!Seller ? (
        <>
        <Route path="/seller/Login" element={<Login/>} />
        <Route path="/seller/SignUp" element={<SignUp/>} />
        </>):null}

      </Routes>
    </Router>
      
    
    </>
  );
}