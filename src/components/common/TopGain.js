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

const TopGainer = () => {
  const [gainersData, setGainersData] = useState({
    labels: [], // Stock symbols for top gainers
    datasets: [
      {
        label: 'Price Change (%)',
        data: [], // Percentage change for top gainers
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Green color
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  // Fetch top gainers data from Finnhub
  const fetchGainersData = async () => {
    const apiKey = 'ctv0dspr01qg98te8kl0ctv0dspr01qg98te8klg';
    const url = `https://finnhub.io/api/v1/stock/market-status?exchange=US&token=${apiKey}`;

    try {
      const response = await axios.get(url);
      const { gainers } = response.data;

      // Process top gainers
      const gainersLabels = gainers.map((stock) => stock.symbol);
      const gainersValues = gainers.map((stock) => stock.changePercent);
      setGainersData({
        labels: gainersLabels,
        datasets: [
          {
            ...gainersData.datasets[0],
            data: gainersValues,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching top gainers data:', error);
    }
  };

  // Fetch data on component mount and every 5 seconds
  useEffect(() => {
    fetchGainersData(); // Initial fetch
    const interval = setInterval(fetchGainersData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Gainers',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price Change (%)',
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
      <Bar data={gainersData} options={chartOptions} />
    </div>
  );
};

export default TopGainer;