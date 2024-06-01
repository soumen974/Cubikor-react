import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from './Image';

function ImageList() {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log('Fetching images...');
        const response = await axios.get('http://localhost:5000/images');
        console.log('Response received:', response.data);

        // Ensure response data is an array
        if (Array.isArray(response.data)) {
          setImages(response.data);
        } else {
          setMessage('Failed to load images. Response is not an array.');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setMessage(`Error: ${error.response ? error.response.data : 'Server Error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <div className="mt-20">
      <h2>Image List</h2>
      <div>
        {images.map((image) => (
          <Image key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

export default ImageList;
