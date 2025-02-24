import React from 'react';
import MarketOverview from './components/MarketOverview';
import TopGainers from './components/TopGainers';
import TopLosers from './components/TopLosers';
import StockNews from './components/StockNews';
import SectorPerformance from './components/SectorPerformance';
import Cryptocurrency from './components/Cryptocurrency';
import Forex from './components/Forex';
import EconomicIndicators from './components/EconomicIndicators';
import GlobalMarkets from './components/GlobalMarkets';
import './App.css';
import ETF from './components/ETF';

const App = () => {
    return (
        <div className="App">
            <h1>Stock Market Dashboard</h1>
            <div className="dashboard">
                <MarketOverview />
                <TopGainers />
                <TopLosers />
                <SectorPerformance />
                <ETF />
                <Forex />
                <EconomicIndicators />
                <GlobalMarkets />
                <StockNews />
            </div>
        </div>
    );
};

export default App;