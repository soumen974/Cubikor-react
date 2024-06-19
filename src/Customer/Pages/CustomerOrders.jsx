import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerOrders = () => {
    const userId = localStorage.getItem('userId');
    const customerId=userId;
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/customer-orders/${customerId}`);
        setOrders(response.data.orders);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching customer orders');
      }
    };

    fetchCustomerOrders();
  }, [customerId]);

  return (
    <div className='mt-10 '>
      <h1>Customer Orders</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className='grid gap-y-8 gap-x-4 md:grid-cols-3 '>
        {orders.map(order => (
          <li className='bg-gray-100' key={order.order_id}>
            <p>Order ID: {order.order_id}</p>
            <p>Seller ID: {order.seller_id}</p>
            <p>Product ID: {order.product_id}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Order Date: {new Date(order.order_date).toLocaleString()}</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerOrders;
