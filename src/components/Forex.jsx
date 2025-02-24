import React, { useState, useEffect } from 'react';
import { getForexRates } from '../services/fmp';
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

const Forex = () => {
  const [forexData, setForexData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getForexRates()
      .then(data => {
        if (data && data.length > 0) {
          setForexData(data);
        } else {
          setError('No data found for forex rates.');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch forex rates.');
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
    return <div>Loading forex rates...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const chartData = {
    labels: forexData.map(rate => rate.ticker),
    datasets: [
      {
        label: 'Exchange Rate',
        data: forexData.map(rate => rate.bid),
        backgroundColor: '#36A2EB',
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
        text: 'Forex Rates',
      },
    },
  };

  return (
    <div className="forex">
      <h2>Forex Rates</h2>
      <div className="chart-container" onClick={openModal}>
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Forex Rates Details"
      >
        <h2>Forex Rates Details</h2>
        <div className="modal-content">
          <div className="chart-section">
            <Chart type="bar" data={chartData} options={chartOptions} />
          </div>
          <div className="insights-section">
            <h3>Top Forex Rates</h3>
            <ul>
              {forexData.map((rate, index) => (
                <li key={index}>
                  <span className="currency-pair">{rate.ticker}</span>
                  <span className="exchange-rate">{rate.bid}</span>
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

export default Forex;