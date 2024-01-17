import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
  InputAdornment
} from '@material-ui/core';
import { getQuote, createOrder } from '../../../api';
import './index.css';

function QuoteDialog({ open, handleClose }) {
  const [quote, setQuote] = useState(null);
  const [amount, setAmount] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuoteOnMount = async () => {
      setLoading(true)
      try {
        const response = await getQuote();
        const { data } = response;
        setQuote(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch quote');
        console.error(error);
        setLoading(false);
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
    if (!amount) {
      setConvertedAmount(null);
    }
    if (quote && amount) {
      const converted = parseFloat(amount) * parseFloat(quote.rate);
      setConvertedAmount(converted.toFixed(2));
    }
  }, [amount, quote]);

  const handleAmountChange = (event) => {
    const { value } = event.target;
    if (value < 0) {
      setAmount(Math.abs(value));
    } else {
      setAmount(value);
    }
  }

  const submitOrder = async () => {
    try {
      const orderData = {
        quote_id: quote.id,
        // using env variable here because there is no auth but would normally be stored in redux state
        user_id: process.env.REACT_APP_USER_ID,
        from_amount: amount,
        to_amount: convertedAmount,
        rate: quote.rate,
      };
      await createOrder(orderData);
      handleClose();
    } catch (error) {
      setError('Failed to create order');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Exchange USD to PHP</DialogTitle>
      <DialogContent>
        {loading && <div className='loading-quote'><CircularProgress /></div>}
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
              onChange={handleAmountChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <p>PHP: {convertedAmount && `₱${parseFloat(convertedAmount).toLocaleString()}`}</p>
          </div>
        )}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={submitOrder} 
          color="primary" 
          disabled={!quote || amount <= 0}
        >
          Submit Order
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default QuoteDialog;