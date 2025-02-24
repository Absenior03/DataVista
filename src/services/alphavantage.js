import axios from 'axios';

const API_KEY = '5TYSM0EW2KFF7WCB';
const BASE_URL = 'https://www.alphavantage.co/query';

export const getStockCandles = (symbol, interval = '60min') => {
  return axios.get(`${BASE_URL}`, {
    params: {
      function: 'TIME_SERIES_INTRADAY',
      symbol: symbol,
      interval: interval,
      apikey: API_KEY,
    },
  })
    .then(response => {
      if (response.data['Error Message']) {
        throw new Error(response.data['Error Message']);
      }
      return response.data;
    })
    .catch(error => {
      console.error("Error fetching stock candles:", error);
      return null;
    });
};