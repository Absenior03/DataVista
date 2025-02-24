import React, { useState, useEffect } from 'react';
import { getETFs } from '../services/fmp';
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

const ETF = () => {
  const [etfData, setETFData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getETFs()
      .then(data => {
        if (data && data.length > 0) {
          setETFData(data);
        } else {
          setError('No data found for ETFs.');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch ETF data.');
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
    return <div>Loading ETF data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const chartData = {
    labels: etfData.map(etf => etf.symbol),
    datasets: [
      {
        label: 'Price (USD)',
        data: etfData.map(etf => etf.price),
        backgroundColor: '#4BC0C0',
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
        text: 'ETF Prices',
      },
    },
  };

  return (
    <div className="etf">
      <h2>ETF Prices</h2>
      <div className="chart-container" onClick={openModal}>
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="ETF Prices Details"
      >
        <h2>ETF Prices Details</h2>
        <div className="modal-content">
          <div className="chart-section">
            <Chart type="bar" data={chartData} options={chartOptions} />
          </div>
          <div className="insights-section">
            <h3>Top ETFs</h3>
            <ul>
              {etfData.map((etf, index) => (
                <li key={index}>
                  <span className="etf-symbol">{etf.symbol}</span>
                  <span className="etf-price">${etf.price}</span>
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

export default ETF;