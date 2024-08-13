import React from 'react';
import { useTable } from 'react-table';

const formatNumber = (number) => {
  return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const Kenya = ({ data }) => {
  console.log('Kenya Component Data:', data);

  const columns = React.useMemo(
    () => [
      { Header: 'Customer Name', accessor: 'CUSTOMER NAME' },
      { Header: 'Sector', accessor: 'SECTOR' },
      { Header: 'Approved Facility Amount (Limit)', accessor: 'APPROVED TOTAL FACILITY AMOUNT/LIMIT', Cell: ({ value }) => formatNumber(value) },
      { Header: 'Total Exposures (USD)', accessor: 'TOTAL EXPOSURES(USD)', Cell: ({ value }) => formatNumber(value) },
      { Header: 'IFRS', accessor: 'IFRS' },
      { Header: 'Classification', accessor: 'CLASSIFICATION' },
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
                    <td {...cell.getCellProps()} key={cell.column.id} className="px-4 py-2 border border-gray-300">
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

export default Kenya;
