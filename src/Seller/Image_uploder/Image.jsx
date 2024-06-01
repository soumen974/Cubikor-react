import React, { useState } from 'react';
import axios from 'axios';

function Image({ image }) {
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/images/${image.id}`);
      setMessage(response.data);
      window.location.reload(); // Refresh the list after deletion
    } catch (error) {
      setMessage(`Error: ${error.response ? error.response.data : 'Server Error'}`);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.put(`http://localhost:3000/images/${image.id}`, formData);
      setMessage(response.data);
      setIsEditing(false);
      window.location.reload(); // Refresh the list after update
    } catch (error) {
      setMessage(`Error: ${error.response ? error.response.data : 'Server Error'}`);
    }
  };

  return (
    <div>
      <img src={`data:image/jpeg;base64,${image.data}`} alt="Uploaded" />
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      {isEditing && (
        <form onSubmit={handleUpdate}>
          <input type="file" onChange={handleFileChange} required />
          <button type="submit">Update</button>
        </form>
      )}
      <p>{message}</p>
    </div>
  );
}

export default Image;
