import Head from "next/head";
import React, { useState, useEffect, useRef } from 'react';
import FileUploadButton from "./components/UploadButton";
import Kenya from "./components/Kenya";
import MetricCard from './components/MetricCard';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import LineChart from './components/LineChart';

const KenyaScreen = () => {
  const [kenyaData, setKenyaData] = useState({});
  const [kenyaChartData, setKenyaChartData] = useState([]);
  const chartRef = useRef(null);

  const metrics = [
    { label: 'Stage 1 Loans', key: 'stage1_loans', isNum: true },
    { label: 'Stage 2 Loans', key: 'stage2_loans', isNum: true },
    { label: 'Stage 3 Loans', key: 'stage3_loans', isNum: true },
    { label: 'Direct Exposure', key: 'direct_exposure', isNum: true },
    { label: 'Contingent Exposure', key: 'contingent_exposure', isNum: true },
    { label: 'Total Exposure', key: 'total_exposure', isNum: true },
    { label: 'FCY Direct', key: 'fcy_direct', isNum: true },
    { label: 'FCY Total', key: 'fcy_total', isNum: true },
    { label: 'Missed Repayments', key: 'missed_repayments', isNum: true },
    { label: 'FCY Direct Percentage', key: 'fcy_direct_percentage', isPercentage: true },
    { label: 'FCY Total Percentage', key: 'fcy_total_percentage', isPercentage: true },
    { label: 'PPL', key: 'ppl', isPercentage: true },
    { label: 'WPL', key: 'wpl', isPercentage: true },
    { label: 'NPL', key: 'npl', isPercentage: true },
    { label: 'MRR', key: 'mrr', isPercentage: true },
  ];

  const graph = [
    // { label: 'stage2_loans', key: 'stage2_loans' },
    { label: 'stage3_loans', key: 'stage3_loans' },
    { label: 'missed_repayments', key: 'missed_repayments' },
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
// sm:flex gap-5 justify-center align-center max-w-xl mt-12
  return (
    <div className = 'bg-white'>
    <div className="min-h-screen max-w-6xl mx-auto flex flex-col items-center justify-center p-4">
    <div className = 'flex items-center justify-center font-bold text-neutral-600 text-5xl'>Kenya's Credit Dashboard</div>
      <div className = 'absolute top-0 right-0 m-5 bg-white shadow-sm rounded-md border p-4 mb-3'>Last updated: {new Date().toLocaleDateString()}</div>
      <div className="flex justify-center align-center items-center ">
      <LineChart
        chartData={kenyaChartData}
        labels={kenyaChartData.map((_, index) => `Week ${index + 1}`)}
        graph={graph}
 //       chartTitle="Kenya's Loan Data"
        className = 'w-full'
        />

        {/* <LineChart
          chartData={kenyaChartData}
          labels={kenyaChartData.map((_, index) => `Week ${index + 1}`)}
          graph={graph}
          chartTitle="Kenya's Loan Data"
          className = ''
          /> */}
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-8">
        {metrics.map(({ label, key, isPercentage, isNum }) => (
          <MetricCard
            key={key}
            title={label}
            value={kenyaData[key]}
            isPercentage={isPercentage}
            metricKey={key}
            isNum={isNum}
          />
        ))}
      </div>

      {kenyaData.top5_customers && <Kenya data={kenyaData.top5_customers} />} 
      <div className="flex flex-col items-center">
        <FileUploadButton
          title="Kenya's CLR Analyser"
          url="https://clr-1.onrender.com/kenya"
          onDataLoaded={(data) => {
            setKenyaData(data);
            const relevantData = {
              stage2_loans: data.stage2_loans,
              stage3_loans: data.stage3_loans,
              missed_repayments: data.missed_repayments,
            };
            updateChartData(relevantData);
          }}
        />
      </div>
    </div>
    </div>
  );
};

export default KenyaScreen;


// <div>{kenyaData.stage3_loans}</div>
// <div>{kenyaData.stage2_loans}</div>
// {kenyaData && <KenyaMetrics data={kenyaData} />}
