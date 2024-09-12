import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './api/api.jsx'; // Adjust the import path if necessary

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

  return (
    <div className="w-full overflow-x-auto m-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Country Financial Overview</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md divide-y divide-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-xs border-r border-gray-300 text-left font-semibold">Metric</th>
              {Object.keys(data).map(country => (
                <th
                  key={country}
                  className="px-4 py-2 text-xs border-r border-gray-300 text-left font-semibold"
                >
                  {country}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map(({ label, key, isNum, isPercentage }, idx) => (
              <tr
                key={key}
                className={`${
                  idx % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
                } hover:bg-gray-200 transition duration-200`}
              >
                <td className="px-4 py-2 text-xs border-r border-gray-300 font-medium text-gray-800">
                  {label}
                </td>
                {Object.keys(data).map(country => (
                  <td
                    key={country}
                    className="px-4 py-2 text-xs border-r border-gray-300 text-center"
                  >
                    {formatValue(data[country][0]?.[key], isNum, isPercentage)}
                  </td>
                ))}
              </tr>
            ))}
            {/* Total row can be added here if needed */}
          </tbody>
        </table>
      </div>
    </div>
  );  
};

export default DetailsPage;
