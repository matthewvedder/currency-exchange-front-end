import axios from './axios-client';

export const getQuote = async () => {
  try {
    const response = await axios.post('/quote');
    return response.data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  console.log('orderData', orderData);
  try {
    const response = await axios.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};