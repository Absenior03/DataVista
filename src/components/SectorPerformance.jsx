import React, { useState, useEffect } from 'react';
import { getSectorPerformance } from '../services/fmp';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import Modal from 'react-modal';

// Register Chart.js components
ChartJS.register(
  ArcElement,
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

const SectorPerformance = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState(null);

  useEffect(() => {
    getSectorPerformance()
      .then(data => {
        if (data && data.length > 0) {
          setSectors(data);
        } else {
          setError('No data found for sector performance.');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch sector performance data.');
        setLoading(false);
      });
  }, []);

  const openModal = (sector) => {
    setSelectedSector(sector);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSector(null);
  };

  if (loading) {
    return <div>Loading sector performance...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const chartData = {
    labels: sectors.map(sector => sector.sector),
    datasets: [
      {
        label: 'Performance (%)',
        data: sectors.map(sector => parseFloat(sector.changesPercentage)),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#FFCD56', '#C9CBCF', '#4D5360', '#F7464A',
        ],
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
        text: 'Sector Performance',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <div className="sector-performance">
      <h2>Sector Performance</h2>
      <div className="chart-container" onClick={() => openModal(null)}>
        <Chart type="pie" data={chartData} options={chartOptions} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Sector Performance Details"
      >
        <h2>Sector Performance Details</h2>
        <div className="modal-content">
          <div className="chart-section">
            <Chart type="pie" data={chartData} options={chartOptions} />
          </div>
          <div className="insights-section">
            {selectedSector ? (
              <div className="sector-details">
                <h3>{selectedSector.sector}</h3>
                <p>Performance: {selectedSector.changesPercentage}%</p>
                <p>Trend: {selectedSector.changesPercentage > 0 ? 'Positive' : 'Negative'}</p>
              </div>
            ) : (
              <div className="all-sectors">
                <h3>All Sectors</h3>
                <ul>
                  {sectors.map((sector, index) => (
                    <li key={index} onClick={() => openModal(sector)}>
                      <span className="sector-name">{sector.sector}</span>
                      <span className="sector-performance">
                        {sector.changesPercentage}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default SectorPerformance;