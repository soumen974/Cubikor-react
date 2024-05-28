import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile_number: '',
    date_of_birth: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

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
          const userData = await response.json();
          localStorage.setItem('isUserAuthenticated', 'true');
          setUser(userData);
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Error retrieving user');
        }
      } catch (error) {
        setErrorMessage('An error occurred, please try again later');
        localStorage.removeItem('isUserAuthenticated');
      }
    };

    if (userId && token) {
      fetchUser();
    }
  }, [userId]);

  return (
    <>
      <div>
        <div className="px-4 pt-20 sm:px-0">
          {errorMessage && (
            <div className="text-red-500">{errorMessage}</div>
          )}
          {user.email && (
            <>
              <h3 className="text-base font-semibold leading-7 text-gray-900 capitalize">Profile: {user.name}!</h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details</p>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{user.name}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Mobile</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.mobile_number}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Date of Birth</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.date_of_birth}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Shipping Address</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                      {user.street}, {user.city}, {user.state}, Pin-{user.zipcode}, {user.country}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex justify-end pt-10">
                <a href='/profileEdit' className="bg-indigo-500 px-10 py-2 rounded-full text-center text-white">Edit</a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
