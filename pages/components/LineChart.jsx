import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart as ChartJS, Tooltip, Legend, Title, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(Tooltip, Legend, Title, LineElement, CategoryScale, LinearScale, PointElement, annotationPlugin);

const LineChart = ({ chartData = [], labels = [], graph = [], chartTitle = '' }) => {
  // Generate datasets for the chart
  const datasets = graph.map(({ label }, index) => ({
    label,
    data: chartData.map((data) => data[label] || 0),
    borderColor: index === 0 ? '#FF6384' : '#36A2EB',
    backgroundColor: index === 0 ? 'rgba(255,99,132,0.2)' : 'rgba(54,162,235,0.2)',
    borderWidth: 3,
    tension: 0.4, // Smoothing the lines
    pointBackgroundColor: '#FFFFFF',
    pointBorderColor: index === 0 ? '#FF6384' : '#36A2EB',
    pointBorderWidth: 3,
    pointRadius: 5,
    pointHoverRadius: 8,
    pointHoverBorderWidth: 3,
    pointHoverBackgroundColor: index === 0 ? '#FF6384' : '#36A2EB',
    pointHoverBorderColor: '#FFFFFF',
    fill: true, // Fill area under the line
  }));

  // Chart configuration
  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Day', font: { size: 16, weight: 'bold', color: '#333' } },
        ticks: { font: { size: 14 }, maxRotation: 45, minRotation: 0, padding: 10, color: '#666' },
        grid: { display: true, lineWidth: 1, color: '#e0e0e0' },
      },
      y: {
        title: { display: true, text: 'Value', font: { size: 16, weight: 'bold', color: '#333' } },
        ticks: { font: { size: 14 }, color: '#666', callback: (value) => value.toLocaleString() },
        grid: { display: true, lineWidth: 1, color: '#e0e0e0' },
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: !!chartTitle,
        text: chartTitle,
        font: { size: 20, weight: 'bold', color: '#444' },
        padding: { top: 20, bottom: 30 },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        cornerRadius: 8,
        padding: 10,
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()}`,
        },
        boxPadding: 5,
      },
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 14, color: '#444' },
          usePointStyle: true,
          padding: 20,
        },
      },
      annotation: {
        annotations: {
          thresholdLine: {
            type: 'line',
            yMin: 5,
            yMax: 5,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              content: 'Threshold (5)',
              enabled: true,
              position: 'end',
              backgroundColor: 'rgba(255,99,132,0.8)',
              color: '#FFF',
              font: {
                size: 12,
                weight: 'bold',
              },
            },
          },
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 10,
        right: 10,
      },
    },
    elements: {
      point: {
        hoverBorderWidth: 2,
        hoverRadius: 6,
        radius: 5,
        backgroundColor: '#fff',
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <div className='bg-gradient-to-r from-blue-100 mt-4 to-indigo-200 shadow-lg rounded-lg p-4' style={{ width: '100%', height: '450px' }}>
      <Line data={data} options={options} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default LineChart;
