import React, { useEffect, useState } from 'react';
import { getTopLosers } from '../services/fmp';
import './TopLosers.css';

const TopLosers = () => {
  const [losers, setLosers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTopLosers()
      .then(data => {
        if (data && data.length > 0) {
          setLosers(data);
        } else {
          setError('No data found for top losers.');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch top losers.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading top losers...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="top-losers">
      <h2>Top Losers</h2>
      <ul>
        {losers.map((loser, index) => (
          <li key={index}>
            <span className="symbol">{loser.ticker}</span>
            <span className="percentage loss">
              ▼ {loser.changesPercentage}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopLosers;