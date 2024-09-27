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
  "ADMINISTRATIVE AND SUPPORT SERVICES": 2.0,
  "AGRICULTURE": 1.3,
  "CONSTRUCTION": 23.6,
  "EDUCATION": 2.3,
  "FINANCE AND INSURANCE": 0.2,
  "GENERAL": 30.0,
  "GENERAL COMMERCE FMCG": 28.8,
  "GOVERNMENT": 0.0,
  "HOSPITALITY": 2.0,
  "INFORMATION AND COMMUNICATION": 9.4,
  "LOGISTICS": 8.5,
  "MANUFACTURING": 17.4,
  "OIL AND GAS": 13.9,
  "POWER & ENERGY": 6.6,
  "TRANSPORTATION AND STORAGE": 14.04
};


const RwandaSector = ({ data }) => {
  if (!data) {
    return <div className="p-4">No data available</div>;
  }

  // Calculate total outstanding balance
  const totalOutstandingBalance = data.reduce((total, item) => total + item["OUTSTANDING BALANCE"], 0);

  // Add percentage, limit, and difference to the data
  const enhancedData = data.map((item, index) => {
    const percentage = (item["OUTSTANDING BALANCE"] / totalOutstandingBalance) * 100;
    const normalizedSector = item.SECTOR.trim().toUpperCase(); // Normalize sector name
    const limit = sectorLimits[normalizedSector] || 0;
    console.log(limit, 'this is it')
    const difference = limit - percentage;
    return {
      ...item,
      serialNo: index + 1,
      percentage: percentage.toFixed(2),
      limit: limit.toFixed(2),
      difference: difference.toFixed(2),
    };
  });

  // Calculate totals for the last row
  const totalApprovedAmount = data.reduce((sum, item) => sum + item["APPROVED AMOUNT"], 0);
  const totalExposure = data.reduce((sum, item) => sum + item["OUTSTANDING BALANCE"], 0);
  const totalPercentage = enhancedData.reduce((sum, item) => sum + parseFloat(item.percentage), 0);
  const totalLimit = enhancedData.reduce((sum, item) => sum + parseFloat(item.limit), 0);

  const columns = React.useMemo(
    () => [
      { Header: "S/N", accessor: "serialNo" },
      { Header: "Sector", accessor: "SECTOR" },
      {
        Header: "Approved Facility Amount ($)",
        accessor: "APPROVED AMOUNT",
        Cell: ({ value }) => formatNumber(value),
      },
      {
        Header: "Total Exposures ($)",
        accessor: "OUTSTANDING BALANCE",
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
      "Approved Facility Amount ($)": row["APPROVED AMOUNT"],
      "Total Exposures ($)": row["OUTSTANDING BALANCE"],
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Rwanda Sector');
    XLSX.writeFile(workbook, 'RwandaSector.xlsx');
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

export default RwandaSector;
