// librairies
import React from 'react';
// components
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Button } from '@mui/material';
// styles
import './index.css'


export default function Empty(props) {
  console.log(props)

  return (
    <div className="empty">
      <CurrencyExchangeIcon sx={{ fontSize: 100 }} />
      <h2>No Currency Exchange Orders</h2>
      <p>Click the button below to get started!</p>
      <Button variant='outlined' onClick={props.onButtonClick}>
        Make an Exchange
      </Button>
    </div>
  )
}