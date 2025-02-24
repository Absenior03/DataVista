import React, { useEffect, useState } from 'react';
import { getTopGainers } from '../services/fmp';
import './TopGainers.css';

const TopGainers = () => {
  const [gainers, setGainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTopGainers()
      .then(data => {
        if (data && data.length > 0) {
          setGainers(data);
        } else {
          setError('No data found for top gainers.');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch top gainers.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading top gainers...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="top-gainers">
      <h2>Top Gainers</h2>
      <ul>
        {gainers.map((gainer, index) => (
          <li key={index}>
            <span className="symbol">{gainer.ticker}</span>
            <span className="percentage gain">
              ▲ {gainer.changesPercentage}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopGainers;