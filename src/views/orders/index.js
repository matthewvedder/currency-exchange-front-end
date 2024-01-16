// libraries
import React, { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
// utils
import firestore from '../../firebase';
// components
import { Button } from '@mui/material';
import Table from './Table';
import CreateDialog from './CreateDialog';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
// styles
import './index.css'

const OrdersContainer = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'orders'));

        const ordersData = querySnapshot.docs
        setOrders(ordersData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const ordersCollectionRef = collection(firestore, 'orders');

    const unsubscribe = onSnapshot(ordersCollectionRef, 
      (querySnapshot) => {
        const ordersData = querySnapshot.docs
          .map(doc => doc.data());
        setOrders(ordersData);
        setLoading(false);
      }, 
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log('orders', orders);

  return (
    <div className='orders'>
      <Button 
        onClick={() => setCreateDialogOpen(true)}
        startIcon={<CurrencyExchangeIcon />}
      >
        Make an Exchange
      </Button>
      <Table rows={orders} onEmptyClick={() => setCreateDialogOpen(true)} />
      <CreateDialog open={createDialogOpen} handleClose={() => setCreateDialogOpen(false)} />
    </div>
  );
};

export default OrdersContainer;
