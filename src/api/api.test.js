import axios from './axios-client';
import MockAdapter from 'axios-mock-adapter';
import { getQuote, createOrder } from './index.js';

describe('API methods', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('fetches a quote successfully', async () => {
    const mockData = { rate: '54.42' };
    mock.onPost('/quote').reply(200, mockData);

    const data = await getQuote();
    expect(data).toEqual(mockData);
  });

  it('creates an order successfully', async () => {
    const mockOrderData = { quote_id: '123', user_id: 'abc', from_amount: '1' };
    const mockResponseData = { id: 'order123', status: 'pending' };
    mock.onPost('/orders').reply(200, mockResponseData);

    const data = await createOrder(mockOrderData);
    expect(data).toEqual(mockResponseData);
  });
});