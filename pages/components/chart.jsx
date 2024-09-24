import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Tooltip, Legend, Title, ArcElement } from 'chart.js';

// Register the required components
ChartJS.register(LinearScale, CategoryScale, BarElement, Tooltip, Legend, Title, ArcElement);

const Charts = ({ data = {} }) => { // Set default value to an empty object
  // Check if data is valid
  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    return <div className="text-center text-red-500">No data available to display.</div>;
  }

  // Prepare data for the Bar chart (Loans Overview)
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Stage 1 Loans',
        data: Object.values(data).map(countryData => countryData.stage1_loans || 0),
        backgroundColor: 'rgba(16, 185, 129, 1)', // Deeper Green
        borderRadius: 8, // Rounded bars
        hoverBackgroundColor: 'rgba(5, 150, 105, 1)',
      },
      {
        label: 'Stage 2 Loans',
        data: Object.values(data).map(countryData => countryData.stage2_loans || 0),
        backgroundColor: 'rgba(202, 138, 4, 1)', // Deeper Yellow
        borderRadius: 8, // Rounded bars
        hoverBackgroundColor: 'rgba(161, 98, 7, 1)',
      },
      {
        label: 'Stage 3 Loans',
        data: Object.values(data).map(countryData => countryData.stage3_loans || 0),
        backgroundColor: 'rgba(220, 38, 38, 1)', // Deeper Red
        borderRadius: 8, // Rounded bars
        hoverBackgroundColor: 'rgba(185, 28, 28, 1)',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // Make bars horizontal
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 16,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 16, weight: 'bold' },
        bodyFont: { size: 14 },
        padding: 10,
      },
    },
  };

  // Prepare data for the Pie chart (Total Exposures)
  const totalExposures = Object.values(data).map(countryData => countryData.total_exposure || 0);
  const totalExposureSum = totalExposures.reduce((acc, curr) => acc + curr, 0);

  const pieData = {
    labels: Object.keys(data), // Country names
    datasets: [
      {
        label: 'Total Exposure',
        data: totalExposures,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(199, 199, 199, 0.8)',
          'rgba(83, 102, 255, 0.8)',
          'rgba(40, 159, 64, 0.8)',
          'rgba(150, 99, 200, 0.8)',
          'rgba(234, 45, 86, 0.8)',
          'rgba(40, 255, 160, 0.8)',
          'rgba(100, 50, 200, 0.8)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
          'rgba(40, 159, 64, 1)',
          'rgba(150, 99, 200, 1)',
          'rgba(234, 45, 86, 1)',
          'rgba(40, 255, 160, 1)',
          'rgba(100, 50, 200, 1)',
        ],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const percentage = ((value / totalExposureSum) * 100).toFixed(2);
            return `${tooltipItem.label}: (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="my-4">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-700">Credit Metrics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar chart for loans overview */}
        <div className="p-2 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300" style={{ height: '500px' }}>
          <h3 className="text-xl font-semibold text-center mb-4 text-gray-600">Stages Breakdown</h3>
          <Bar data={chartData} options={barOptions} />
        </div>

        {/* Pie chart for total exposures */}
        <div className="p-2 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300" style={{ height: '500px' }}>
          <h3 className="text-xl font-semibold text-center mb-4 text-gray-600">Total Exposure by Country</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
