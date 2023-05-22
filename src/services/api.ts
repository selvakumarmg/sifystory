import axios from 'axios';

export const API_KEY = 'a5813d56377844fa9514e3ad80fee1fa';

// ''
const axiosInstance = axios.create({
  baseURL: 'https://newsapi.org/v2', // Replace with your API base URL
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Define your API endpoints and methods here
export const api = {
  getFeeds: () =>
    axiosInstance.get(
      `/top-headlines?country=us&category=business&apiKey=${API_KEY}`
    ),
  // Add more API endpoints as needed
};
