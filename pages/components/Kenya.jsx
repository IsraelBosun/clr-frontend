import React from "react";
import { useTable } from "react-table";

const formatNumber = (number) => {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const KenyaTop5 = ({ data }) => {
  if (!data) {
    return <div className="p-4">No data available</div>;
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
    [],
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
          className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md divide-y divide-gray-200"
        >
          <thead className="bg-gray-100 text-gray-600">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    key={column.id}
                    className="px-4 py-2 border-b border-gray-300 text-left font-semibold"
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
                  className="hover:bg-gray-50"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      className="px-4 py-2 border-b border-gray-300"
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

export const KenyaMissedRepayment = ({ data }) => {
  if (!data) {
    return <div className="p-4">No data available</div>;
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
      {
        Header: "Missed Installment ($)",
        accessor: "MISSED INSTALLMENT",
        Cell: ({ value }) => formatNumber(value),
      },
    ],
    [],
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
          className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md divide-y divide-gray-200"
        >
          <thead className="bg-gray-100 text-gray-600">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    key={column.id}
                    className="px-4 py-2 border-b border-gray-300 text-left font-semibold"
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
                  className="hover:bg-gray-50"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      className="px-4 py-2 border-b border-gray-300"
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
