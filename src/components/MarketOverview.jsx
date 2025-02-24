import React, { useState, useEffect, useRef } from 'react';
import { getStockCandles } from '../services/fmp';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  LineController,
  LineElement,
  PointElement,
} from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import Modal from 'react-modal';
import 'chartjs-adapter-date-fns';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  LineController,
  LineElement,
  PointElement,
  CandlestickController,
  CandlestickElement
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
  },
};

const MarketOverview = () => {
  const [symbol, setSymbol] = useState('');
  const [candles, setCandles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartType, setChartType] = useState('candlestick'); // 'candlestick' or 'line'
  const chartRef = useRef(null);

  const handleSearch = async () => {
    if (!symbol) {
      setError('Please enter a stock symbol.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getStockCandles(symbol);
      if (data && data.length > 0) {
        const formattedData = data.map(item => ({
          x: new Date(item.date).getTime(), // Convert date to milliseconds
          o: item.open,
          h: item.high,
          l: item.low,
          c: item.close,
        }));
        setCandles(formattedData);
      } else {
        setError('No data found for the specified stock symbol.');
      }
    } catch (error) {
      setError('Failed to fetch stock data.');
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleChartType = () => {
    setChartType(prevType => (prevType === 'candlestick' ? 'line' : 'candlestick'));
  };

  const lastClosePrice = candles.length > 0 ? candles[candles.length - 1].c : null;
  const lineColor = lastClosePrice && candles[0].c ? (lastClosePrice > candles[0].c ? 'green' : 'red') : '#007bff';

  const chartData = {
    datasets: [
      {
        label: symbol,
        data: candles,
        borderColor: chartType === 'line' ? lineColor : undefined,
        backgroundColor: chartType === 'line' ? 'rgba(0, 123, 255, 0.1)' : undefined,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `${symbol} ${chartType === 'candlestick' ? 'Candlestick' : 'Line'} Chart`,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'HH:mm',
          },
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
  };

  return (
    <div className="market-overview">
      <h2>Market Overview</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {candles.length > 0 && (
        <div className="chart-container" onClick={openModal}>
          <Chart
            ref={chartRef}
            type={chartType}
            data={chartData}
            options={chartOptions}
          />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Detailed Chart"
      >
        <h2>{symbol} Detailed Chart</h2>
        <button onClick={toggleChartType}>
          Switch to {chartType === 'candlestick' ? 'Line Chart' : 'Candlestick Chart'}
        </button>
        <Chart
          type={chartType}
          data={chartData}
          options={chartOptions}
        />
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default MarketOverview;