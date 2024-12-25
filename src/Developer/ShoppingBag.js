import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShoppingBag() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/users/1/shopping_bag`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching shopping bag items:', error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Shopping Bag</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.product_id} - Quantity: {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingBag;
