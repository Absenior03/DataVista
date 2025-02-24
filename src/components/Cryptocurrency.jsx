import React, { useState, useEffect } from 'react';
import { getCryptocurrencyRates } from '../services/fmp';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Modal from 'react-modal';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Modal styles
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

const Cryptocurrency = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getCryptocurrencyRates()
      .then(data => {
        if (data && data.length > 0) {
          setCryptoData(data);
        } else {
          setError('No data found for cryptocurrency rates.');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch cryptocurrency rates.');
        setLoading(false);
      });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading cryptocurrency rates...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const chartData = {
    labels: cryptoData.map(crypto => crypto.symbol),
    datasets: [
      {
        label: 'Price (USD)',
        data: cryptoData.map(crypto => crypto.price),
        backgroundColor: '#FF6384',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cryptocurrency Prices',
      },
    },
  };

  return (
    <div className="cryptocurrency">
      <h2>Cryptocurrency Prices</h2>
      <div className="chart-container" onClick={openModal}>
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Cryptocurrency Prices Details"
      >
        <h2>Cryptocurrency Prices Details</h2>
        <div className="modal-content">
          <div className="chart-section">
            <Chart type="bar" data={chartData} options={chartOptions} />
          </div>
          <div className="insights-section">
            <h3>Top Cryptocurrencies</h3>
            <ul>
              {cryptoData.map((crypto, index) => (
                <li key={index}>
                  <span className="crypto-name">{crypto.name}</span>
                  <span className="crypto-price">${crypto.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Cryptocurrency;