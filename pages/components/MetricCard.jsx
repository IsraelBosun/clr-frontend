import React from 'react';

const MetricCard = ({ title, value, isPercentage, metricKey, isNum }) => {
  // Determine the color based on the metricKey
  const getColor = () => {
    if (metricKey === 'stage1_loans') return 'text-green-600';
    if (metricKey === 'stage2_loans') return 'text-yellow-400';
    if (metricKey === 'stage3_loans') return 'text-red-600';
    if (metricKey === 'npl') return 'text-red-600';
    return isPercentage ? 'text-blue-600' : 'text-gray-800';
  };

  // Ensure a value is provided, default to '-' if not
  const formatValue = () => {
    if (value === null || value === undefined || isNaN(value)) {
      return '-';
    }
    if (isPercentage) {
      return `${value.toFixed(2)}%`;
    }
    if (isNum) {
      return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="bg-white shadow-md border rounded-md p-4 mb-3">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      <p className={`text-2xl font-bold ${getColor()}`}>
        {formatValue()}
      </p>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        {/* <span>Last updated: {new Date().toLocaleDateString()}</span> */}
      </div>
    </div>
  );
};

export default MetricCard;
