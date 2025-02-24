import React, { useEffect, useState } from 'react';
import { getStockNews } from '../services/finnhub';

const StockNews = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        getStockNews().then(response => {
            setNews(response.data);
        });
    }, []);

    return (
        <div className="stock-news">
            <h2>Stock News</h2>
            <ul>
                {news.map((item, index) => (
                    <li key={index}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.headline}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockNews;