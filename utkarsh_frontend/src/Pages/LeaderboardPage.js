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
  const [leaderboardData, userData] = LeaderboardFormatter();
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
      Header: "Speed In WPM",
      accessor: "avg_speed",
    },
    {
      Header: "Accuracy %",
      accessor: "accuracy",
    },
    {
      Header: "Improvement Speed",
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
      <table className="Leaderboardtableroot" {...getTableProps}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <i> {column.render("Header")}</i>
                  {column.render("Header") === "Improvement Speed" ? (
                    <span style={{ fontSize: "1.5vmin" }}> (WPM/Hr)</span>
                  ) : (
                    ""
                  )}

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
          {userData.datapresent == true ? (
            <tr className="Leaderboarduserdata">
              <td>{userData.rank}</td>
              <td>{userData.username}</td>
              <td>{userData.tests_taken}</td>
              <td>{userData.avg_speed}</td>
              <td>{userData.accuracy}</td>
              <td>{userData.improvement_speed}</td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>
      <div className="Leaderboardoptions">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>Page</span>
        <span>
          <input
            className="LeaderboardPageInput"
            type="number"
            min={1}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          ></input>
          <span>of {pageOptions.length}</span>
        </span>
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
