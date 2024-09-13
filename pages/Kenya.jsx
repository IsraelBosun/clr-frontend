import React, { useState, useEffect, useRef } from 'react';
import { doc, collection, getDocs, addDoc, setDoc } from "firebase/firestore";
import { db } from './api/api.jsx';
import FileUploadButton from "./components/UploadButton";
import KenyaTop5 from "./components/Kenya/kenyaTop5.jsx";
import KenyaMissedRepayment from "./components/Kenya/kenyaMissedRepayments.jsx"
import MetricCard from './components/MetricCard';
import LineChart from './components/LineChart';
// import house from '../public/grid.svg'

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
};

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
    { label: 'npl', key: 'npl' },
    { label: 'mrr', key: 'mrr' },
  ];

  const loadPersistedData = async () => {
    const querySnapshot = await getDocs(collection(db, "kenyaData"));
    const persistedData = querySnapshot.docs.map(doc => doc.data());
    if (persistedData.length > 0) {
      setKenyaData(persistedData[persistedData.length - 1]);
      setKenyaChartData(persistedData);
    }
  };

  useEffect(() => {
    loadPersistedData();
  }, []);

  const handleDataLoaded = async (data) => {
    // Set all data to state
    setKenyaData(data);

    // Prepare all data for persistence
    const relevantData = {
      stage1_loans: data.stage1_loans,
      stage2_loans: data.stage2_loans,
      stage3_loans: data.stage3_loans,
      direct_exposure: data.direct_exposure,
      contingent_exposure: data.contingent_exposure,
      total_exposure: data.total_exposure,
      fcy_direct: data.fcy_direct,
      fcy_total: data.fcy_total,
      missed_repayments: data.missed_repayments,
      fcy_direct_percentage: data.fcy_direct_percentage,
      fcy_total_percentage: data.fcy_total_percentage,
      percentageof_top5: data.percentageof_top5,
      percentageof_timeLoan: data.percentageof_timeLoan,
      percentageof_timeTermLoan: data.percentageof_timeTermLoan,
      ppl: data.ppl,
      wpl: data.wpl,
      npl: data.npl,
      mrr: data.mrr,
      top5_customers: data.top5_customers,
      missed_customers: data.missed_customers,
      timestamp: new Date().toISOString() // Assuming you want to use the current time as timestamp
    };

    // Update chart data with the new relevant data
    const updatedChartData = [...kenyaChartData, relevantData];
    setKenyaChartData(updatedChartData);

    const now = new Date();
    const timestamp = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
  

    // Save all data to Firestore
    await setDoc(doc(db, "kenyaData", timestamp), relevantData);
  };

  return (
<div className="bg-white min-h-screen max-w-6xl mx-auto mt-4 flex flex-col items-center justify-center p-4">
  <div className='flex items-center text-center justify-center font-bold text-neutral-600 text-3xl'>
    Kenya's Credit Dashboard
  </div>
  <div className='absolute top-0 right-0  bg-white text-sm shadow-sm rounded-md border p-2 mb-3'>
  </div>
  <div className="flex w-full justify-center align-center items-center flex-wrap">
    <LineChart
      chartData={kenyaChartData}
      labels={kenyaChartData.map((data) => formatDate(data.timestamp))}
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
        value={kenyaData[key]}
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
    {isTop5Open && kenyaData.top5_customers && (
      <KenyaTop5 data={kenyaData.top5_customers} />
    )}
    </div>

    <button
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
    {isMissedRepaymentsOpen && kenyaData.missed_customers && (
      <KenyaMissedRepayment data={kenyaData.missed_customers} />
    )}
    </div>

    {/* <button
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
      <AngolaStage2 data={ghanaData.top_20_stage2} />
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
      <AngolaSector data={ghanaData.sector_data} />
    )}

    </div>
 */}
  <div className='mt-8'>
    <FileUploadButton
      onDataLoaded={handleDataLoaded}
      countryName='Ghana'
      fileType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
      title="Kenya's CLR Analyser"
      url="https://clr-1.onrender.com/angola"
    />
  </div>
</div>
);
};

export default KenyaScreen;
