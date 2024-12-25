import React, { useState } from 'react';
import axios from 'axios';

const CodeInputForm = ({ email,setIsOtpVerified ,setIsOtpopen,setSuccess,setIsLoading}) => {
  const [codes, setCodes] = useState(Array(6).fill(''));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    // Auto-focus on the next input field
    if (value && index < 5) {
      document.getElementById(`code-${index + 2}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = codes.join('');
    setIsLoading(true);

    try {
       await axios.post(`${process.env.REACT_APP_API_URL}/verify-email`, { email, code });
      setMessage('Email verified successfully!');
      setSuccess('Email verified successfully!');
      setTimeout(() => {
        setIsOtpVerified(true);
        setIsOtpopen(false);
        
      }, 2000);
     setIsLoading(false);
      setError('');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors.map(e => e.msg).join(', '));
      } else if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred while verifying the email.');
      }
      setMessage('');
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="flex my-2 space-x-2 rtl:space-x-reverse">
        {[1, 2, 3, 4, 5, 6].map((num, index) => (
          <div key={num}>
            <label htmlFor={`code-${num}`} className="sr-only">{`Code ${num}`}</label>
            <input
              type="text"
              maxLength="1"
              id={`code-${num}`}
              value={codes[index]}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
        ))}
      </div>
      <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500">
        Please introduce the 6 digit code we sent via email.
      </p>
      <button
      type="submit"
      className="flex w-full mt-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
        Verify Email
    </button>
      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </form>
  );
};

export default CodeInputForm;



//  <div>
// <div className="flex items-center justify-between">
//   <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
//     Password
//   </label>
// </div>
// <div className="mt-2">
//   <input
//     id="password"
//     name="password"
//     type="password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//     autoComplete="new-password"
//     required
//     className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//   />
// </div>
// </div>

// <div>
// <div className="flex items-center justify-between">
//   <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
//     Confirm Password
//   </label>
// </div>
// <div className="mt-2">
//   <input
//     id="confirmpassword"
//     name="confirmpassword"
//     value={confirmPassword}
//      onChange={(e) => setConfirmPassword(e.target.value)}
//     type="password"
//     autoComplete="new-password"
//     required
//     className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//   />
// </div>
// </div>

// const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const formData = {
//     email,
//     password,
//   }; 