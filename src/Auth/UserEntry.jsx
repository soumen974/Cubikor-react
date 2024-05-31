
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import pagelogo from "../Customer/Component/Data/images-app/page-logo.jpg";
// import { useSelector, useDispatch } from 'react-redux';

export default function UserEntry(Props) {
  const cancelButtonRef1 = useRef(null);
  const cancelButtonRef = useRef(null);
  
  // ------------------------------------registration{signUp}

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      email,
      password,
    };
  
    try {
      const response = await fetch('http://localhost:5000/register', {
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
          Props.setOpenSignIn(true);
          Props.setOpen(false);
        }, 2000);
        
        // Clear the form fields
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.json();
        setError(errorData.error );
      }
    } catch (error) {
      setError('An error occurred while registering');
    }
  };
  
  // -------------------------signIn-/Login----------------

  const [SignInemail, setSignInEmail] = useState('');
  const [SignInpassword, setSignInPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userRole, setuserRole] = useState(null);

  const SignInAuthCheck = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: SignInemail, password: SignInpassword }), // Corrected variable names
      });
  
      if (response.ok) {
        const responseData = await response.json(); // Move this line inside if block
        const token = responseData.token;
        const userId=responseData.userId;
        const user_type=responseData.user_type
        setuserRole(user_type);

        // console.log(userId);
        // console.log(token);
        setSuccessMessage('Login successful');
        localStorage.setItem('isUserAuthenticated', 'true');
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        // localStorage.setItem('user_type', user_type);
        
        
        
        // console.log(user_type);
       
        
        setTimeout(() => {
          setSuccessMessage('');
          Props.setOpenSignIn(false);
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
 
  useEffect(() => {
    if(userRole==="admin"){
      localStorage.setItem('isAdmin', 'true');
    }
    else if(userRole===""){
      localStorage.setItem('isAdmin', 'false');

    }
  }, [userRole])
  

 
  


  return (
   <>

   {/* signIn - login */}
   
   <Transition.Root show={Props.SignInopen  } as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef1} onClose={Props.setOpenSignIn}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className=" fixed inset-0  w-screen overflow-y-auto z-0">
          <div className=" flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="bg-white py-10 px-5  relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-12 w-auto rounded-full"
              src={pagelogo}
              alt="Your Company"
            />
            <h2 className="mt-10 capitalize text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
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
              <div onClick={()=>{Props.setOpenSignIn(false);Props.setOpen(true);}} className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Create account
              </div>
            </p>
            <a href='/seller/Login' className="mt-2 underline hover:no-underline  text-center flex justify-end text-sm text-gray-400">
              Seller ?
            </a>
          </div> 

           

                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root> 

    {/* signUp */}

    <Transition.Root show={Props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={Props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className=" fixed inset-0 z-[999] w-screen overflow-y-auto">
          <div className=" flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="bg-white py-10 px-5  relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-12 w-auto rounded-full"
              src={pagelogo}
              alt="Your Company"
            />
            <h2 className="mt-10 capitalize text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create your account
            </h2>
             </div>
  
          <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success ?( <p style={{ color: 'green' }}>{success}</p>)
          :(
          <form onSubmit={handleSubmit} className="space-y-6">
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
              Already a member?{' '}
             
              <div onClick={()=>{Props.setOpenSignIn(true);Props.setOpen(false);}} className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign in to your account
              </div>
              
            </p>
            <a href='/seller/SignUp' className="mt-2 underline hover:no-underline  text-center flex justify-end text-sm text-gray-400">
              Seller ?
              </a>
          </div>

                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    
   </>
  )
}
