import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SellerOrders = () => {
    const shopId = localStorage.getItem('ShopId');
    const sellerId=shopId;

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/seller-orders/${sellerId}`);
        setOrders(response.data.orders);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching seller orders');
      }
    };

    fetchSellerOrders();
  }, [sellerId]);

  return (
    <div>
      <h1>Seller Orders</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className='grid gap-y-8'>
        {orders.map(order => (
          <li className='bg-gray-200' key={order.order_id}>
            <p>Order ID: {order.order_id}</p>
            <p>Customer ID: {order.customer_id}</p>
            <p>Product ID: {order.product_id}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Order Date: {new Date(order.order_date).toLocaleString()}</p>
            <p>Status: {order.status}</p>
            <p>Address: {order.user_address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerOrders;
