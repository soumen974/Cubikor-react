import DialogBox from '../DialogBox';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const [Dialogopen, setDialogopenOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const [userData, setUserData] = useState({
    username: '',
    name: '',
    auth: false,
    password: '',
    date_of_birth: '',
    country: '',
    security_question: '',
    security_answer: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    shipping_country: '',
    mobile_number: '',
    last_activity: null
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userDetails = await response.json();
         
          setUserData(userDetails);
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Error retrieving user');
        }
      } catch (error) {
        setErrorMessage('An error occurred, please try again later');
      }
    };

    if (userId && token) {
      fetchUser();
    }
  }, [userId, token]);

  const navigate =useNavigate();



  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Updating ${name} to ${value}`);
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedData = {
      username: userData.username,
      name: userData.name,
      auth: userData.auth,
      date_of_birth: userData.date_of_birth ? userData.date_of_birth.split('T')[0] : null,
      country: userData.country,
      security_question: userData.security_question,
      security_answer: userData.security_answer,
      shipping_address: {
        street: userData.street,
        city: userData.city,
        state: userData.state,
        zipcode: userData.zipcode,
        country: userData.shipping_country,
      },
      mobile_number: userData.mobile_number,
    };


    axios.put(`http://localhost:5000/users/${userId}`, updatedData, {
      headers: {
        'Authorization': `Bearer ${token}`
    }
     
    })
      .then(response => {
        console.log('User updated successfully', response.data);
        setTimeout(() => {
          setDialogopenOpen(false);
          navigate('/profile');
        }, 1100);
      })
      .catch(error => {
        setErrorMessage('There was an error updating the user');
        console.error('Error:', error);
      });
  };

  return (
    <div className="relative isolate px-6 pt-0 lg:pt-0">
      <div className="mx-auto max-w-2xl py-32 sm:py-10 lg:py-10">
        <form >
          {errorMessage && <p>{errorMessage}</p>}
          <div className="space-y-8 mt-20">
            <div className="border-b border-gray-900/10 pb-7">
              <h2 className="text-md font-semibold leading-7 text-gray-900">Profile : {userData.name}</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will help us to send your purchase.
              </p>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      id="name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="mobile_number" className="block text-sm font-medium leading-6 text-gray-900">
                    Mobile Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="mobile_number"
                      value={userData.mobile_number}
                      onChange={handleChange}
                      id="mobile_number"
                      autoComplete="mobile number"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                

                <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                    Country
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="country"
                      value={userData.country}
                      onChange={handleChange}
                      id="country"
                      autoComplete="country"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 sm:col-start-1">
                  <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street"
                      value={userData.street}
                      onChange={handleChange}
                      id="street"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="shipping_country" className="block text-sm font-medium leading-6 text-gray-900">
                    Shipping Country
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="shipping_country"
                      value={userData.shipping_country}
                      onChange={handleChange}
                      id="shipping_country"
                      autoComplete="shipping-country"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      value={userData.city}
                      onChange={handleChange}
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="state"
                      value={userData.state}
                      onChange={handleChange}
                      id="state"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="zipcode" className="block text-sm font-medium leading-6 text-gray-900">
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="zipcode"
                      value={userData.zipcode}
                      onChange={handleChange}
                      id="zipcode"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

               

                <div className="col-span-full">
                  <label htmlFor="security_question" className="block text-sm font-medium leading-6 text-gray-900">
                    Security Question
                  </label>
                  <div className="mt-2">
                    <select
                      id="security_question"
                      name="security_question"
                      value={userData.security_question}
                      onChange={handleChange}
                      autoComplete="security-question"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">Select a question</option>
                      <option value="What is your pet's name?">What is your pet's name?</option>
                      <option value="What is your mother's maiden name?">What is your mother's  name?</option>
                      <option value="What was the name of your first school?">What was the name of your first school?</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="security_answer" className="block text-sm font-medium leading-6 text-gray-900">
                    Security Answer
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="security_answer"
                      value={userData.security_answer}
                      onChange={handleChange}
                      id="security_answer"
                      autoComplete="security-answer"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <a href='/profile'  className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </a>
              <div onClick={()=>{setDialogopenOpen(true)}}
               
                className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </div>
            </div>
          </div>
        </form>
      </div>
      
      {Dialogopen && <DialogBox 
        open={Dialogopen}
         setOpen={setDialogopenOpen} 
         title={"Save changes Permanently"}
         message={"Are you sure you want to update your account data All of your data will be permanently changes. This action cannot be undone."}
         ActionButtonName={"Save changes"}
         ActionButtonColor={"bg-indigo"}
         IconName={"CheckIcon"}
         handleLogic={handleSubmit}
         
         
         />}   


    </div>
  );
}
