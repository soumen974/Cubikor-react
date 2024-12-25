
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import pagelogo from "../Customer/Component/Data/images-app/page-logo.jpg";
import { ExclamationTriangleIcon,CheckIcon } from '@heroicons/react/24/outline';
import CodeInputForm from "./CodeInputForm";
import PageLoder from "../Loaders/PageLoder";
export default function UserEntry(Props) {
  const cancelButtonRef1 = useRef(null);
  const cancelButtonRef = useRef(null);

  const [isOtpVerified,setIsOtpVerified]=useState(false);
  const [isOtpopen,setIsOtpopen]=useState(false);
  const [isLoading,setIsLoading]=useState(false);

    // otp timer ---

    const [time, setTime] = useState(360); // 6 minutes in seconds
    const [isActive, setIsActive] = useState(false);
  
    useEffect(() => {
      let interval = null;
      if (isActive && time > 0) {
        interval = setInterval(() => {
          setTime(time => time - 1);
        }, 1000);
        if(isOtpVerified){
          setTime(0);
        }
      } else if (time === 0) {
        clearInterval(interval);
        setSuccess(null);
        setIsOtpopen(false);
        
      }
      return () => clearInterval(interval);
    }, [isActive, time,isOtpVerified]);
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
  
  // ------------------------------------registration{signUp}

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[name,setName]=useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    const formData = {
      email,
    };
  
    const formDatatoPasswordAdd = {
      email,
      name,
      password,
    };
  
    if (isOtpVerified) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
  
      try {
        const response = await fetch(`${REACT_APP_API_URL}/addpassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDatatoPasswordAdd),
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          setSuccess(responseData.message);
          console.log(responseData.message);
          setTimeout(() => {
            setSuccess(null);
            Props.setOpenSignIn(true);
            Props.setOpen(false);
          }, 2000);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        } else {
          setError(responseData.errors ? responseData.errors.map(err => err.msg).join(', ') : 'An error occurred while creating the user');
        }
      } catch (error) {
        setError('An error occurred while creating the user');
      }
    } else {
      setIsLoading(true);
      try {
        const response = await fetch(`${REACT_APP_API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          setSuccess(responseData.message);
          setTime(360);
          setIsActive(true);
          setIsOtpopen(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setError(responseData.error || 'An error occurred while registering');
        }
      } catch (err) {
        if (err.response) {
          setIsLoading(false);
          setError(err.response.data.errors?.[0]?.msg || err.response.data.error || 'Registration failed');
        } else {
          setError('Registration failed');
          setIsLoading(false);
        }    
       }
    }
  };
  
  

  
  // -------------------------signIn-/Login----------------

  const [SignInemail, setSignInEmail] = useState('');
  const [SignInpassword, setSignInPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // const [userRole, setuserRole] = useState(null);

  const SignInAuthCheck = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: SignInemail, password: SignInpassword }), // Corrected variable names
      });
  
      if (response.ok) {
        const responseData = await response.json(); // Move this line inside if block
        const token = responseData.token;
        const userId=responseData.userId;
        

        // console.log(userId);
        // console.log(token);
        setSuccessMessage('Login successful');
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

 
  // google login

    const handleOAuthGoogleLogin = () => {
      window.location.href = `${REACT_APP_API_URL}/auth/google`;
    };

 
  
  


  return (
   <>

   {/* signIn - login */}
   
   
   <Transition.Root show={Props.SignInopen  } as={Fragment}>
      <Dialog as="div" className="relative z-40" initialFocus={cancelButtonRef1} onClose={Props.setOpenSignIn}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div id='Login' className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
          {errorMessage && <p className='-mt-9 py-2 text-red-400 flex gap-2'><ExclamationTriangleIcon className='h-6 bg-red-100 p-1 rounded-full w-6'/>{errorMessage}</p>}
          {successMessage && <p className='-mt-9 py-2 text-green-400 flex gap-2'><CheckIcon className='h-6 bg-green-100 p-1 rounded-full w-6'/> {successMessage}</p>}
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
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
              
            </form>
            <div>
                <button
                  onClick={handleOAuthGoogleLogin}
                  className="flex w-full justify-center  mt-3 px-3 py-1.5 text-sm font-semibold  text-gray-700    "
                >
                   Login with Google
                </button>
              </div>
  
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
      <Dialog as="div" className="relative z-40" initialFocus={cancelButtonRef} onClose={Props.setOpen}>
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
          {error && <p className='-mt-9 py-2 text-red-400 flex gap-2'><ExclamationTriangleIcon className='h-6 bg-red-100 p-1 rounded-full w-6'/>{error}</p>}
          {success ?( <div className='grid justify-center items-center text-green-400 '><CheckIcon className=' bg-green-100 p-2 mx-auto flex justify-center rounded-full h-10 w-10'/> 
                       <h1 className='flex justify-center py-2 ' >{success}  </h1>

                        
                      </div>)
          :(
            isLoading?(
              <div className="flex justify-center items-center h-[8rem]"><PageLoder/></div>
            ):(
            <form onSubmit={handleSubmit} className="space-y-6">
            
              
            


              {isOtpVerified?(
              <>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                      Name
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
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
                </>
              ):(
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

              )}

          
                      

              
              

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isOtpVerified? 'Register':'Go next'}
                </button>
              </div>
            </form>)
          )}

          {isOtpopen&&(<>
          <div className="text-lg font-semibold text-gray-900 flex gap-3">Enter Code  <h1 className='text-sm font-normal flex items-center text-blue-600 '>{formatTime(time)}</h1> {time === 0 && <button className='text-red-600 text-sm font-normal ' >Time out</button>}</div>
          <CodeInputForm setSuccess={setSuccess} setIsLoading={setIsLoading} setIsOtpopen={setIsOtpopen} setIsOtpVerified={setIsOtpVerified} email={email}/>
          </>)}    
                      
          

  
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
