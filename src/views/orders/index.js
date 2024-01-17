// libraries
import React, { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
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
    const ordersCollectionRef = collection(firestore, 'orders');
    const orderedQuery = query(ordersCollectionRef, orderBy('created_at', 'desc'))

    const unsubscribe = onSnapshot(orderedQuery, 
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

  return (
    <div className='orders'>
      <h1>Exchange US Dollars to Philippine Pesos</h1>
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
