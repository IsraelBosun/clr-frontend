import Head from "next/head";
import React, { useState, useEffect, useRef } from 'react';
import FileUploadButton from "./components/UploadButton";
import { KenyaTop5, KenyaMissedRepayment } from "./components/Kenya";
import MetricCard from './components/MetricCard';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import LineChart from './components/LineChart';

const KenyaScreen = () => {
  const [kenyaData, setKenyaData] = useState({});
  const [kenyaChartData, setKenyaChartData] = useState([]);
  const [isTop5Open, setIsTop5Open] = useState(false);
  const [isMissedRepaymentsOpen, setIsMissedRepaymentsOpen] = useState(false);
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
    { label: 'Percentage Of Top 5', key: 'percentageof_top5', isPercentage: true },
    { label: 'Percentage Of Time Loan', key: 'percentageof_timeLoan', isPercentage: true },
    { label: `Percentage Of Time & Term Loan`, key: 'percentageof_timeTermLoan', isPercentage: true },
    { label: 'PPL', key: 'ppl', isPercentage: true },
    { label: 'WPL', key: 'wpl', isPercentage: true },
    { label: 'NPL', key: 'npl', isPercentage: true },
    { label: 'MRR', key: 'mrr', isPercentage: true },
  ];

  const graph = [
    { label: 'stage3_loans', key: 'stage3_loans' },
    { label: 'missed_repayments', key: 'missed_repayments' },
  ];

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;

      chart.data.labels = kenyaChartData.map((_, index) => `Week ${index + 1}`);
      chart.data.datasets.forEach((dataset) => {
        dataset.data = kenyaChartData.map((data) => data[dataset.label] || 0);
      });

      chart.update();
    }
  }, [kenyaChartData]);

  const updateChartData = (newData) => {
    const updatedData = [...kenyaChartData, newData];
    setKenyaChartData(updatedData);
    localStorage.setItem('kenyaChartData', JSON.stringify(updatedData));

    const chart = chartRef.current;
    if (chart) {
      chart.data.labels = updatedData.map((_, index) => `Week ${index + 1}`);
      chart.data.datasets.forEach((dataset) => {
        dataset.data = updatedData.map((data) => data[dataset.label] || 0);
      });
      chart.update();
    }
  };

  return (
    <div className='bg-white'>
      <div className="min-h-screen max-w-6xl mx-auto flex flex-col items-center justify-center p-4">
        <div className='flex items-center justify-center font-bold text-neutral-600 text-5xl'>
          Kenya's Credit Dashboard
        </div>
        <div className='absolute top-0 right-0 m-5 bg-white shadow-sm rounded-md border p-4 mb-3'>
          Last updated: {new Date().toLocaleDateString()}
        </div>
        <div className="flex w-full justify-center align-center items-center flex-wrap ">
          <LineChart
            chartData={kenyaChartData}
            labels={kenyaChartData.map((_, index) => `Week ${index + 1}`)}
            graph={graph}
            className='w-full'
            ref={chartRef}
          />
        </div>
        <div className="flex flex-wrap gap-4 justify-between mt-8">
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

        <div className="flex flex-col items-center mt-8">
          {/* Dropdown Toggle for Top 5 Customers */}
          <button
            onClick={() => setIsTop5Open(!isTop5Open)}
            className="w-full bg-blue-500 text-white rounded-md px-4 py-2 mb-2 text-left flex justify-between items-center"
          >
            <span className="uppercase font-bold text-xl">Top 5 Obligors</span>
            <svg
              className={`w-6 h-6 transform transition-transform ${isTop5Open ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isTop5Open && kenyaData.top5_customers && (
            <KenyaTop5 data={kenyaData.top5_customers} />
          )}

          {/* Dropdown Toggle for Missed Repayments */}
          <button
            onClick={() => setIsMissedRepaymentsOpen(!isMissedRepaymentsOpen)}
            className="w-full bg-green-500 text-white rounded-md px-4 py-2 mb-2 text-left flex justify-between items-center"
          >
            <span className="uppercase font-bold text-xl">Missed Repayments</span>
            <svg
              className={`w-6 h-6 transform transition-transform ${isMissedRepaymentsOpen ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isMissedRepaymentsOpen && kenyaData.missed_customers && (
            <KenyaMissedRepayment data={kenyaData.missed_customers} />
          )}
        </div>

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
