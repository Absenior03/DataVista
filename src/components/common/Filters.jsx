import React, { useState } from 'react';

const Filters = () => {
    const [filter, setFilter] = useState('');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div className="filters">
            <input type="text" placeholder="Filter..." value={filter} onChange={handleFilterChange} />
        </div>
    );
};

export default Filters;