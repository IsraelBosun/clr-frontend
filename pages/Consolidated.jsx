import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './api/api.jsx'; // Adjust the import path if necessary
import Charts from './components/chart.jsx';

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

  const fetchData = async () => {
    try {
      const countries = [
        'angolaData', 'cameroonData', 'ghanaData', 'botswanaData',
        'congoData', 'gambiaData', 'guineaData', 'kenyaData',
        'mozambiqueData', 'rwandaData', 'sierraLeoneData',
        'southAfricaData', 'tanzaniaData'
      ];

      const promises = countries.map(async (country) => {
        const snapshot = await getDocs(collection(db, country));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        // Sort by timestamp and get the latest entry
        const latestData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
        
        return latestData || {}; // Return the latest data or an empty object
      });

      const results = await Promise.all(promises);

      const countryNames = countries.map(country => country.split('Data')[0]); // Extract country names

      const countryData = countryNames.reduce((acc, name, idx) => {
        acc[name] = results[idx]; // Map country names to their latest data
        return acc;
      }, {});

      setData(countryData); // Update the state with latest data
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
    if (isNum) {
      return value ? value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A';
    }
    return value !== undefined && value !== null ? value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A';
  };

  const totals = metrics.reduce((acc, { key, isPercentage }) => {
    if (isPercentage) {
      let sum = 0;
      let count = 0;
  
      Object.keys(data).forEach(country => {
        const value = data[country][key];
        if (value !== undefined && value !== null) {
          sum += value;
          count += 1;
        }
      });
  
      const average = count > 0 ? sum / count : 0;
      return { ...acc, [key]: average };
    } else {
      const total = Object.keys(data).reduce((sum, country) => {
        return sum + (data[country][key] || 0);
      }, 0);
      return { ...acc, [key]: total };
    }
  }, {});

  return (
    <div className="m-4 mx-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Consolidated Credit Metrics</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md divide-y divide-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-xs border-r border-gray-300 text-left font-semibold">Country</th>
              {metrics.map(({ label, isNum, isPercentage }) => (
                <th
                  key={label}
                  className="px-4 py-2 text-xs border-r border-gray-300 text-left font-semibold"
                >
                  {label} {isNum ? '($)' : isPercentage ? '(%)' : ''}
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
                    {formatValue(data[country][key], isNum, isPercentage)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-blue-100 font-bold">
              <td className="px-4 py-2 text-xs border-r border-gray-300 text-left">Total</td>
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
      <Charts data={data} />
    </div>
  );
};

export default DetailsPage;
