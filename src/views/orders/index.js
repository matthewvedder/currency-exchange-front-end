// libraries
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
// utils
import firestore from '../../firebase';
// components
import Table from './Table';

const OrdersContainer = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'orders'));

        const ordersData = querySnapshot.docs.map(doc => ((doc.data() || {}).data));
        setOrders(ordersData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log(orders)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Table rows={orders} />
  );
};

export default OrdersContainer;
