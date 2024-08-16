import Head from "next/head";
import React, { useState, useEffect, useRef } from 'react';
import FileUploadButton from "./components/UploadButton";
import Angola from "./components/Angola"; 
import Botswana from "./components/Botswana";
import Kenya from "./components/Kenya";
import KenyaMetrics from "./components/KenyaMetrics";
import MetricCard from './components/MetricCard';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Home = () => {
  const [angolaData, setAngolaData] = useState([]);
  const [botswanaData, setBotswanaData] = useState([]);
  const [kenyaData, setKenyaData] = useState({});
  const [kenyaChartData, setKenyaChartData] = useState([]);
  const chartRef = useRef(null);

  const metrics = [
    { label: 'FCY Direct Percentage', key: 'fcy_direct_percentage', isPercentage: true },
    { label: 'FCY Total Percentage', key: 'fcy_total_percentage', isPercentage: true },
    { label: 'Stage 1 Loans', key: 'stage1_loans' },
    { label: 'Stage 2 Loans', key: 'stage2_loans' },
    { label: 'Stage 3 Loans', key: 'stage3_loans' },
    { label: 'Direct Exposure', key: 'direct_exposure' },
    { label: 'Contingent Exposure', key: 'contingent_exposure' },
    { label: 'Total Exposure', key: 'total_exposure' },
    { label: 'PPL', key: 'ppl', isPercentage: true },
    { label: 'WPL', key: 'wpl', isPercentage: true },
    { label: 'NPL', key: 'npl', isPercentage: true },
    { label: 'FCY Direct', key: 'fcy_direct' },
    { label: 'FCY Total', key: 'fcy_total' },
  ];

  const graph = [
    { label: 'stage2_loans', key: 'stage2_loans' },
    { label: 'stage3_loans', key: 'stage3_loans' },
  ];


  useEffect(() => {
    console.log("Kenya Chart Data:", kenyaChartData); // Debugging log to inspect kenyaChartData

    if (chartRef.current) {
      const chart = chartRef.current;

      // Update chart labels
      chart.data.labels = kenyaChartData.map((_, index) => `Week ${index + 1}`);

      // Update datasets with the correct data
      chart.data.datasets.forEach((dataset) => {
        console.log("Mapping for label:", dataset.label); // Debugging log for label
        dataset.data = kenyaChartData.map((data) => {
          const value = data[dataset.label];
          console.log(`Data for ${dataset.label}:`, value); // Debugging log for each data point
          return value !== undefined ? value : 0; // Return value if it exists, otherwise return 0
        });
      });

      chart.update(); // Update the chart with new data
      console.log("Updated chart data:", chart.data); // Log the final data used in the chart
    }
  }, [kenyaChartData]);


  const updateChartData = (newData) => {
    console.log("New Data to be Added:", newData); // Debugging line
    const updatedData = [...kenyaChartData, newData];
    console.log("Updated Chart Data:", updatedData); // Debugging line

    setKenyaChartData(updatedData);
    localStorage.setItem('kenyaChartData', JSON.stringify(updatedData));

    const chart = chartRef.current;
    if (chart) {
      chart.data.labels = updatedData.map((_, index) => `Week ${index + 1}`);
      chart.data.datasets.forEach((dataset) => {
        dataset.data = updatedData.map((data) => data[dataset.label] || 0);
      });
      chart.update();
      console.log("Chart Updated with:", chart.data); // Debugging line
    } else {
      console.log("Chart reference not found."); // Debugging line
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Head>
        <title>CLR Analyzer</title>
      </Head>
      <div className="flex flex-col items-center">
        <FileUploadButton
          title="Angola's CLR Analyser"
          url="https://clr-1.onrender.com/angola"
          onDataLoaded={setAngolaData}
        />
        {angolaData.length > 0 && <Angola data={angolaData} />}

        <FileUploadButton
          title="Botswana's CLR Analyser"
          url="https://clr-1.onrender.com/botswana"
          onDataLoaded={setBotswanaData}
        />
        {botswanaData.length > 0 && <Botswana data={botswanaData} />}

        <FileUploadButton
          title="Kenya's CLR Analyser"
          url="https://clr-1.onrender.com/kenya"
          onDataLoaded={(data) => {
            setKenyaData(data);
            const relevantData = {
              stage2_loans: data.stage2_loans,
              stage3_loans: data.stage3_loans,
            };
            updateChartData(relevantData);
          }}
        />
        {kenyaData.top5_customers && <Kenya data={kenyaData.top5_customers} />} 
        {kenyaData && <KenyaMetrics data={kenyaData} />}
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-8">
        {metrics.map(({ label, key, isPercentage }) => (
          <MetricCard
            key={key}
            title={label}
            value={kenyaData[key]}
            isPercentage={isPercentage}
          />
        ))}
      </div>

      <div>{kenyaData.stage3_loans}</div>
      <div>{kenyaData.stage2_loans}</div>

      <div className="w-full max-w-3xl mt-8">
        <Line
          ref={chartRef}
          data={{
            labels: kenyaChartData.map((_, index) => `Week ${index + 1}`),
            datasets: graph.map(({ label }, index) => ({
              label,
              data: kenyaChartData.map((data) => data[label] || 0),
              borderColor: index === 0 ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)', // Different color for each line
              backgroundColor: 'rgba(75,192,192,0.2)', // Added background color for better visibility
              fill: true, // Enable fill
            })),
          }}
          options={{
            scales: {
              x: {
                title: { display: true, text: 'Week' },
                ticks: {
                  font: {
                    size: 14,
                    family: 'Arial',
                    weight: 'normal',
                  },
                  maxRotation: 45,
                  minRotation: 0,
                  padding: 10,
                },
                grid: {
                  display: true,
                  lineWidth: 1,
                  color: '#e0e0e0',
                },
              },
              y: {
                title: { display: true, text: 'Amount' },
                ticks: {
                  font: {
                    size: 14,
                    family: 'Arial',
                    weight: 'normal',
                  },
                  callback: (value) => value.toLocaleString(), // Format numbers with commas
                  // Add more options if needed
                },
                grid: {
                  display: true,
                  lineWidth: 1,
                  color: '#e0e0e0',
                },
                // Automatically set min and max based on data
                beginAtZero: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Home;
