import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart as ChartJS, Tooltip, Legend, Title, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Tooltip, Legend, Title, LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ chartData = [], labels = [], graph = [], chartTitle = '' }) => {
  // Generate datasets for the chart
  const datasets = graph.map(({ label }, index) => ({
    label,
    data: chartData.map((data) => data[label] || 0),
    borderColor: index === 0 ? 'rgba(255,99,132,1)' : 'rgba(75,192,192,1)',
    backgroundColor: index === 0 ? 'rgba(75,192,192,0.2)' : 'rgba(255,99,132,0.2)',
    borderWidth: 2,
    tension: 0.3, // Smoothing the lines
    pointBackgroundColor: 'rgba(0,0,0,0)',
    pointBorderColor: index === 0 ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
    pointBorderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 6,
  }));

  // Chart configuration
  const data = {
    labels,
    datasets,
  };

  const options = {
    scales: {
      x: {
        title: { display: true, text: 'Week' },
        ticks: { font: { size: 14 }, maxRotation: 45, minRotation: 0, padding: 10 },
        grid: { display: true, lineWidth: 1, color: '#e0e0e0' },
      },
      y: {
        title: { display: true, text: 'Amount' },
        ticks: { font: { size: 14 }, callback: (value) => value.toLocaleString() },
        grid: { display: true, lineWidth: 1, color: '#e0e0e0' },
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: !!chartTitle,
        text: chartTitle,
        font: { size: 16, weight: 'bold' },
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()}`,
        },
      },
      legend: {
        position: 'top',
        labels: {
          font: { size: 14 },
          padding: 15,
        },
      },
    },
  };

  return (
    <div className='bg-white w-[600px] mt-2 shadow-lg rounded-md p-4'>
      <Line
        data={data}
        options={options}
        className = 'hidden'
        />
    </div>
  );
};

export default LineChart;
