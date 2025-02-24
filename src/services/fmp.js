import axios from 'axios';

const API_KEY = 'WqvN9gKkvRgp1oCXVjuazZa6sKtNONlF'; // Replace with your FMP API key
const BASE_URL = 'https://financialmodelingprep.com/api/v3';

// Fetch top gainers
export const getTopGainers = () => {
  return axios.get(`${BASE_URL}/gainers?apikey=${API_KEY}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching top gainers:', error);
      throw error;
    });
};

// Fetch top losers
export const getTopLosers = () => {
  return axios.get(`${BASE_URL}/losers?apikey=${API_KEY}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching top losers:', error);
      throw error;
    });
};

// Fetch historical stock data (candlestick data)
export const getStockCandles = (symbol) => {
    return axios.get(`${BASE_URL}/historical-chart/1hour/${symbol}?apikey=${API_KEY}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching stock candles:', error);
        throw error;
      });
  };

// Fetch sector performance
export const getSectorPerformance = () => {
  return axios.get(`${BASE_URL}/sector-performance?apikey=${API_KEY}`)
    .then(response => {
      if (response.data && response.data.length > 0) {
        return response.data;
      } else {
        throw new Error('No data found for sector performance.');
      }
    })
    .catch(error => {
      console.error('Error fetching sector performance:', error);
      throw error;
    });
};

// Fetch forex rates
export const getForexRates = () => {
  return axios.get(`${BASE_URL}/fx?apikey=${API_KEY}`)
    .then(response => {
      if (response.data && response.data.length > 0) {
        return response.data;
      } else {
        throw new Error('No data found for forex rates.');
      }
    })
    .catch(error => {
      console.error('Error fetching forex rates:', error);
      throw error;
    });
};

// Fetch cryptocurrency rates
export const getCryptocurrencyRates = () => {
  return axios.get(`${BASE_URL}/quotes/crypto?apikey=${API_KEY}`)
    .then(response => {
      if (response.data && response.data.length > 0) {
        return response.data;
      } else {
        throw new Error('No data found for cryptocurrency rates.');
      }
    })
    .catch(error => {
      console.error('Error fetching cryptocurrency rates:', error);
      throw error;
    });
};

// Fetch ETF data
export const getETFs = () => {
  return axios.get(`${BASE_URL}/etf/list?apikey=${API_KEY}`)
    .then(response => {
      if (response.data && response.data.length > 0) {
        return response.data;
      } else {
        throw new Error('No data found for ETFs.');
      }
    })
    .catch(error => {
      console.error('Error fetching ETF data:', error);
      throw error;
    });
};

// Fetch economic indicators
export const getEconomicIndicators = () => {
  return axios.get(`${BASE_URL}/economic-indicators?apikey=${API_KEY}`)
    .then(response => {
      if (response.data && response.data.length > 0) {
        return response.data;
      } else {
        throw new Error('No data found for economic indicators.');
      }
    })
    .catch(error => {
      console.error('Error fetching economic indicators:', error);
      throw error;
    });
};

// Fetch global markets data
export const getGlobalMarkets = () => {
  return axios.get(`${BASE_URL}/global-markets?apikey=${API_KEY}`)
    .then(response => {
      if (response.data && response.data.length > 0) {
        return response.data;
      } else {
        throw new Error('No data found for global markets.');
      }
    })
    .catch(error => {
      console.error('Error fetching global markets:', error);
      throw error;
    });
};