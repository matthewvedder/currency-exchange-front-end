import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, CircularProgress } from '@material-ui/core';
import { getQuote, createOrder } from '../../../api';
import './index.css';

function QuoteDialog({ open, handleClose }) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuoteOnMount = async () => {
      try {
        const response = await getQuote();
        const { data } = response;
        setQuote(data);
      } catch (error) {
        setError('Failed to fetch quote');
        console.error(error);
      }
    };

    if (open) {
      fetchQuoteOnMount();
    }

    if (!open) {
      setQuote(null);
      setAmount(0);
      setConvertedAmount('');
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    if (quote && amount) {
      const converted = parseFloat(amount) * parseFloat(quote.rate);
      setConvertedAmount(converted.toFixed(2));
    }
  }, [amount, quote]);

  const submitOrder = async () => {
    try {
      const orderData = {
        quote_id: quote.id,
        user_id: 'your_user_id', // Replace with actual user ID
        from_amount: amount
      };
      await createOrder(orderData);
      handleClose(); // Close the dialog on success
    } catch (error) {
      setError('Failed to create order');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Exchange USD to PHP</DialogTitle>
      <DialogContent>
        {!quote && <div className='loading-quote'><CircularProgress /></div>}
        {quote && (
          <div>
            <p>Rate: {quote.rate}</p>
            <TextField
              autoFocus
              margin="dense"
              label="Amount in USD"
              type="number"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p>PHP {convertedAmount}</p>
          </div>
        )}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={submitOrder} color="primary" disabled={!quote}>
          Submit Order
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default QuoteDialog;