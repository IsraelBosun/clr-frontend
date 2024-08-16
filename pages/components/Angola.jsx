import React from 'react';
import { useTable } from 'react-table';

const formatNumber = (number) => {
  return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};


const Angola = ({ data }) => {
  console.log('Angola Component Data:', data);

  // const columns = React.useMemo(
  //   () => [
  //     { Header: 'Customer Name', accessor: 'CUSTOMER_NAME' },
  //     { Header: 'Sector', accessor: 'SECTOR' },
  //     { Header: 'Approved Facility Amount (Limit)', accessor: 'APPROVED AMOUNT (USD)', Cell: ({ value }) => formatNumber(value) },
  //     { Header: 'Total Exposures (USD)', accessor: 'OUTSTANDING BALANCE (USD)', Cell: ({ value }) => formatNumber(value) },
  //     { Header: 'IFRS', accessor: 'IFRS_CLASSIFICATION' },
  //     { Header: 'Classification', accessor: 'PRUDENTIAL_CLASSIFICATION' },
  //   ],
  //   []
  // );

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
      <table {...getTableProps()} className="w-[120%] bg-white border border-gray-300 rounded-lg shadow-lg">
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

export default Angola;
