import React, { useState, useEffect } from 'react';
import { getGlobalMarkets } from '../services/fmp';
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

const GlobalMarkets = () => {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getGlobalMarkets()
      .then(data => {
        if (data && data.length > 0) {
          setMarkets(data);
        } else {
          setError('No data found for global markets.');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch global markets data.');
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
    return <div>Loading global markets...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const chartData = {
    labels: markets.map(market => market.index),
    datasets: [
      {
        label: 'Price',
        data: markets.map(market => market.price),
        backgroundColor: '#FFCE56',
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
        text: 'Global Markets',
      },
    },
  };

  return (
    <div className="global-markets">
      <h2>Global Markets</h2>
      <div className="chart-container" onClick={openModal}>
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Global Markets Details"
      >
        <h2>Global Markets Details</h2>
        <div className="modal-content">
          <div className="chart-section">
            <Chart type="bar" data={chartData} options={chartOptions} />
          </div>
          <div className="insights-section">
            <h3>Top Indices</h3>
            <ul>
              {markets.map((market, index) => (
                <li key={index}>
                  <span className="index-name">{market.index}</span>
                  <span className="index-price">${market.price}</span>
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

export default GlobalMarkets;