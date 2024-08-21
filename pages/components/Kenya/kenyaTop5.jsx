import React from "react";
import { useTable } from "react-table";

const formatNumber = (number) => {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const KenyaTop5 = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  const columns = React.useMemo(
    () => [
      { Header: "S/N", accessor: "serialNo" },
      { Header: "Customer Name", accessor: "CUSTOMER NAME" },
      { Header: "Sector", accessor: "SECTOR" },
      {
        Header: "Approved Facility Amount (Limit) ($)",
        accessor: "APPROVED TOTAL FACILITY AMOUNT/LIMIT",
        Cell: ({ value }) => formatNumber(value),
      },
      {
        Header: "Total Exposures ($)",
        accessor: "TOTAL EXPOSURES(USD)",
        Cell: ({ value }) => formatNumber(value),
      },
      { Header: "IFRS", accessor: "IFRS" },
      { Header: "Classification", accessor: "CLASSIFICATION" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data.map((item, index) => ({ ...item, serialNo: index + 1 })),
    });

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="w-[120%] bg-white border border-gray-300 rounded-lg shadow-lg"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={headerGroup.id}
                className="bg-blue-500 text-white border-b border-gray-300"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    key={column.id}
                    className="px-4 py-2 text-left font-semibold text-xs uppercase tracking-wider border-r border-gray-300"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={row.id}
                  className="hover:bg-blue-50 even:bg-gray-50 border-b border-gray-300"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      className="px-4 py-2 text-xs text-gray-700 border-r border-gray-300 whitespace-nowrap"
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

export default KenyaTop5;
