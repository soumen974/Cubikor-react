import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from "../../redux/userSlice";
import DialogBox from '../../Customer/DialogBox';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import PageLoder from "../../../src/Loaders/PageLoder";
import Cookies from 'js-cookie';
import axios from "axios";
import { UserRoundPen ,BookHeart} from 'lucide-react';
export default function Avatar() {

    const [isOpen, setIsOpen] = useState(false);
    const [Dialogopen, setDialogopenOpen] = useState(false);

    const Navigate =useNavigate();


    function logout() {
      axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
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
    //         const response = await fetch(`http://localhost:5000/users/${userId}`, {
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
          const response = await axios.get('http://localhost:5000/protected', {
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
                <NavLink to={"/profile"} className={({isActive}) => ` ${isActive ? ' hover:bg-indigo-50 hover:text-indigo-700 text-indigo-500  bg-indigo-100 ':' hover:bg-gray-100 text-gray-400 hover:text-gray-500 '} px-4 py-2 flex gap-2`}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                  <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
                </svg>
                Profile</NavLink>
              </li>
              <li>
                <NavLink to={"/favorites"} className={({isActive}) => ` ${isActive ? ' hover:bg-indigo-50 hover:text-indigo-700 text-indigo-500   bg-indigo-100 ':' hover:bg-gray-100 text-gray-400 hover:text-gray-500 '} flex gap-2 px-4 py-2  `}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
              </svg>
              Favorite</NavLink>
              </li>
              <li>
                <NavLink  to={"/myorders"} className={({isActive}) => ` ${isActive ? ' hover:bg-indigo-50 hover:text-indigo-700 text-indigo-500  bg-indigo-100 ':' hover:bg-gray-100  text-gray-400 hover:text-gray-500'} flex gap-2 px-4 py-2  `}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                  <path d="M2 3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Z" />
                  <path fillRule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 0 1-1.99 1.79H4.802a2 2 0 0 1-1.99-1.79L2 7.5ZM7 11a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                </svg>
                My Orders</NavLink>
              </li>
            
              <li>
                <a href="/" className="flex gap-2 px-4 py-2 hover:bg-gray-100 text-gray-400 hover:text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path fillRule="evenodd" d="M8.34 1.804A1 1 0 0 1 9.32 1h1.36a1 1 0 0 1 .98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 0 1 1.262.125l.962.962a1 1 0 0 1 .125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 0 1 .804.98v1.361a1 1 0 0 1-.804.98l-1.473.295a6.95 6.95 0 0 1-.587 1.416l.834 1.25a1 1 0 0 1-.125 1.262l-.962.962a1 1 0 0 1-1.262.125l-1.25-.834a6.953 6.953 0 0 1-1.416.587l-.294 1.473a1 1 0 0 1-.98.804H9.32a1 1 0 0 1-.98-.804l-.295-1.473a6.957 6.957 0 0 1-1.416-.587l-1.25.834a1 1 0 0 1-1.262-.125l-.962-.962a1 1 0 0 1-.125-1.262l.834-1.25a6.957 6.957 0 0 1-.587-1.416l-1.473-.294A1 1 0 0 1 1 10.68V9.32a1 1 0 0 1 .804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 0 1 .125-1.262l.962-.962A1 1 0 0 1 5.38 3.03l1.25.834a6.957 6.957 0 0 1 1.416-.587l.294-1.473ZM13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd" />
              </svg>
              Settings</a>
              </li>
            
            </ul>

            <div onClick={()=>{setDialogopenOpen(true);setIsOpen(!isOpen);}}  className="py-2">
              <div className="cursor-pointer flex gap-2 px-4 py-2 text-sm text-gray-400 hover:text-gray-500 hover:bg-gray-100 "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z" clipRule="evenodd" />
            </svg>
            Sign out</div>
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

