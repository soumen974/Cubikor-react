import React, { useState } from 'react'
import userDAta from "./Data/user.json";
import { useSelector, useDispatch } from 'react-redux';
import {logout  } from "../../redux/UserAuthSlice";

export default function Avatar() {

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    const { user_mail, isUserAuthenticated } = useSelector((state) => state.user_auth);
  
    // const Authenticated = userDAta.Auth;
    const Authenticated = isUserAuthenticated;
  
    const handleLogout = () => {
      // setIsAuthenticated(false);
      dispatch(logout());
      localStorage.removeItem('isUserAuthenticated');
      localStorage.removeItem('user_mail');
     
    };

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
  return (
    <div className="  relative inline-block text-left">
      <abbr className='no-underline  ' title={userDAta.name}> 
        <button
            id="dropdownUserAvatarButton"
            onClick={toggleDropdown}
            className="flex text-sm  rounded-full md:me-0 "
            type="button"
        >
            <div className={`px-4 py-2 text-black   rounded-full bg-yellow-400 uppercase cursor-pointer  `}>{userDAta.name.charAt(0) }</div>
        </button>
      </abbr>

      {isOpen && (
        <div
          id="dropdownAvatar"
          className=" z-10 md:absolute  md:right-0 md:mt-2 md:w-44 w-full  md:bg-white divide-y divide-gray-100 rounded-lg md:shadow "
        >
          <div className="md:px-4 py-3 truncate text-sm text-gray-900 ">
            <div>{userDAta.name}</div>
            <div className="font-medium truncate"><abbr className='no-underline hover:underline decoration-solid' title={userDAta.email}>{userDAta.email}</abbr></div>
          </div>
          <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownUserAvatarButton">
          <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">Favorite</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">Profile</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
            </li>
           
          </ul>
          <div onClick={handleLogout} className="py-2">
            <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Sign out</a>
          </div>
        </div>
      )}
    </div>
  );
}

