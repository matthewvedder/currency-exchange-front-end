// libraries
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='orders'>
      <Button 
        onClick={() => setCreateDialogOpen(true)}
        startIcon={<CurrencyExchangeIcon />}
      >
        Make an Exchange
      </Button>
      <Table rows={orders} />
      <CreateDialog open={createDialogOpen} handleClose={() => setCreateDialogOpen(false)} />
    </div>
  );
};

export default OrdersContainer;
