import React, { useState } from 'react';

const CodeInputForm = () => {
  const [email, setEmail] = useState('');
  const [codes, setCodes] = useState(Array(6).fill(''));
  const [message, setMessage] = useState('');

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

    try {
      const response = await fetch('/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Email verified successfully!');
      } else {
        setMessage(data.error || 'Verification failed.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
        {[1, 2, 3, 4, 5, 6].map((num, index) => (
          <div key={num}>
            <label htmlFor={`code-${num}`} className="sr-only">{`Code ${num}`}</label>
            <input
              type="text"
              maxLength="1"
              id={`code-${num}`}
              value={codes[index]}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
        ))}
      </div>
      <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Please introduce the 6 digit code we sent via email.
      </p>
      <button
        type="submit"
        className="mt-4 w-full bg-primary-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Verify Email
      </button>
      {message && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{message}</p>}
    </form>
  );
};

export default CodeInputForm;
