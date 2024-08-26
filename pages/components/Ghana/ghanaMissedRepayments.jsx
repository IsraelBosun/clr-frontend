import React from "react";
import { useTable } from "react-table";
import * as XLSX from "xlsx";

const formatNumber = (number) => {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const GhanaMissedRepayment = ({ data }) => {
  if (!data) {
    return <div className="p-4">No data available</div>;
  }

  const columns = React.useMemo(
    () => [
      { Header: "S/N", accessor: "serialNo" },
      { Header: "Customer Name", accessor: "CUSTOMER_NAME" },
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
        Header: "Missed Installment ($)",
        accessor: "UNPAID AMOUNT (USD)",
        Cell: ({ value }) => formatNumber(value),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data.map((item, index) => ({ ...item, serialNo: index + 1 })),
    });

  // Function to alternate row colors
  const getRowClass = (index) => {
    return index % 2 === 0 ? "bg-gray-50" : "bg-gray-100";
  };

  // Function to download table data as Excel
  const downloadExcel = () => {
    const worksheetData = data.map((row, index) => {
      return {
        "S/N": index + 1,
        "Customer Name": row.CUSTOMER_NAME,
        "Sector": row.SECTOR,
        "Approved Facility Amount ($)": row["APPROVED AMOUNT (USD)"],
        "Total Exposures ($)": row["OUTSTANDING BALANCE (USD)"],
        "Missed Installment ($)": row["UNPAID AMOUNT (USD)"],
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Missed Repayments');
    XLSX.writeFile(workbook, 'GhanaMissedRepayment.xlsx');
  };

  return (
    <div className="w-full sm:w-96 md:w-1/2 lg:w-3/4 xl:w-full w-96 overflow-x-auto m-4">
      <button
        onClick={downloadExcel}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
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
                  className={`hover:bg-gray-200 ${getRowClass(index)}`}
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GhanaMissedRepayment;
