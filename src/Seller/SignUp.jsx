import { React, useEffect, useState } from 'react'
import pagelogo from "../Customer/Component/Data/images-app/page-logo.jpg";


export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setname] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    
      setError('');
    
      const formData = {
        name,
        email,
        password,
      };
    
      try {
        const response = await fetch('http://localhost:5000/shops/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          const responseData = await response.json();
          setSuccess(responseData.message );
          setTimeout(() => {
            setSuccess(null);
           
          }, 2000);
          
          // Clear the form fields
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setname('');
        } else {
          const errorData = await response.json();
          setError(errorData.error );
        }
      } catch (error) {
        setError('An error occurred while registering');
      }
    };
  return (
    <>
         
         <div className="flex h-screen justify-center items-center">
            
              <div className=" py-10 px-5  relative transform overflow-hidden rounded-lg text-left  transition-all sm:my-8 w-full sm:max-w-lg">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                className="mx-auto h-12 w-auto rounded-full"
                src={pagelogo}
                alt="Your Company"
                />
                <h2 className="mt-10 capitalize text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create your Shop
                </h2>
                </div>
    
                <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success ?( <p style={{ color: 'green' }}>{success}</p>)
                :(
                <form onSubmit={handleSubmit} className="space-y-6">

<div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Shop Name:
                    </label>
                    <div className="mt-2">
                        <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        autoComplete="name"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>
                    <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Confirm Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                        id="confirmpassword"
                        name="confirmpassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        autoComplete="new-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    

                    <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign Up
                    </button>
                    </div>
                </form>
                )}
                            
                    <p className="mt-10 text-center flex text-sm text-gray-500">
                    Already a Seller?{' '}
                    
                    <a href='/seller/Login'  className="cursor-pointer hover:underline font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Sign in to your Shop
                    </a>
                    </p>
                </div>

                
              </div>
        </div>
     
    </>
  )
}
