import React, { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export default function Fav({ prdId, prdName, prdImage_src, prdPrice }) {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [favorites, setFavorites] = useState([]);
  const [removeFaveid, setremoveFaveid] = useState(null);
  const [isFav, setIsFav] = useState(null);

  const addToFavorite = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/favorite/${userId}`,
        {
          product_id: prdId,
          product_name: prdName,
          image_src: prdImage_src,
          price: prdPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('Added to favorite:', response.data);
        setIsFav(true);
        setremoveFaveid(response.data.id); // Assuming response returns the favorite ID
      }
    } catch (error) {
      console.error('Error adding to favorite:', error.response?.data || error.message);
    }
  };

  const removeFromFavorite = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/favorite/${userId}/${removeFaveid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        console.log('Removed from favorite:', response.data);
        setIsFav(false);
        setremoveFaveid(null);
      }
    } catch (error) {
      console.error('Error removing from favorite:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/favorite/all`, {
          withCredentials: true, // Ensure cookies are sent with the request
        });

        const favoritesData = response.data;
        setFavorites(favoritesData);

        const isProductFavorite = favoritesData.some((favorite) => prdId === favorite.product_id);
        setIsFav(isProductFavorite);

        const cartItem = favoritesData.find((favorite) => favorite.product_id === prdId);
        if (cartItem) {
          setremoveFaveid(cartItem.id);
        } else {
          setremoveFaveid(null);
        }
      } catch (err) {
        console.log(err.response ? err.response.data : err.message);
      }
    };

    fetchFavorites();
  }, [prdId]);

  const actions = async (e) => {
    e.preventDefault();
    if (isFav) {
      setIsFav(false);
      setremoveFaveid(null);
      await removeFromFavorite();
    } else {
      setIsFav(true);
      await addToFavorite();
    }
  };

  return (
    <>
      <form onSubmit={actions} className="flex z-50">
        <button
          type="submit"
          className={`bg-white shadow-md border-[1px] rounded-full p-1 flex items-center justify-center text-transparent`}
        >
          <span className="sr-only">Favorite</span>
          <HeartIcon
            className={`h-7 w-7 rounded-full p-1 ${!isFav ? 'text-gray-500' : 'fill-red-500'}`}
            aria-hidden="true"
          />
        </button>
      </form>
    </>
  );
}
