import React, { useState } from 'react';
import img1 from "./images-app/ad-cube-img-2.jpg";
import img2 from "./images-app/cube-sell-1.png";
import img3 from "./images-app/cube-sell-2.png";
import img4 from "./images-app/cube-sell-3.png";
import img5 from "./images-app/cube-sell-4.png";
import img6 from "./images-app/cube-sell-5.png";
import img7 from "./images-app/cube-sell-6.png";
import img8 from "./images-app/cube-sell-7.png";
import img9 from "./images-app/cube-sell-8.png";
import img10 from "./images-app/cube-sell-8.png";
import img11 from "./images-app/ad-cube-img-2.jpg";
import img12 from "./images-app/ad-cube-img-3.jpg";
import CubeBox from "./CubeBox";




export default function CubeNew() {


  return (
    <>
     <section className="cubes" id="Cubes-new">
        <h1>NEW ARRIVALS</h1>
        <div className="sales-background">
            <div className="sales-tag">
           
          <CubeBox imgSrc={img1} 
            cubeTage='New'
            CubeCaption='Drift 3M PLUS 3x3 (Magnetic)'
            CubePrice='$ 149'
            CubeCutPrice='$ 199'
            CubeDiscount='save  25%'
            StockUpdate='In stock'
          />

          <CubeBox imgSrc={img2} 
            cubeTage='New'
            CubeCaption='Drift 3M PLUS 3x3 (Magnetic)'
            CubePrice='$ 149'
            CubeCutPrice='$ 199'
            CubeDiscount='save 25%'
            StockUpdate='In stock'
          />

          <CubeBox imgSrc={img3} 
            cubeTage='New'
            CubeCaption='Drift 3M PLUS 3x3 (Magnetic)'
            CubePrice='$ 149'
            CubeCutPrice='$ 199'
            CubeDiscount='save 25%'
            StockUpdate='In stock'
          />

          <CubeBox imgSrc={img4} 
            cubeTage='New'
            CubeCaption='Drift 3M PLUS 3x3 (Magnetic)'
            CubePrice='$ 149'
            CubeCutPrice='$ 199'
            CubeDiscount='save 25%'
            StockUpdate='In stock'
          />

          <CubeBox imgSrc={img5 } 
            cubeTage='New'
            CubeCaption='Drift 3M PLUS 3x3 (Magnetic)'
            CubePrice='$ 149'
            CubeCutPrice='$ 199'
            CubeDiscount='save 25%'
            StockUpdate='In stock'
          />

         <CubeBox imgSrc={img6} 
            cubeTage='New'
            CubeCaption='Drift 3M PLUS 3x3 (Magnetic)'
            CubePrice='$ 149'
            CubeCutPrice='$ 199'
            CubeDiscount='save 25%'
            StockUpdate='In stock'
          />
             
           </div>

           <br/>
          
          
           <div className="sales-tag">
                
           <CubeBox imgSrc={img7} 
            cubeTage='New'
            CubeCaption='Drift 3M PLUS 3x3 (Magnetic)'
            CubePrice='$ 149'
            CubeCutPrice='$ 199'
            CubeDiscount='save 25%'
            StockUpdate='In stock'
          />
          
          <CubeBox imgSrc={img8} 
            cubeTage='New'
            CubeCaption='Drift 3M PLUS 3x3 (Magnetic)'
            CubePrice='$ 149'
            CubeCutPrice='$ 199'
            CubeDiscount='save 25%'
            StockUpdate='In stock'
          />
          
          <CubeBox imgSrc={img9} 
            cubeTage='New'
            CubeCaption='Drift 3M PLUS 3x3 (Magnetic)'
            CubePrice='$ 149'
            CubeCutPrice='$ 199'
            CubeDiscount='save 25%'
            StockUpdate='In stock'
          />

          <CubeBox imgSrc={img10} 
            cubeTage='New'
            CubeCaption='Drift 3M PLUS 3x3 (Magnetic)'
            CubePrice='$ 149'
            CubeCutPrice='$ 199'
            CubeDiscount='save 25%'
            StockUpdate='In stock'
          />

          <CubeBox imgSrc={img11} 
            cubeTage='New'
            CubeCaption='Drift 3M PLUS 3x3 (Magnetic)'
            CubePrice='$ 149'
            CubeCutPrice='$ 199'
            CubeDiscount='save 25%'
            StockUpdate='In stock'
          />

          <CubeBox imgSrc={img12} 
            cubeTage='New'
            CubeCaption='Drift 3M PLUS 3x3 (Magnetic)'
            CubePrice='$ 149'
            CubeCutPrice='$ 199'
            CubeDiscount='save 25%'
            StockUpdate='In stock'
          />

          </div>
           
        </div>
               
    </section>
    </>
  );
}
