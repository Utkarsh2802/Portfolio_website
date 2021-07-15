import React, { useState, useContext, useMemo } from "react";
import Handle_api from "../Apis/Handle_api";
import "../Design/LeaderboardPage.css";
import Footer from "../Components/Footer";
import { UserContext } from "../GlobalContexts.js/UserContext";
// import MOCK_DATA from "../Data/MOCK_DATA.json";
import { useTable, usePagination, useSortBy } from "react-table";
import LeaderboardFormatter from "../Helpers/LeaderboardFormatter";
const LeaderboardPage = (props) => {
  //console.log(props.isLogin); isLogin is 1 for login and 0 for signup
  const leaderboardData = LeaderboardFormatter();
  //console.log(mydata);
  const COLUMNS = [
    {
      Header: "Rank",
      accessor: "rank",
    },
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Tests Taken",
      accessor: "tests_taken",
    },
    {
      Header: "Average Speed",
      accessor: "avg_speed",
    },
    {
      Header: "Accuracy %",
      accessor: "accuracy",
    },
    {
      Header: "Rate of Improvement in WPM/hr",
      accessor: "improvement_speed",
    },
  ];
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => leaderboardData, []);
  const tableInstance = useTable(
    {
      columns,
      data,
      //i dont need this since i am gonna be sending sorted data anyways
      //   initialState: {
      //     sortBy: [
      //       {
      //         id: "averagespeed",
      //         desc: true,
      //       },
      //     ],
      //   },
    },
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    prepareRow,
  } = tableInstance;
  const { pageIndex } = state;

  return (
    <div className="Leaderboardroot">
      <table {...getTableProps}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
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
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}{" "}
          <tr>
            <td>sdf</td>
            <td>Current User</td>
          </tr>
        </tbody>
      </table>
      <div>
        <span>
          Page
          <b>
            {pageIndex + 1} of {pageOptions.length}
          </b>{" "}
        </span>
        <span>
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          ></input>
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LeaderboardPage;
