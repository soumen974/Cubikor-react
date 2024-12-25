import React, { useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, addToCart, removeFromCart } from '../../redux/cartSlice';


export default function AddtoCart({ ShopID, productID, catId }) {

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const Authenticated = token;

    const [messages, setmessages] = useState({success:false, error:false});

    const SuccessSound = () => {
        const audio = new Audio(process.env.PUBLIC_URL + '/Sounds/success_bell-6776.mp3');
        audio.play();
      };
      const errorSound= () => {
        const audio = new Audio(process.env.PUBLIC_URL + '/Sounds/windows-error-sound-effect-35894.mp3');
        audio.play();
      }

    const AddingToBag = async (e) => {
        e.preventDefault();
        if(Authenticated){
          try {
             await axios.post(
              `${REACT_APP_API_URL}/users/${userId}/shopping_cart`,
              {
                CategoryId: catId,
                productId: productID,
                shopId: ShopID,
                quantity: 1
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              }
            );
            // navigate("/")
            // window.location.reload();
            setTimeout(() => {
              setmessages({success:false});
            }, 3000);
            setmessages({success:true});
            SuccessSound();
            
          } catch (error) {
            console.error('Already added to cart:', error);
            setTimeout(() => {
              setmessages({error:false});
            }, 3000);
            setmessages({error:true});
            errorSound();
            if (error.response && error.response.data.errors) {
                console.log(error.response.data.errors);
              
            } else {
              console.log(`Error: ${error.message}`);
            }
          }
        }else{
          // navigate("/seller/Login")
        }
       
      };
  return (
    <>
    <form onSubmit={AddingToBag}>
        <button
        type="submit"
        className={`mt-6 flex w-full items-center justify-center rounded-md border border-transparent  px-8 py-3 text-base font-medium text-white  focus:outline-none focus:ring-2 ${messages.success? null : messages.error? "focus:ring-red-500 bg-red-600 hover:bg-red-700":" focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700" }  focus:ring-offset-2`}
        >
        {messages.error? "Already added":"Add to bag"}
        </button>
    </form>
    </>
  )
}
