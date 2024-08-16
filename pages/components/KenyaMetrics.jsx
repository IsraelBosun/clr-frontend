import React from 'react';

const formatNumber = (number) => {
  if (number == null) {
    return '-'; // Placeholder for null or undefined values
  }
  return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

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

const KenyaMetrics = ({ data }) => {
  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="px-4 py-2 border border-gray-300 text-left font-medium">Metric</th>
              <th className="px-4 py-2 border border-gray-300 text-left font-medium">Value</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map(({ label, key, isPercentage }) => (
              <tr key={key} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{label}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {formatNumber(data[key])}{isPercentage ? '%' : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KenyaMetrics;
