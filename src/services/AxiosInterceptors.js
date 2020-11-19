import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
// const baseUrl = 'https://jsonplaceholder.typicode.com/';
// const baseUrl = "http://localhost:4000/";
const baseUrl = "http://3.18.174.148:4000/";

const axiosClient = axios.create({
  config: {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
});

// axiosClient.interceptors.request.use(function (config) {
//   const tokenName = 'authToken';
// var accessToken = '';
// if (AsyncStorage.getItem(tokenName)) {
//   var token = JSON.parse(AsyncStorage.getItem(tokenName));
//   accessToken = token.accessToken ? token.accessToken : token.access_token;
//   // console.log("accessToken: ", accessToken)
//   config.headers['Authorization'] =
//     'Bearer ' + (accessToken.jwtToken ? accessToken.jwtToken : accessToken);
//   config.headers['Accept'] = 'application/json';
// } else {
//   accessToken = '';
// }
// return config;
// });

axiosClient.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  },
);

const apiClient = {
  getRequest: (path, cb) => {
    axiosClient
      .get(baseUrl + path)
      .then((response) => cb(response.data, null))
      .catch((error) => cb(null, error));
  },

  postRequest: (path, data, cb) => {
    axiosClient
      .post(baseUrl + path, data)
      .then((response) => cb(response.data, null))
      .catch((error) => cb(null, error));
  },

  putRequest: (path, data, cb) => {
    axiosClient
      .put(baseUrl + path, data)
      .then((response) => cb(response.data, null))
      .catch((error) => cb(null, error));
  },

  deleteRequest: (path, data, cb) => {
    axiosClient
      .delete(baseUrl + path, data)
      .then((response) => cb(response.data, null))
      .catch((error) => cb(null, error));
  },
};

export default apiClient;
