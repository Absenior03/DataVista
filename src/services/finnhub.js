import axios from 'axios';

const API_KEY = 'ctv0dspr01qg98te8kl0ctv0dspr01qg98te8klg';
const BASE_URL = 'https://finnhub.io/api/v1';

export const getStockNews = () => {
    return axios.get(`${BASE_URL}/news?category=general&token=${API_KEY}`);
};

export const getCryptocurrencyData = () => {
    return axios.get(`${BASE_URL}/crypto/symbols?token=${API_KEY}`);
};

export const getForexData = () => {
    return axios.get(`${BASE_URL}/forex/rates?token=${API_KEY}`);
};

export const getEconomicIndicators = () => {
    return axios.get(`${BASE_URL}/economic-indicators?token=${API_KEY}`);
};

export const getGlobalMarkets = () => {
    return axios.get(`${BASE_URL}/global-markets?token=${API_KEY}`);
};