import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './api/api.jsx'; // Adjust the import path if necessary

import { Bar } from 'react-chartjs-2';


const DetailsPage = () => {
  const [data, setData] = useState({
    angola: [],
    ghana: [],
    cameroon: [],
    botswana: [],
    congo: [],
    gambia: [],
    guinea: [],
    kenya: [],
    mozambique: [],
    rwanda: [],
    sierraLeone: [],
    southAfrica: [],
    tanzania: [],
  });

  const chartData = {
    labels: Object.keys(data), // countries
    datasets: [
      {
        label: 'Stage 1 Loans',
        data: Object.values(data).map(country => country[0]?.stage1_loans || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Stage 2 Loans',
        data: Object.values(data).map(country => country[0]?.stage2_loans || 0),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  

  const fetchData = async () => {
    try {
      const angolaSnapshot = await getDocs(collection(db, 'angolaData'));
      const angolaData = angolaSnapshot.docs.map((doc) => doc.data());

      const cameroonSnapshot = await getDocs(collection(db, 'cameroonData'));
      const cameroonData = cameroonSnapshot.docs.map((doc) => doc.data());

      const ghanaSnapshot = await getDocs(collection(db, 'ghanaData'));
      const ghanaData = ghanaSnapshot.docs.map((doc) => doc.data());

      const botswanaSnapshot = await getDocs(collection(db, 'botswanaData'));
      const botswanaData = botswanaSnapshot.docs.map((doc) => doc.data());

      const congoSnapshot = await getDocs(collection(db, 'congoData'));
      const congoData = congoSnapshot.docs.map((doc) => doc.data());

      const gambiaSnapshot = await getDocs(collection(db, 'gambiaData'));
      const gambiaData = gambiaSnapshot.docs.map((doc) => doc.data());

      const guineaSnapshot = await getDocs(collection(db, 'guineaData'));
      const guineaData = guineaSnapshot.docs.map((doc) => doc.data());

      const kenyaSnapshot = await getDocs(collection(db, 'kenyaData'));
      const kenyaData = kenyaSnapshot.docs.map((doc) => doc.data());

      const mozambiqueSnapshot = await getDocs(collection(db, 'mozambiqueData'));
      const mozambiqueData = mozambiqueSnapshot.docs.map((doc) => doc.data());

      const rwandaSnapshot = await getDocs(collection(db, 'rwandaData'));
      const rwandaData = rwandaSnapshot.docs.map((doc) => doc.data());

      const sierraLeoneSnapshot = await getDocs(collection(db, 'sierraLeoneData'));
      const sierraLeoneData = sierraLeoneSnapshot.docs.map((doc) => doc.data());

      const southAfricaSnapshot = await getDocs(collection(db, 'southAfricaData'));
      const southAfricaData = southAfricaSnapshot.docs.map((doc) => doc.data());

      const tanzaniaSnapshot = await getDocs(collection(db, 'tanzaniaData'));
      const tanzaniaData = tanzaniaSnapshot.docs.map((doc) => doc.data());

      setData({
        angola: angolaData,
        ghana: ghanaData,
        cameroon: cameroonData,
        botswana: botswanaData,
        congo: congoData,
        gambia: gambiaData,
        guinea: guineaData,
        kenya: kenyaData,
        mozambique: mozambiqueData,
        rwanda: rwandaData,
        sierraLeone: sierraLeoneData,
        southAfrica: southAfricaData,
        tanzania: tanzaniaData,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    { label: 'Percentage Of Top 5', key: 'percentage_of_top5', isPercentage: true },
    { label: 'PPL', key: 'ppl', isPercentage: true },
    { label: 'WPL', key: 'wpl', isPercentage: true },
    { label: 'NPL', key: 'npl', isPercentage: true },
    { label: 'MRR', key: 'mrr', isPercentage: true },
  ];

  const formatValue = (value, isNum, isPercentage) => {
    if (isPercentage) {
      return value ? `${value.toFixed(2)}%` : 'N/A';
    }
    if (isNum) {
      return value ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'N/A';
    }
    return value ? value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A';
  };

  const totals = metrics.reduce((acc, { key }) => {
    const total = Object.keys(data).reduce((sum, country) => {
      return sum + (data[country][0]?.[key] || 0);
    }, 0);
    return { ...acc, [key]: total };
  }, {});
  
  

  return (
    <div className="w-full overflow-x-auto m-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Country Financial Overview</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md divide-y divide-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-xs border-r border-gray-300 text-left font-semibold">Country</th>
              {metrics.map(({ label }) => (
                <th
                  key={label}
                  className="px-4 py-2 text-xs border-r border-gray-300 text-left font-semibold"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((country, idx) => (
              <tr
                key={country}
                className={`${
                  idx % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
                } hover:bg-gray-200 transition duration-200`}
              >
                <td className="px-4 py-2 text-xs border-r border-gray-300 font-medium text-gray-800">
                  {country}
                </td>
                {metrics.map(({ key, isNum, isPercentage }) => (
                  <td
                    key={key}
                    className="px-4 py-2 text-xs border-r border-gray-300 text-center"
                  >
                    {formatValue(data[country][0]?.[key], isNum, isPercentage)}
                  </td>
                ))}
              </tr>
            ))}
              <tr className="bg-blue-100 font-bold">
    <td className="px-4 py-2 text-xs border-r border-gray-300 text-left">
      Total
    </td>
    {metrics.map(({ key, isNum, isPercentage }) => (
      <td
        key={key}
        className="px-4 py-2 text-xs border-r border-gray-300 text-center"
      >
        {formatValue(totals[key], isNum, isPercentage)}
      </td>
    ))}
  </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}  

export default DetailsPage;




// import { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from './api/api.jsx'; // Adjust the import path if necessary

// // Import the necessary components from Chart.js
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import { Bar, Pie } from 'react-chartjs-2';

// // Register the required chart components
// ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement);

// const DetailsPage = () => {
//   const [data, setData] = useState({
//     angola: [],
//     ghana: [],
//     cameroon: [],
//     botswana: [],
//     congo: [],
//     gambia: [],
//     guinea: [],
//     kenya: [],
//     mozambique: [],
//     rwanda: [],
//     sierraLeone: [],
//     southAfrica: [],
//     tanzania: [],
//   });

//   // Prepare data for the Bar chart (Stage 1 and Stage 2 Loans)
//   const chartData = {
//     labels: Object.keys(data), // countries
//     datasets: [
//       {
//         label: 'Stage 1 Loans',
//         data: Object.values(data).map(country => country[0]?.stage1_loans || 0),
//         backgroundColor: 'rgba(255, 99, 132, 0.8)', // Bright pink/red
//       },
//       {
//         label: 'Stage 2 Loans',
//         data: Object.values(data).map(country => country[0]?.stage2_loans || 0),
//         backgroundColor: 'rgba(54, 162, 235, 0.8)', // Bright blue
//       },
//       {
//         label: 'Stage 3 Loans',
//         data: Object.values(data).map(country => country[0]?.stage3_loans || 0),
//         backgroundColor: 'rgba(255, 206, 86, 0.8)', // Bright yellow
//       },
      
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: function (value) {
//             return `$${value.toLocaleString()}`;
//           },
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//     },
//   };

//   // Prepare data for the Pie chart (Total Exposure)
//   const totalExposureData = {
//     labels: Object.keys(data), // countries
//     datasets: [
//       {
//         label: 'Total Exposure',
//         data: Object.values(data).map(country => country[0]?.total_exposure || 0),
//         backgroundColor: [
//           '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#AC64AD', '#00A36C'
//         ],
//         hoverBackgroundColor: [
//           '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#AC64AD', '#00A36C'
//         ],
//       },
//     ],
//   };

//   const fetchData = async () => {
//     try {
//       const angolaSnapshot = await getDocs(collection(db, 'angolaData'));
//       const angolaData = angolaSnapshot.docs.map((doc) => doc.data());

//       const cameroonSnapshot = await getDocs(collection(db, 'cameroonData'));
//       const cameroonData = cameroonSnapshot.docs.map((doc) => doc.data());

//       const ghanaSnapshot = await getDocs(collection(db, 'ghanaData'));
//       const ghanaData = ghanaSnapshot.docs.map((doc) => doc.data());

//       const botswanaSnapshot = await getDocs(collection(db, 'botswanaData'));
//       const botswanaData = botswanaSnapshot.docs.map((doc) => doc.data());

//       const congoSnapshot = await getDocs(collection(db, 'congoData'));
//       const congoData = congoSnapshot.docs.map((doc) => doc.data());

//       const gambiaSnapshot = await getDocs(collection(db, 'gambiaData'));
//       const gambiaData = gambiaSnapshot.docs.map((doc) => doc.data());

//       const guineaSnapshot = await getDocs(collection(db, 'guineaData'));
//       const guineaData = guineaSnapshot.docs.map((doc) => doc.data());

//       const kenyaSnapshot = await getDocs(collection(db, 'kenyaData'));
//       const kenyaData = kenyaSnapshot.docs.map((doc) => doc.data());

//       const mozambiqueSnapshot = await getDocs(collection(db, 'mozambiqueData'));
//       const mozambiqueData = mozambiqueSnapshot.docs.map((doc) => doc.data());

//       const rwandaSnapshot = await getDocs(collection(db, 'rwandaData'));
//       const rwandaData = rwandaSnapshot.docs.map((doc) => doc.data());

//       const sierraLeoneSnapshot = await getDocs(collection(db, 'sierraLeoneData'));
//       const sierraLeoneData = sierraLeoneSnapshot.docs.map((doc) => doc.data());

//       const southAfricaSnapshot = await getDocs(collection(db, 'southAfricaData'));
//       const southAfricaData = southAfricaSnapshot.docs.map((doc) => doc.data());

//       const tanzaniaSnapshot = await getDocs(collection(db, 'tanzaniaData'));
//       const tanzaniaData = tanzaniaSnapshot.docs.map((doc) => doc.data());

//       setData({
//         angola: angolaData,
//         ghana: ghanaData,
//         cameroon: cameroonData,
//         botswana: botswanaData,
//         congo: congoData,
//         gambia: gambiaData,
//         guinea: guineaData,
//         kenya: kenyaData,
//         mozambique: mozambiqueData,
//         rwanda: rwandaData,
//         sierraLeone: sierraLeoneData,
//         southAfrica: southAfricaData,
//         tanzania: tanzaniaData,
//       });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-6"> {/* Limit the overall width and add padding */}
//       <h1 className="text-3xl font-bold mb-8 text-center">Country Financial Overview</h1>
  
//       {/* Bar Chart Container */}
//       <div className="w-full md:w-2/3 mx-auto"> {/* Limit the width on larger screens */}
//         <Bar data={chartData} options={options} />
//       </div>
  
//       {/* Pie Chart for Total Exposure */}
//       <h2 className="text-2xl font-bold mt-10 mb-4 text-center">Total Exposure by Country</h2>
//       <div className="w-full md:w-1/2 mx-auto"> {/* Limit the pie chart width to 50% of screen on larger devices */}
//         <Pie data={totalExposureData} />
//       </div>
//     </div>
//   );
  
// };

// export default DetailsPage;
