import React, { useState, useContext, useMemo } from "react";
import Handle_api from "../Apis/Handle_api";
import "../Design/LeaderboardPage.css";
import Footer from "../Components/Footer";
import { UserContext } from "../GlobalContexts.js/UserContext";
// import MOCK_DATA from "../Data/MOCK_DATA.json";
import { useTable, usePagination, useSortBy, useFilters } from "react-table";
import LeaderboardFormatter from "../Helpers/LeaderboardFormatter";
import LeaderboardFilter from "../Helpers/LeaderboardFilter";
import useWindowDimensions from "../Utility_functions/UseWIndowDimensions";
const LeaderboardPage = (props) => {
  //console.log(props.isLogin); isLogin is 1 for login and 0 for signup
  const [leaderboardData, userData] = LeaderboardFormatter();
  //console.log(mydata);
  document.body.style.overflow = "hidden";
  const { height, width } = useWindowDimensions();
  const [isPhone, setIsPhone] = useState(false);
  if ((width < 1000 && height < 500) || width < 700) {
    document.body.style.overflowY = "scroll";
    document.body.style.overflowX = "hidden";
    if (isPhone == false) setIsPhone(true);
  }
  const COLUMNS = [
    {
      Header: "Rank",
      accessor: "rank",
      Filter: LeaderboardFilter,
    },
    {
      Header: "Username",
      accessor: "username",
      Filter: LeaderboardFilter,
    },
    {
      Header: "Tests Taken",
      accessor: "tests_taken",
      Filter: LeaderboardFilter,
    },
    {
      Header: "Speed In WPM",
      accessor: "avg_speed",
      Filter: LeaderboardFilter,
    },
    {
      Header: "Accuracy %",
      accessor: "accuracy",
      Filter: LeaderboardFilter,
    },
    {
      Header: "Improvement Speed",
      accessor: "improvement_speed",
      Filter: LeaderboardFilter,
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
    useFilters,
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
  const [currPage, setCurrPage] = useState(pageIndex);
  return (
    <div className="Leaderboardroot">
      <table className="Leaderboardtableroot" {...getTableProps}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header") != "Username" || width < 500 ? (
                    <i> {column.render("Header")}</i>
                  ) : (
                    ""
                  )}
                  {column.render("Header") === "Improvement Speed" ? (
                    <span style={{ fontSize: "1.5vmin" }}> (WPM/Hr)</span>
                  ) : (
                    ""
                  )}
                  {column.render("Header") == "Username" && width > 500 ? (
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  ) : null}
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
        <button
          onClick={() => {
            gotoPage(0);
            setCurrPage(0);
          }}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>
        <button
          onClick={() => {
            previousPage();
            setCurrPage(pageIndex - 1);
          }}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <span>Page</span>
        <span>
          <input
            className="LeaderboardPageInput"
            type="number"
            min={1}
            max={pageOptions.length}
            defaultValue={currPage + 1}
            onChange={(e) => {
              // const pageNumber = e.target.value
              //   ? Number(e.target.value) - 1
              //   : 0;
              // gotoPage(pageNumber);
              const temo0 =
                e.target.value >= 0 && e.target.value <= pageOptions.length
                  ? setCurrPage(e.target.value - 1)
                  : "";
              const temp1 =
                e.target.value >= 0 && e.target.value <= pageOptions.length
                  ? gotoPage(e.target.value - 1)
                  : "";
              e.target.value = currPage + 1;
            }}
            value={currPage + 1}
          ></input>
          <span>of {pageOptions.length}</span>
        </span>
        <button
          onClick={() => {
            nextPage();
            setCurrPage(pageIndex + 1);
          }}
          disabled={!canNextPage}
        >
          Next
        </button>
        <button
          onClick={() => {
            gotoPage(pageCount - 1);
            setCurrPage(pageCount - 1);
          }}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
      </div>
      <Footer height={isPhone ? "85vmax" : "85vh"}></Footer>
    </div>
  );
};

export default LeaderboardPage;
