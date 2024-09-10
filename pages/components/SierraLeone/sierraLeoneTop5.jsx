import React from 'react';
import { useTable } from 'react-table';
import * as XLSX from 'xlsx';

const formatNumber = (number) => {
  return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const SierraLeoneTop5 = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  const columns = React.useMemo(
    () => [
      { Header: 'Customer Name', accessor: 'CUSTOMER NAME' },
      { Header: 'Sector', accessor: 'SECTOR' },
      { Header: 'Approved Facility Amount (Limit)', accessor: 'APPROVED AMOUNT (USD)', Cell: ({ value }) => formatNumber(value) },
      { Header: 'Total Exposures (USD)', accessor: 'OUTSTANDING BALANCE (USD)', Cell: ({ value }) => formatNumber(value) },
      { Header: 'IFRS', accessor: 'IFRS_CLASSIFICATION' },
      { Header: 'Classification', accessor: 'PRUDENTIAL_CLASSIFICATION' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const downloadExcel = () => {
    const worksheetData = data.map(row => {
      return {
        'Customer Name': row.CUSTOMER_NAME,
        'Sector': row.SECTOR,
        'Approved Facility Amount (Limit)': row['APPROVED AMOUNT (USD)'],
        'Total Exposures (USD)': row['OUTSTANDING BALANCE (USD)'],
        'IFRS': row.IFRS_CLASSIFICATION,
        'Classification': row.PRUDENTIAL_CLASSIFICATION,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SierraLeone Top 5');
    XLSX.writeFile(workbook, 'SierraLeoneTop5.xlsx');
  };

  return (
    <div className="p-4">
      <button
        onClick={downloadExcel}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
      >
        Download Excel
      </button>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className=" bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id} className="bg-blue-500 text-white border-b border-gray-300">
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    key={column.id}
                    className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider border-r border-gray-300"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id} className="hover:bg-blue-50 even:bg-gray-50 border-b border-gray-300">
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      className="px-4 py-2 text-xs text-gray-700 border-r border-gray-300 whitespace-nowrap"
                    >
                      {cell.render('Cell')}
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
}

export default SierraLeoneTop5;
