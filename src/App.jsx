import React, { useState } from 'react';
import './App.css';
import Navbar from "./nav";
import Section1 from "./home";
import Cubes from "./CubeNew";
import CubesBestseller from "./CubeBestSell";
import Section02 from "./Section02";
import Section03 from "./Section03";
import Section04 from './Section04';
import Section05 from "./Section05";
import Section06 from "./Section06";
import Footer from "./footer";

export default function App() {
  return (
    <div className='body'>
      <Navbar/>
      <Section1/>
      <Cubes/>
      <CubesBestseller/>
      <Section02/>
      <Section03/>
      <Section04/>
      <Section05/>
      <Section06/>
      <Footer/>


    </div>
  );
}
