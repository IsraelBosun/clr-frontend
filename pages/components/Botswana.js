import React from 'react';
import { useTable } from 'react-table';

const formatNumber = (number) => {
  if (typeof number === 'number') {
    return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return number; // In case it's not a number
};

const Botswana = ({ data }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Customer Name', accessor: 'CUSTOMER_NAME' },
      { Header: 'Sector', accessor: 'SECTOR' },
      { Header: 'Facility Type', accessor: 'FACILITY_TYPE' },
      { Header: 'Approved Amount (USD)', accessor: 'APPROVED AMOUNT (USD)', Cell: ({ value }) => formatNumber(value) },
      { Header: 'Current Exposure (USD)', accessor: 'CURRENT EXPOSURE (USD)', Cell: ({ value }) => formatNumber(value) },
      { Header: 'Prudential Classification', accessor: 'CLASSIFICATION' },
      { Header: 'IFRS Classification', accessor: 'IFRS_CLASSIFICATION' },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100 text-gray-600">
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} className="px-4 py-2 border border-gray-300 text-left font-medium">
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
                <tr {...row.getRowProps()} className="hover:bg-gray-50">
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="px-4 py-2 border border-gray-300">
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
};

export default Botswana;
