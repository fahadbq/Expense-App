import React, { useEffect, useMemo, useState } from "react";
import {
  useSortBy,
  useTable,
  usePagination,
  useGlobalFilter,
} from "react-table";
import "./Expense.css";
import {
  SortDescendingOutlined,
  SortAscendingOutlined,
  DoubleLeftOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { Alert, Button, Input, InputNumber, Progress, Select } from "antd";
import EditOrDeleteExpense from "./EditOrDeleteExpense";
import moment from "moment";
import UndoDelete from "./UndoDelete";
import { useAppSelector } from "../../app/store/hooks";
import AddExpense from "./AddExpense";

interface ExpenseProps {
  expensesData: any;
}

const ExpenseList = ({ expensesData }: ExpenseProps) => {
  const { showUndoAlert } = useAppSelector((state) => state.expenses);

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "_id",
        Cell: ({ cell }: any) => {
          // return `$$${value}`;
          return (
            <div style={{ display: "inline-block" }}>
              <EditOrDeleteExpense
                expenseDetails={cell.row.original}
                expensesData={expensesData}
              />
            </div>
          );
        },
      },
      {
        Header: "Category",
        accessor: "categoryName",
        Cell: ({ cell }: any) => {
          // return `$$${value}`;
          return cell.value; //<Link to="#">{cell.value}</Link>;
        },
      },
      { Header: "Name", accessor: "name" },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ cell }: any) => {
          return cell.value ? `$${cell.value}` : "";
        },
      },
      {
        Header: "Expense Date",
        accessor: "date",
        Cell: ({ cell }: any) => {
          return cell.value ? moment(cell.value).format("MM-DD-YYYY") : "";
        },
      },
    ],
    []
  );

  const data = useMemo(() => [...expensesData], [expensesData]);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    useGlobalFilter,
    useSortBy, // this adds sorting feature to the table instance
    usePagination
  );

  //Search Input
  const [value, setValue] = useState(globalFilter);
  const onChange = (value: any) => {
    setGlobalFilter(value || undefined);
  };

  return (
    <div className="table-container">
      <div className="search-container">
        <Input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`Search...`}
          style={{
            fontSize: "1.1rem",
            margin: "1rem 0",
            width: "250px",
          }}
        />

        <div className="add-expense-button">
          <AddExpense />
        </div>
      </div>

      <div className="table-wrapper">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span style={{ marginLeft: "5px" }}>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          // <CaretDownOutlined />
                          <SortDescendingOutlined />
                        ) : (
                          // <CaretUpOutlined />
                          <SortAscendingOutlined />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination" style={{ marginTop: "1rem" }}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <DoubleLeftOutlined />
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <LeftOutlined />
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <RightOutlined />
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          style={{ marginRight: "10px" }}
        >
          <DoubleRightOutlined />
        </button>
        <span style={{ marginRight: "10px" }}>
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span style={{ marginRight: "10px" }}>
          <InputNumber
            // type="number"
            defaultValue={pageIndex + 1}
            min={1}
            onChange={(e: any) => {
              const page = e ? Number(e) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "60px" }}
            max={pageOptions.length}
          />
        </span>
        <Select
          value={pageSize}
          onChange={(e: any) => {
            console.log("e", e);
            setPageSize(Number(e));
          }}
          options={[
            { value: 5, label: "5 / page" },
            { value: 10, label: "10 / page" },
            { value: 20, label: "20 / page" },
            { value: 50, label: "50 / page" },
            { value: 100, label: "100 / page" },
          ]}
        />
      </div>

      {/* Notification Icon for Undo Deleted Expense */}
      <div className="undo-wrapper">{showUndoAlert && <UndoDelete />}</div>
    </div>
  );
};

export default ExpenseList;
