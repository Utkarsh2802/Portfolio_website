import React from "react";
import axios from "axios";
axios.defaults.withCredentials = true; //to allow cookies to be send with the request
const api = axios.create({
  baseURL:
    /*"https://typinggodbackend.herokuapp.com",*/ "http://127.0.0.1:5000",
  //timeout: 10,
});
const Handle_api = (type, url, data) => {
  if (type === "POST") {
    return api
      .post(url, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Some error has occured during the post request");
        console.log(error.message);
      });
  } else if (type === "GET") {
    return api
      .get(url)
      .then((response) => {
        return response.data; //for this value to be actually returned and used in another component i need to return a promise fron handle_api function which can then be used in the main component
      })
      .catch((error) => {
        console.log("Some error has occured during the get request");
      });
  }
};

export default Handle_api;
