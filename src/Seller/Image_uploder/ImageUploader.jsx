import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      setMessage(response.data);
    } catch (error) {
      setMessage(`Error: ${error.response ? error.response.data : 'Server Error'}`);
    }
  };

  return (
    <div className='mt-20' >
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ImageUploader;
