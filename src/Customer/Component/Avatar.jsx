import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from "../../redux/userSlice";
export default function Avatar() {

    const [isOpen, setIsOpen] = useState(false);
    // const dispatch = useDispatch();

    const handleLogout = () => {
      localStorage.removeItem('isUserAuthenticated');
      localStorage.removeItem('user_mail');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('isAdmin');
     
    };

    // const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:5000/users/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
  
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            const errorData = await response.json();
            console.log(token);
            setErrorMessage(errorData.message || 'Error retrieving user');
          }
        } catch (error) {
          setErrorMessage('An error occurred, please try again later');
          localStorage.removeItem('isUserAuthenticated');


        }
      };
  
      fetchUser();
    }, [userId, token]);
  
    if (errorMessage) {
      return <p>{errorMessage}</p>;
    }
  
    if (!user) {
      return <p>Loading...</p>;
    }


  
  return (
    <div className="  relative inline-block text-left">
      <abbr className='no-underline  ' title={user.name}> 
        <button
            id="dropdownUserAvatarButton"
            onClick={()=>{setIsOpen(!isOpen);}}
            className="flex text-sm  rounded-full md:me-0 "
            type="button"
        >
            <div className={`px-4 py-2 text-black   rounded-full bg-yellow-400 uppercase cursor-pointer  `}>{user.name.charAt(0)|| user.email.charAt(0) }</div>
        </button>
      </abbr>

      {isOpen && (
        <div
          id="dropdownAvatar"
          className=" z-10 lg:absolute  lg:right-0 md:mt-2 md:w-44 w-full  md:bg-white divide-y divide-gray-100 rounded-lg lg:shadow "
        >
          <div className="md:px-4 py-3 truncate text-sm text-gray-900 ">
            <div>{user.name}</div>
            <div className="font-medium truncate"><abbr className='no-underline hover:underline decoration-solid' title={user.email}>{user.email}</abbr></div>
          </div>
          <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownUserAvatarButton">
          <li>
              <a href="/" className="block px-4 py-2 hover:bg-gray-100 ">Favorite</a>
            </li>
            <li>
              <a href="/profile" className="block px-4 py-2 hover:bg-gray-100 ">Profile</a>
            </li>
            <li>
              <a href="/" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
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

