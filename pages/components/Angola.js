import React from 'react';
import { useTable } from 'react-table';

const formatNumber = (number) => {
  if (typeof number === 'number') {
    return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return number; // In case it's not a number
};

const Angola = ({ data }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Customer Name', accessor: 'CUSTOMER_NAME' },
      { Header: 'Sector', accessor: 'SECTOR' },
      { Header: 'Facility Type', accessor: 'FACILITY_TYPE' },
      { Header: 'Approved Amount (USD)', accessor: 'APPROVED AMOUNT (USD)', Cell: ({ value }) => formatNumber(value) },
      { Header: 'Outstanding Balance (USD)', accessor: 'OUTSTANDING BALANCE \n(USD)', Cell: ({ value }) => formatNumber(value) },
      { Header: 'IFRS Classification', accessor: 'IFRS_CLASSIFICATION' },
      { Header: 'Prudential Classification', accessor: 'PRUDENTIAL_CLASSIFICATION' },
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
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id} className="bg-gray-100 text-gray-600">
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} key={column.id} className="px-4 py-2 border border-gray-300 text-left font-medium">
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
                <tr {...row.getRowProps()} key={row.id} className="hover:bg-gray-50">
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} key={cell.column.id} className="px-4 py-2 border border-gray-300 text-sm">
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

export default Angola;
