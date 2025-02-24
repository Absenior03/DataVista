import React, { useState, useEffect } from 'react';
import { getEconomicIndicators } from '../services/fmp';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Modal from 'react-modal';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
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

const EconomicIndicators = () => {
  const [indicators, setIndicators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getEconomicIndicators()
      .then(data => {
        if (data && data.length > 0) {
          setIndicators(data);
        } else {
          setError('No data found for economic indicators.');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch economic indicators.');
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
    return <div>Loading economic indicators...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const chartData = {
    labels: indicators.map(indicator => indicator.date),
    datasets: [
      {
        label: 'GDP Growth (%)',
        data: indicators.map(indicator => indicator.gdpGrowth),
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
      },
      {
        label: 'Unemployment Rate (%)',
        data: indicators.map(indicator => indicator.unemploymentRate),
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
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
        text: 'Economic Indicators',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value (%)',
        },
      },
    },
  };

  return (
    <div className="economic-indicators">
      <h2>Economic Indicators</h2>
      <div className="chart-container" onClick={openModal}>
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Economic Indicators Details"
      >
        <h2>Economic Indicators Details</h2>
        <div className="modal-content">
          <div className="chart-section">
            <Chart type="line" data={chartData} options={chartOptions} />
          </div>
          <div className="insights-section">
            <h3>Recent Data</h3>
            <ul>
              {indicators.map((indicator, index) => (
                <li key={index}>
                  <span className="date">{indicator.date}</span>
                  <span className="gdp">GDP Growth: {indicator.gdpGrowth}%</span>
                  <span className="unemployment">
                    Unemployment Rate: {indicator.unemploymentRate}%
                  </span>
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

export default EconomicIndicators;