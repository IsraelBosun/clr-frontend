import Head from "next/head";
import React, { useState, useEffect, useRef } from 'react';
import FileUploadButton from "./components/UploadButton";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from './api/api.jsx';
import SierraLeoneTop5 from "./components/SierraLeone/sierraLeoneTop5";
import SierraLeoneMissedRepayment from "./components/SierraLeone/sierraLeoneMissedRepayments";
import SierraLeoneStage2 from "./components/SierraLeone/sierraLeoneStage2";
import SierraLeoneSector from "./components/SierraLeone/sierraLeoneSector";    
import MetricCard from './components/MetricCard';
import 'chart.js/auto';
import LineChart from './components/LineChart';

const SierraLeoneScreen = () => {
  const [ghanaData, setGhanaData] = useState({});
  const [ghanaChartData, setGhanaChartData] = useState([]);
  const [isTop5Open, setIsTop5Open] = useState(false);
  const [isMissedRepaymentsOpen, setIsMissedRepaymentsOpen] = useState(false);
  const [isStage2Open, setIsStage2Open] = useState(false);
  const [isSectorOpen, setIsSectorOpen] = useState(false);
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
    { label: 'Percentage Of Top 5', key: 'percentage_of_top_5', isPercentage: true },
    { label: 'PPL', key: 'ppl', isPercentage: true },
    { label: 'WPL', key: 'wpl', isPercentage: true },
    { label: 'NPL', key: 'npl', isPercentage: true },
    { label: 'MRR', key: 'mrr', isPercentage: true },
  ];

  const graph = [
    { label: 'npl', key: 'npl' },
    { label: 'mrr', key: 'mrr' },
  ];

  const loadPersistedData = async () => {
    const querySnapshot = await getDocs(collection(db, "sierraLeoneData"));
    const persistedData = querySnapshot.docs.map(doc => doc.data());
    if (persistedData.length > 0) {
      setGhanaData(persistedData[persistedData.length - 1]);
      setGhanaChartData(persistedData);
    }
  };

  useEffect(() => {
    loadPersistedData();
  }, []);

  const handleDataLoaded = async (data) => {
    setGhanaData(data);

    const relevantData = {
      stage1_loans: data.stage1_loans,
      stage2_loans: data.stage2_loans,
      stage3_loans: data.stage3_loans,
      direct_exposure: data.direct_exposure,
      contingent_exposure: data.contingent_exposure,
      total_exposure: data.total_exposure,
      // fcy_direct: data.fcy_direct,
      // fcy_total: data.fcy_total,
      // missed_repayments: data.missed_repayments,
      fcy_direct_percentage: data.fcy_direct_percentage,
      fcy_total_percentage: data.fcy_total_percentage,
      percentage_of_top5: data.percentage_of_top_5,
      ppl: data.ppl,
      wpl: data.wpl,
      npl: data.npl,
      // mrr: data.mrr,
      top5_customers: data.top5_customers,
      sector_data: data.sector_data,
      top_20_stage2: data.top_20_stage2,
      // missed_repayments_data: data.missed_repayments_data,
    };

    const updatedChartData = [...ghanaChartData, relevantData];
    setGhanaChartData(updatedChartData);

    await addDoc(collection(db, "sierraLeoneData"), relevantData);
  };

  return (
    <div className="bg-white min-h-screen max-w-6xl mx-auto mt-4 flex flex-col items-center justify-center p-4">
      <div className='flex items-center text-center justify-center font-bold text-neutral-600 text-3xl'>
        SierraLeone's Credit Dashboard
      </div>
      <div className='absolute top-0 right-0  bg-white text-sm shadow-sm rounded-md border p-2 mb-3'>
        Last updated: {new Date().toLocaleDateString()}
      </div>
      <div className="flex w-full justify-center align-center items-center flex-wrap">
        <LineChart
          chartData={ghanaChartData}
          labels={ghanaChartData.map((_, index) => `Week ${index + 1}`)}
          graph={graph}
          className='w-full'
          ref={chartRef}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {metrics.map(({ label, key, isPercentage, isNum }) => (
          <MetricCard
            key={key}
            title={label}
            value={ghanaData[key]}
            isPercentage={isPercentage}
            metricKey={key}
            isNum={isNum}
          />
        ))}
      </div>


        <button
          onClick={() => setIsTop5Open(!isTop5Open)}
          className="bg-blue-500 text-white rounded-md px-4 py-2 mb-2 text-left flex justify-between items-center w-full sm:w-96 md:w-1/2 lg:w-3/4 xl:w-full overflow-x-auto m-4"
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
  {/* // md:w-1/2 lg:w-3/4 xl:w-full w-96 */}
        </button>
        <div className='w-full sm:w-96 md:w-1/2 lg:w-3/4 xl:w-full w-96 overflow-x-auto m-4'>
        {isTop5Open && ghanaData.top5_customers && (
          <SierraLeoneTop5 data={ghanaData.top5_customers} />
        )}
        </div>

        {/* <button
          onClick={() => setIsMissedRepaymentsOpen(!isMissedRepaymentsOpen)}
          className="w-full bg-green-500 text-white rounded-md px-4 py-2 mb-2 text-left flex justify-between items-center w-full sm:w-96 md:w-1/2 lg:w-3/4 xl:w-full w-96 overflow-x-auto m-4"
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
        <div className='w-full sm:w-96 md:w-1/2 lg:w-3/4 xl:w-full w-96 overflow-x-auto m-4'>
        {isMissedRepaymentsOpen && ghanaData.missed_repayments_data && (
          <SierraLeoneMissedRepayment data={ghanaData.missed_repayments_data} />
        )}
        </div>
 */}
        <button
          onClick={() => setIsStage2Open(!isStage2Open)}
          className="w-full bg-yellow-500 text-white rounded-md px-4 py-2 mb-2 text-left flex justify-between items-center w-full sm:w-96 md:w-1/2 lg:w-3/4 xl:w-full w-96 overflow-x-auto m-4"
        >
          <span className="uppercase font-bold text-xl">Top 20 Stage 2</span>
          <svg
            className={`w-6 h-6 transform transition-transform ${isStage2Open ? 'rotate-180' : ''}`}
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
        <div className='w-full sm:w-96 md:w-1/2 lg:w-3/4 xl:w-full w-96 overflow-x-auto m-4'>
        {isStage2Open && ghanaData.top_20_stage2 && (
          <SierraLeoneStage2 data={ghanaData.top_20_stage2} />
        )}
        </div>

        <button
          onClick={() => setIsSectorOpen(!isSectorOpen)}
          className="w-full bg-orange-500 text-white rounded-md px-4 py-2 mb-2 text-left flex justify-between items-center w-full sm:w-96 md:w-1/2 lg:w-3/4 xl:w-full w-96 overflow-x-auto m-4"
        >
          <span className="uppercase font-bold text-xl">Sector Distribution</span>
          <svg
            className={`w-6 h-6 transform transition-transform ${isSectorOpen ? 'rotate-180' : ''}`}
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
        <div className='w-full sm:w-96 md:w-1/2 lg:w-3/4 xl:w-full w-96 overflow-x-auto m-4'>
        {isSectorOpen && ghanaData.sector_data && (
          <SierraLeoneSector data={ghanaData.sector_data} />
        )}

        </div>

      <div className='mt-8'>
        <FileUploadButton
          onDataLoaded={handleDataLoaded}
          countryName='Ghana'
          fileType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
          title="Kenya's CLR Analyser"
          url="https://clr-1.onrender.com/sierraLeone"
        />
      </div>
    </div>
  );
};

export default SierraLeoneScreen;
