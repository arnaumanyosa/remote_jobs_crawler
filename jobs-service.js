const axios = require("axios");

const isProduction = process.env.NODE_ENV === "production";

const API_URL = isProduction
  ? "https://remote-cat-api.herokuapp.com"
  : "http://localhost:3002";

exports.getJobsFromRemoteSource = async (url) => {
  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    if (error.response) {
      //Request made but server response different of 2xx
      console.log(
        "getJobsFromRemoteSource error.response.data TITLE: ",
        error.response.data.title
      );
      console.log(
        "getJobsFromRemoteSource error.response.status: ",
        error.response.status
      );
      console.log(
        "getJobsFromRemoteSource error.response.headers:  ",
        error.response.headers
      );
    } else if (error.request) {
      // Request made but no response received
      console.log("getJobsFromRemoteSource error request:  ", error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log("getJobsFromRemoteSource error: ", error.message);
    }
    response = error;
  } finally {
    return response;
  }
};

/**
 * Add a single job into our DB
 * @param {Object} job A new job Object
 */
exports.addJob = async (job) => {
  const response = await axios
    .post(`${API_URL}/job`, job, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      console.log("addJob service response = ", response);
    })
    .catch(function (error) {
      console.log("addJob service error = ", error);
    });
};

/**
 * Add multiple jobs into our DB with a single api call
 * @param {Object[]} jobs Array of job objects
 */
exports.addJobs = async (jobs) => {
  try {
    await axios.post(`${API_URL}/jobs`, jobs, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error.response) {
      //Request made but server response different of 2xx
      console.log(
        "addJob error.response.data TITLE = ",
        error.response.data.title
      );
      console.log("addJob error.response.status = ", error.response.status);
      console.log("addJob error.response.headers = ", error.response.headers);
    } else if (error.request) {
      // Request made but no response received
      console.log("addJob error request = ", error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log("addJob error", error.message);
    }
  }
};
