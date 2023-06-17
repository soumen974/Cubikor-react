import React from 'react'
import img1 from "./images-app/ad-cube-img-2.jpg";
import Star from './Star';


export default function CubeBoxBSlr(props) {
  return (
    <>

    <div className="Try-cube-box">
                       <div className='Try-cube-box-up'>
                           <div className='Try-cube-box-header'>
                           < div className="cube-tag-02">{props.cubeTage}</div>
    
                                  
                            
                               <div className='Try-cube-love'>
    
                                    <svg
                                       viewBox="0 0 24 24"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       className="feather feather-heart">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg> 
                                
                                 </div>
    
                            </div>
                            
                             <div className="Try-cube-img"><img src={props.imgSrc} alt="Try-cube"/></div>
                        </div>
    
                        <div className='Try-hover-show-thing'>
                            
                            <div className='Try-hover-show-thing-box-1'>Buy now</div>
                            <div className='Try-hover-show-thing-box-2'>Add to cart</div>
                        
                        </div>
                        
                        <div className='Try-cube-box-down'>
                             <div className="Try-cube-caption"><a href="#" className="Try-cube-caption">{props.CubeCaption}</a>  </div>
        
                            <div className="Try-cube-costs">
                                <div className="Try-cube-price">{props.CubePrice}</div>
        
                                 <div className="Try-cube-cut-price"><s>{props.CubeCutPrice}</s></div>
        
                                 <div className="Try-cube-discount">{props.CubeDiscount}</div>
                            </div>
                           <Star/>
                        <div className="Try-cube-stock"><span className="Try-cube-stock-dot" >&#8226;</span>In stock</div>
                        
        
        
                        </div>
                    </div> 
        
        </>
  )
}
