import {React,  useEffect, useState } from 'react'
import pagelogo from "../Customer/Component/Data/images-app/page-logo.jpg";
import { useNavigate } from 'react-router-dom';



export default function Login() {
    const [SignInemail, setSignInEmail] = useState('');
    const [SignInpassword, setSignInPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [userRole, setuserRole] = useState(null);

    const navigate= useNavigate();
  
    const SignInAuthCheck = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/shops/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: SignInemail, password: SignInpassword }), // Corrected variable names
        });
    
        if (response.ok) {
          const responseData = await response.json(); // Move this line inside if block
          const SellerToken = responseData.token;
          const ShopId=responseData.userId;
          navigate('/seller/categoriesadd')

         
          
  
          // console.log(userId);
          // console.log(token);
          setSuccessMessage('Login successful');
          localStorage.setItem('SellerToken', SellerToken);
          localStorage.setItem('ShopId', ShopId);
          // localStorage.setItem('user_type', user_type);
          
          
          
          // console.log(user_type);
         
          
          setTimeout(() => {
            setSuccessMessage('');
            
            setSignInEmail("");
            setSignInPassword("");
          }, 1000); // Remove success message after 10 seconds
        } else {
          const LoginerrorData = await response.json(); // Get error message from response
          setErrorMessage(LoginerrorData.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 1000);
        }
      } catch (error) {
        setErrorMessage('An error occurred, please try again later');
      }
    };
  
    // console.log(userRole);
   
   
    
  
  return (
    
   <div className="flex h-screen justify-center items-center">
     <div className=" py-10 px-5  relative transform overflow-hidden rounded-lg text-left  transition-all sm:my-8 w-full sm:max-w-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
            className="mx-auto h-12 w-auto rounded-full"
            src={pagelogo}
            alt="Your Company"
        />
        <h2 className="mt-10 capitalize text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your shop
        </h2>
        </div>
            
        <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <form onSubmit={SignInAuthCheck} className="space-y-6" >
            <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
            </label>
            <div className="mt-2">
                <input
                id="email"
                name="email"
                value={SignInemail}
                onChange={(e) => setSignInEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            </div>

            <div>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
                </label>
                <div className="text-sm">
                <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                </a>
                </div>
            </div>
            <div className="mt-2">
                <input
                id="password"
                name="password"
                value={SignInpassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            </div>

            <div>
            <button
                // onClick={SignInAuthCheck}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Sign in
            </button>
            </div>
        </form>

        <p className="mt-10 text-center flex text-sm text-gray-500">
            Not a member ?
            <a href='/seller/Signup' className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Create Shop
            </a>
        </p>

        </div> 
    
    </div>
   </div>
  )
}
