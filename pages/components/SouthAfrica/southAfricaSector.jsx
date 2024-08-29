import React from "react";
import { useTable } from "react-table";
import * as XLSX from "xlsx";

const formatNumber = (number) => {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Limits for each sector
const sectorLimits = {
  "AGRICULTURE, HUNTING, FORESTRY & FISHERIES": 9.86,
  "Business Services": 30.00,
  "COMMUNITY, SOCIAL & PERSONAL SERVICES": 2.23,
  "CONSTRUCTION": 2.09,
  "FINANCIAL INTERMEDIATION, INSURANCE": 0.42,
  "Manufacturing": 15.10,
  "MINING & QUARRYING": 13.94,
  "PRIVATE HOUSEHOLDS & STAFF": 12.46,
  "REAL ESTATE": 17.66,
  "TRANSPORT, STORAGE & COMMUNICATION": 14.24,
  "WHOLESALE & RETAIL TRADE": 19.66,
};

const SouthAfricaSector = ({ data }) => {
  if (!data) {
    return <div className="p-4">No data available</div>;
  }

  // Calculate total outstanding balance
  const totalOutstandingBalance = data.reduce((total, item) => total + item["OUTSTANDING BALANCE (USD)"], 0);

  // Add percentage, limit, and difference to the data
  const enhancedData = data.map((item, index) => {
    const percentage = (item["OUTSTANDING BALANCE (USD)"] / totalOutstandingBalance) * 100;

    // Extract the first word using regex
    const firstWord = item.SECTOR.trim().match(/^\w+/i)?.[0] || "";

    // Find the sector limit using the first word
    const limit = Object.keys(sectorLimits).find(key => key.toUpperCase().startsWith(firstWord.toUpperCase())) || 0;

    const difference = sectorLimits[limit] ? sectorLimits[limit] - percentage : 0;

    return {
      ...item,
      serialNo: index + 1,
      percentage: percentage.toFixed(2),
      limit: limit ? sectorLimits[limit].toFixed(2) : 'N/A',
      difference: difference.toFixed(2),
    };
  });

  // Render enhanced data or other relevant content
  // ...



  // Calculate totals for the last row
  const totalApprovedAmount = data.reduce((sum, item) => sum + item["APPROVED AMOUNT (USD)"], 0);
  const totalExposure = data.reduce((sum, item) => sum + item["OUTSTANDING BALANCE (USD)"], 0);
  const totalPercentage = enhancedData.reduce((sum, item) => sum + parseFloat(item.percentage), 0);
  const totalLimit = enhancedData.reduce((sum, item) => sum + parseFloat(item.limit), 0);

  const columns = React.useMemo(
    () => [
      { Header: "S/N", accessor: "serialNo" },
      { Header: "Sector", accessor: "SECTOR" },
      {
        Header: "Approved Facility Amount ($)",
        accessor: "APPROVED AMOUNT (USD)",
        Cell: ({ value }) => formatNumber(value),
      },
      {
        Header: "Total Exposures ($)",
        accessor: "OUTSTANDING BALANCE (USD)",
        Cell: ({ value }) => formatNumber(value),
      },
      {
        Header: "Percentage (%)",
        accessor: "percentage",
      },
      {
        Header: "Limit (%)",
        accessor: "limit",
      },
      {
        Header: "Difference (%)",
        accessor: "difference",
        Cell: ({ value }) => {
          const isBreach = parseFloat(value) < 0; // Breach occurs when difference is negative (Limit < Percentage)
          return (
            <span
              className={`px-2 py-1 rounded-md font-bold ${
                isBreach ? "bg-red-500 text-white" : "bg-green-500 text-white"
              }`}
            >
              {value}%
            </span>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: enhancedData,
    });

  const downloadExcel = () => {
    const worksheetData = enhancedData.map((row, index) => ({
      "S/N": index + 1,
      "Sector": row.SECTOR,
      "Approved Facility Amount ($)": row["APPROVED AMOUNT (USD)"],
      "Total Exposures ($)": row["OUTSTANDING BALANCE (USD)"],
      "Percentage (%)": row.percentage,
      "Limit (%)": row.limit,
      "Difference (%)": row.difference,
    }));

    // Add total row to the worksheet
    worksheetData.push({
      "S/N": '',
      "Sector": 'Total',
      "Approved Facility Amount ($)": totalApprovedAmount,
      "Total Exposures ($)": totalExposure,
      "Percentage (%)": totalPercentage.toFixed(2),
      "Limit (%)": totalLimit.toFixed(2),
      "Difference (%)": '',
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SouthAfrica Sector');
    XLSX.writeFile(workbook, 'SouthAfricaSector.xlsx');
  };

  return (
    <div className="w-full overflow-x-auto m-4">
      <button
        onClick={downloadExcel}
        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-green-600"
      >
        Download Excel
      </button>
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md divide-y divide-gray-300"
        >
          <thead className="bg-blue-600 text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    key={column.id}
                    className="px-4 py-2 text-xs border-r border-gray-300 text-left font-semibold"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={row.id}
                  className={`hover:bg-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}`}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      className="px-4 text-xs py-2 border-r border-gray-300"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
            {/* Total row */}
            <tr className="bg-blue-100 font-bold">
              <td className="px-4 py-2 text-xs border-r border-gray-300"></td>
              <td className="px-4 py-2 text-xs border-r border-gray-300">Total</td>
              <td className="px-4 py-2 text-xs border-r border-gray-300">{formatNumber(totalApprovedAmount)}</td>
              <td className="px-4 py-2 text-xs border-r border-gray-300">{formatNumber(totalExposure)}</td>
              <td className="px-4 py-2 text-xs border-r border-gray-300">{totalPercentage.toFixed(2)}%</td>
              <td className="px-4 py-2 text-xs border-r border-gray-300">{totalLimit.toFixed(2)}%</td>
              <td className="px-4 py-2 text-xs border-r border-gray-300"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SouthAfricaSector;
