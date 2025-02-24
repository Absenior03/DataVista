import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const Chart2D = ({ data, title, type = 'pie' }) => {
    const chartData = {
        labels: data.map((item) => item.label || `Item ${item.index + 1}`),
        datasets: [
            {
                label: title,
                data: data.map((item) => item.value),
                backgroundColor: data.map((item) => item.color || 'rgba(75, 192, 192, 0.6)'),
                borderColor: data.map((item) => item.color || 'rgba(75, 192, 192, 1)'),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const change = data[context.dataIndex].change || 0;
                        return `${label}: ${value}% (Change: ${change}%)`;
                    },
                },
            },
        },
    };

    return <Pie data={chartData} options={options} />;
};

export default Chart2D;