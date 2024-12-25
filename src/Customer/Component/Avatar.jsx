import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from "../../redux/userSlice";
import DialogBox from '../../Customer/DialogBox';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import PageLoder from "../../../src/Loaders/PageLoder";
import Cookies from 'js-cookie';
import axios from "axios";
import { User,Heart,Box ,Settings2,LogOut,Package ,MessageCircleQuestion   } from 'lucide-react';
export default function Avatar() {

    const [isOpen, setIsOpen] = useState(false);
    const [Dialogopen, setDialogopenOpen] = useState(false);

    const Navigate =useNavigate();


    function logout() {
      axios.post('${REACT_APP_API_URL}/logout', {}, { withCredentials: true })
        .then(response => {
          console.log(response.data);
          // Redirect to login page or show a logged-out message
          // window.location.href = '/login';
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          // Cookies.remove('UserToken');
          // Cookies.remove('userId');
          // deleteCookie('UserToken');
          // deleteCookie('userId');
          Navigate('/');
          setDialogopenOpen(false);
          window.location.reload();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    





    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
  
  
    //   const fetchUser = async () => {
    //     if(token && userId){
    //       try {
    //         const response = await fetch(`${REACT_APP_API_URL}/users/${userId}`, {
    //           method: 'GET',
    //           headers: {
    //             'Authorization': `Bearer ${token}`
    //           }
    //         });
    
    //         if (response.ok) {
    //           const userData = await response.json();
    //           setUser(userData);
    //         } else {
    //           const errorData = await response.json();
              
    //           setErrorMessage(errorData.message || 'Error retrieving user');
    //         }
    //       } catch (error) {
            
    //         setErrorMessage('An error occurred, please try again later');


    //       }
    //     }
    //   };
  
    //   fetchUser();
    // }, [userId, token]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${REACT_APP_API_URL}/protected`, {
            withCredentials: true  // Ensure credentials (cookies) are sent
          });
          setUser(response.data);
          console.log(response.data);  // Log the response data
        } catch (error) {
          setErrorMessage(error.response ? error.response.data : error.message);
          logout();
        }
      };
  
      fetchData();
    }, []);
  
    if (errorMessage) {
      return <p>{errorMessage}</p>;
    }
  
    if (!user) {
      return <p className='text-indigo-600'><PageLoder/></p>;
    }


  
  return (
    <div className=" group z  relative inline-block text-left">
      <abbr className='no-underline hidden md:block ' title={user.name}> 
        <button
            id="dropdownUserAvatarButton"
            onClick={()=>{setIsOpen(!isOpen);}}
            className="flex text-sm  rounded-full md:me-0 "
            type="button"
        >
            <div className={`px-4 py-2 text-black   rounded-full bg-yellow-400 uppercase cursor-pointer  `}>{user.name.charAt(0)|| user.email.charAt(0) }</div>
        </button>
      </abbr>
      <div className="md:group-hover:block md:hidden bg-red- z-10 lg:absolute  lg:right-0 md:mt-2 md:w-44 w-full top-2 md:pt-10">
        <div
            id="dropdownAvatar"
            className=" md:pt-2 px-2 md:bg-white divide-y divide-gray-100 md:w-[13rem] w-full rounded-lg lg:shadow "
          >
            <div className="md:px-4 py-3 truncate bg-green-100 rounded text-gray-900 ">
              <div className='capitalize text-sm font-medium text-gray-900 truncate '>{user.name}</div>
              <div className="text-sm text-gray-500 truncate "><abbr className='no-underline hover:underline decoration-solid' title={user.email}>{user.email}</abbr></div>
            </div>

            <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownUserAvatarButton">
            <li>
                <NavLink to={"/profile"} className={({isActive}) => ` ${isActive ? ' hover:bg-indigo-50 hover:text-indigo-700 text-indigo-500  bg-indigo-100 ':' hover:bg-gray-100 text-gray-500 '} px-4 py-2 flex gap-2`}>
                <User className='h-4 w-4'  />
                Profile</NavLink>
              </li>
              <li>
                <NavLink to={"/favorites"} className={({isActive}) => ` ${isActive ? ' hover:bg-indigo-50 hover:text-indigo-700 text-indigo-500   bg-indigo-100 ':' hover:bg-gray-100 text-gray-500 '} flex gap-2 px-4 py-2  `}>
                <Heart className='h-4 w-4'  />

              Favorite</NavLink>
              </li>
              <li>
                <NavLink  to={"/myorders"} className={({isActive}) => ` ${isActive ? ' hover:bg-indigo-50 hover:text-indigo-700 text-indigo-500  bg-indigo-100 ':' hover:bg-gray-100  text-gray-500'} flex gap-2 px-4 py-2  `}>
                <Package className='h-4 w-4' />                
                My Orders</NavLink>
              </li>
            
              <li>
                <a href="/" className="flex gap-2 px-4 py-2 hover:bg-gray-100 text-gray-500">
                <Settings2 className='h-4 w-4' />
              Settings</a>
              </li>

              <li>
                <a href="/" className="flex gap-2 px-4 py-2 hover:bg-gray-100 text-gray-500">
                <MessageCircleQuestion  className='h-4 w-4' />
              FAQ</a>
              </li>
            
            </ul>

            <div onClick={()=>{setDialogopenOpen(true);setIsOpen(!isOpen);}}  className="py-2">
              <div className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-500 active:text-red-600  active:bg-red-100 hover:bg-gray-100 ">
              <LogOut className='h-4 w-4'  />
            Log out</div>
            </div>
        </div>
      </div>

     
       <DialogBox 
         open={Dialogopen}
         setOpen={setDialogopenOpen} 
         title={"Session Logout"}
         message={"Are you sure you want to Logout your account ,then you have to Login agin to access your account."}
         ActionButtonName={"Logout"}
         ActionButtonColorRed={true}
         IconName={false}
         handleLogic={logout}
         />

    </div>
  );
}

