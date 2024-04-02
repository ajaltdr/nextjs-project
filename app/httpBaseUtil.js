import axios from "axios";
import { message } from "antd";

// import history from './history';


export const API_URL = `https://jp-dev.cityremit.global/web-api/`;

// const normalHeaders = {
//   Accept: 'application/json',
//   'Content-Type': 'application/json',
//   Authorization: `bearer ${getLocalStorage(JWT_TOKEN)}`,
// };
// const downloadableHeaders = {
//   Accept: '*/*',
//   'Content-Type': 'application/json',
//   Authorization: `bearer ${getLocalStorage(JWT_TOKEN)}`,
// };

export const httpBase = (isDownloadable = false) => {
  const api = axios.create({
    baseURL: `${API_URL}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Content-Security-Policy": "script-src",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "x-virusscan": true,
      // 'Lang': getLocalStorage(LANGUAGE_KEY),
    },
    // headers: isDownloadable ? downloadableHeaders : normalHeaders,
    responseType: isDownloadable ? "blob" : "json",
  });

  api.interceptors.response.use(
    (response) => {
      if (response.headers && response.headers["x-xsrf-token"]) {
        // setLocalStorage(JWT_TOKEN, response.headers["x-xsrf-token"]);
      }
      return response;
    },
    (error) => {
      // if (401 === error.response.status) {
      if (404 === error.response.status) {
        message.error("Not Found.");
      }
      if (500 === error.response.status) {
        message.error("Internal Server Error.");
      }
      console.log(
        "🚀 ~ file: httpBaseUtil.js ~ line 37 ~ httpBase ~ error",
        error
      );

      return Promise.reject(error);
    }
  );

  return api;
};
