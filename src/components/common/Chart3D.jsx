import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StockBarGraph = () => {
  const [stockData, setStockData] = useState({
    labels: [], // Stock symbols
    datasets: [
      {
        label: 'Stock Price',
        data: [], // Stock prices
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  // Fetch stock data from Finnhub
  const fetchStockData = async () => {
    const apiKey = 'ctv0dspr01qg98te8kl0ctv0dspr01qg98te8klg';
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA']; // Example stock symbols
    const updatedLabels = [];
    const updatedData = [];

    for (const symbol of symbols) {
      const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
      try {
        const response = await axios.get(url);
        const { c } = response.data; // Current price
        updatedLabels.push(symbol);
        updatedData.push(c);
      } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error);
      }
    }

    // Update the chart data
    setStockData({
      labels: updatedLabels,
      datasets: [
        {
          ...stockData.datasets[0],
          data: updatedData,
        },
      ],
    });
  };

  // Fetch data on component mount and every 5 seconds
  useEffect(() => {
    fetchStockData(); // Initial fetch
    const interval = setInterval(fetchStockData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Real-Time Stock Prices',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Stock Symbol',
        },
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Bar data={stockData} options={options} />
    </div>
  );
};

export default StockBarGraph;